# Objava preko Google-a i zaštita programa

---

# DIO 1 — Preko Google-a

Google ima **tri** stvari koje ljudi pomiješaju:

| Servis | Može li hostati program | Napomena |
|---|---|---|
| Google Sites | **Ne** | Alat za slaganje stranica, ne pokreće vaš HTML/JS |
| Google Drive | **Ne** | Hosting HTML-a je ugašen prije nekoliko godina |
| **Firebase Hosting** | **Da** | Ovo je pravi Google odgovor |

## Firebase Hosting — besplatni plan „Spark"

- 10 GB prostora
- **360 MB prometa dnevno** (oko 10 GB mjesečno)
- Vlastiti domen i HTTPS besplatno
- Bez reklama, bez kartice

**Oprez:** ako pređete dnevni promet, Firebase **ugasi stranicu** do sljedećeg
mjeseca ili dok ne uključite plaćanje. Cloudflare nema to ograničenje.

### Postavljanje

1. Instalirajte alat (Node.js već imate):

```
npm install -g firebase-tools
```

2. Prijavite se:

```
firebase login
```

3. U folderu sa stranicom:

```
firebase init hosting
```

- *Use an existing project* ili napravite novi
- Public directory: upišite **.** (tačka) ako su fajlovi u tom folderu
- Configure as single-page app: **No**
- Set up automatic builds: **No**

4. Objavite:

```
firebase deploy --only hosting
```

Dobijete adresu tipa `https://generator-xyz.web.app`.

---

# DIO 2 — Zaštita koda

## Ono što morate znati prije svega

**Kod koji se izvršava u pregledaču ne može se sakriti.**

Da bi program radio u nečijem pregledaču, taj pregledač mora dobiti cijeli kod.
Nakon toga korisnik ga može:

- Sačuvati sa `Ctrl + S`
- Otvoriti `F12` i pročitati sve
- Uzeti iz privremene memorije pregledača

To vrijedi za svaki program na svijetu koji radi u pregledaču — nema tehnike
koja to mijenja.

### Šta ne radi

| Pokušaj | Zašto ne radi |
|---|---|
| Provjera lozinke u JavaScriptu | Lozinka je u kodu koji korisnik ima. Vidi je za 10 sekundi. |
| Onemogućavanje desnog klika | `Ctrl + S` i dalje radi. `F12` također. |
| Zamućivanje koda (obfuscation) | Usporava, ne sprječava. Alati za odmotavanje su besplatni. |
| Zabrana kopiranja teksta | Nema veze s kodom stranice. |

Ako neko na internetu tvrdi da ima rješenje za ovo — ne razumije problem ili
prodaje nešto što ne radi.

---

## Šta stvarno radi

Postoje tri nivoa. Izaberite prema tome šta vam je zaista cilj.

### Nivo 1 — Da niko ne dođe do stranice bez lozinke

**Ovo radi.** Zaštita se izvršava na serveru, prije nego išta stigne do
pregledača. Ko nema lozinku — ne vidi ništa.

**Ali:** ko ima lozinku, može sačuvati kod. Ovo štiti od slučajnih posjetilaca,
ne od nekoga kome ste sami dali pristup.

Dobro za: demo verziju za škole s kojima pregovarate.

### Nivo 2 — Program uopšte nije na webu

Objavite **samo reklamnu stranicu**, a program dajete kao `.exe` instalaciju.

Kod je i dalje unutar `.exe` fajla (u `resources/app.asar`) i može se izvući,
ali za to treba znanje i namjera. Nasumični posjetilac neće ni pokušati.

Dobro za: program koji naplaćujete.

### Nivo 3 — Kod nikad ne napusti server

Logika se premjesti na server, a pregledač dobija samo rezultate. Ovo je jedini
način da kod stvarno ostane skriven.

Znači potpuno prepisivanje programa i mjesečni trošak servera. Za vašu situaciju
gotovo sigurno nije vrijedno toga.

---

# DIO 3 — Postavljanje zaštite lozinkom

Ovo je Nivo 1, besplatno i bez reklama, preko Cloudflare Pages.

## Kako je folder organizovan

```
index.html                      ← javno, svako vidi
prezentacija.html               ← javno
Uputstvo_za_instalaciju.docx    ← javno
app/
  index.html                    ← ZAŠTIĆENO — ovdje ide program
functions/
  app/_middleware.js            ← zaštita (već napisana)
```

Reklamna stranica je javna, program iza lozinke.

## Koraci

1. Prekopirajte `Generator_v11.html` u folder `app/` i preimenujte ga u `index.html`

2. Otvorite `pages.cloudflare.com`, napravite besplatan nalog

3. **Create a project → Upload assets**, prevucite **cijeli folder**
   (mora uključivati i `functions/`)

4. Kad se objavi, idite na **Settings → Variables and Secrets**

5. Dodajte dvije stavke i označite **Encrypt** kod obje:

```
KORISNIK  =  skola
LOZINKA   =  vaša-lozinka-ovdje
```

6. Kliknite **Save**, pa **Retry deployment** da se primijeni

Sada `vaša-stranica.pages.dev` radi normalno, a `vaša-stranica.pages.dev/app/`
traži korisničko ime i lozinku.

**Lozinku pišite bez naših slova** (č, ć, š, đ, ž) — Basic Auth ih zna pokvariti.

## Ako želite više korisnika s vlastitim pristupom

Cloudflare Access je besplatan do 50 korisnika i radi preko potvrde e-mailom:
**Zero Trust → Access → Applications → Add an application → Self-hosted**.

Tada svaki nastavnik dobija kod na svoj e-mail, umjesto zajedničke lozinke.
Također možete vidjeti ko je i kada pristupao.

---

# Moja preporuka za vašu situaciju

Pošto ste spominjali prodaju škola­ma:

1. **Javno** — reklamna stranica i prezentacija. Neka ih svako vidi, to je
   svrha reklame.

2. **Iza lozinke** — demo verzija programa, na `/app/`. Lozinku dajete školi
   s kojom razgovarate. Vidi kako radi prije nego kupi.

3. **Prodajete** — `.exe` instalaciju, ne web verziju. Web verzija ionako ne
   može kviz preko mreže u kabinetu, pa je desktop verzija ono što stvarno
   prodajete.

Ovako je reklama otvorena, demo kontrolisan, a proizvod je u obliku koji nije
trivijalno kopirati.
