/**
 * Zaštita lozinkom za folder /app/
 * ─────────────────────────────────────────────────────────────
 * Ovo se izvršava NA CLOUDFLARE SERVERU, prije nego išta stigne
 * do pregledača. Zato se ne može zaobići gledanjem koda stranice —
 * za razliku od provjere lozinke napisane u JavaScriptu.
 *
 * Naslovna stranica (/) ostaje javna. Zaštićeno je samo /app/.
 *
 * Lozinka se postavlja u Cloudflare postavkama:
 *   Workers & Pages → vaš projekat → Settings → Variables
 *   Dodajte: KORISNIK  i  LOZINKA   (označite "Encrypt")
 */

// Poređenje otporno na mjerenje vremena — sprječava pogađanje
// lozinke mjerenjem koliko dugo odgovor traje.
function jednako(a, b) {
  const ea = new TextEncoder().encode(a);
  const eb = new TextEncoder().encode(b);
  if (ea.length !== eb.length) return false;
  let r = 0;
  for (let i = 0; i < ea.length; i++) r |= ea[i] ^ eb[i];
  return r === 0;
}

function traziLozinku() {
  return new Response('Potreban je pristupni podatak.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Generator nastavnih materijala", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export async function onRequest(context) {
  const { request, env, next } = context;

  const korisnik = env.KORISNIK;
  const lozinka = env.LOZINKA;

  // Ako lozinka nije podešena, ne puštaj nikoga — sigurnije nego
  // slučajno ostaviti otvoreno.
  if (!korisnik || !lozinka) {
    return new Response(
      'Zaštita nije podešena. Dodajte KORISNIK i LOZINKA u Cloudflare postavkama projekta.',
      { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
  }

  const zaglavlje = request.headers.get('Authorization');
  if (!zaglavlje || !zaglavlje.startsWith('Basic ')) return traziLozinku();

  let uneseno;
  try {
    uneseno = atob(zaglavlje.slice(6));
  } catch {
    return traziLozinku();
  }

  const razdjelnik = uneseno.indexOf(':');
  if (razdjelnik < 0) return traziLozinku();

  const uKorisnik = uneseno.slice(0, razdjelnik);
  const uLozinka = uneseno.slice(razdjelnik + 1);

  // Obje provjere se uvijek izvrše — bez ranog izlaska
  const okK = jednako(uKorisnik, korisnik);
  const okL = jednako(uLozinka, lozinka);
  if (!(okK && okL)) return traziLozinku();

  // Prošlo — posluži fajl, ali zabrani keširanje kod posrednika
  const odgovor = await next();
  const novi = new Response(odgovor.body, odgovor);
  novi.headers.set('Cache-Control', 'no-store, private');
  novi.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return novi;
}
