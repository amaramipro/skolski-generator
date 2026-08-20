# Kako objaviti stranicu — besplatno i bez reklama

U ovom folderu je gotova stranica. Treba je samo prebaciti na jedan od servisa ispod.

```
index.html                      ← glavna stranica
prezentacija.html               ← prezentacija koja se sama vrti
Uputstvo_za_instalaciju.docx    ← uputstvo za preuzimanje
```

---

## Gdje objaviti

Sva tri servisa su **besplatna, bez reklama i bez isteka**. Dobijate HTTPS i možete
kasnije dodati vlastiti domen.

| Servis | Kako se objavljuje | Kad ga izabrati |
|---|---|---|
| **GitHub Pages** | Preko GitHub repozitorija | Već koristite GitHub — najlogičniji izbor |
| **Cloudflare Pages** | Prevučete folder u pretraživaču | Najbrže ako ne želite Git |
| **Netlify** | Prevučete folder u pretraživaču | Alternativa Cloudflare-u |

Izbjegavajte servise tipa 000webhost, InfinityFree i slične — ubacuju reklame ili
gase nalog ako stranica nije aktivna.

---

## Način 1 — GitHub Pages

Adresa će izgledati ovako: `https://vaše-ime.github.io/generator/`

1. Otvorite `github.com` i prijavite se
2. Kliknite **New repository**
3. Ime: `generator` · označite **Public** · kliknite **Create**
4. Na sljedećoj stranici kliknite **uploading an existing file**
5. Prevucite **sva tri fajla** iz ovog foldera
6. Kliknite **Commit changes**
7. Idite na **Settings → Pages**
8. Pod *Source* izaberite **Deploy from a branch**, grana `main`, folder `/ (root)`
9. Kliknite **Save**

Za minutu-dvije stranica je živa. Adresa piše na istoj stranici.

**Napomena:** repozitorij mora biti *Public*. Objava iz privatnog repozitorija
traži plaćeni GitHub nalog.

---

## Način 2 — Cloudflare Pages

Adresa: `https://generator.pages.dev`

1. Otvorite `pages.cloudflare.com` i napravite besplatan nalog
2. Kliknite **Create a project → Upload assets**
3. Ime projekta: `generator`
4. Prevucite cijeli folder
5. Kliknite **Deploy site**

Gotovo za dvije minute. Bez Gita, bez naredbi.

---

## Način 3 — Netlify

Adresa: `https://nešto.netlify.app`

1. Otvorite `app.netlify.com/drop`
2. Prevucite folder direktno na stranicu

Ne treba čak ni nalog za prvo objavljivanje, ali ga napravite ako želite
zadržati adresu.

---

## Vlastiti domen

Ako želite adresu tipa `generator.ba`:

1. Kupite domen (`.ba` preko NIC.BA, `.com` preko Namecheap ili Porkbun — oko 20 KM godišnje)
2. U postavkama servisa dodajte domen pod *Custom domain*
3. Kod prodavca domena upišite DNS zapise koje vam servis pokaže

HTTPS certifikat se dodaje sam, besplatno.

---

## Prije objave dopunite

U fajlu `index.html`, u odjeljku za preuzimanje, stoji:

```html
<a class="btn btn-p" href="#">Instalacija za Windows</a>
```

Zamijenite `#` stvarnom adresom instalacijskog fajla.

**Gdje smjestiti .exe?** Instalacija je oko 80–100 MB, a GitHub Pages ima
ograničenje od 1 GB po stranici i ne voli velike binarne fajlove. Bolje:

- **GitHub Releases** — u istom repozitoriju, kartica *Releases → Create a new release*,
  priložite `.exe`. Dobijete trajnu adresu za preuzimanje. Ovo je najurednije rješenje.
- Google Drive ili Dropbox javna veza — jednostavnije, ali adresa je ružnija

---

## Ažuriranje kasnije

**GitHub Pages:** zamijenite fajl u repozitoriju, promjena je živa za minutu.

**Cloudflare / Netlify:** ponovo prevucite folder, prepisuje staru verziju.

---

## Jedna stvar za razmisliti

Ako sami program (`Generator_v11.html`) postavite javno, svako ga može otvoriti,
sačuvati i koristiti. Za program koji ste mislili naplaćivati, to je bitno.

**Preporuka:** javno objavite samo ovu stranicu i prezentaciju. Instalaciju dajte
preko veze koju kontrolišete — GitHub Releases, Drive, ili je šaljete direktno
školama s kojima dogovorite.

Ako želite da program bude slobodno dostupan svima, onda ga slobodno objavite
uz ostalo — samo neka to bude odluka, a ne slučajnost.
