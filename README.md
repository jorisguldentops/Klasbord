# Klasbord

Een app voor in de klas, op een Android-tablet:

- toont de klas die nu voor je zit en de tijd;
- opent handboeken (met whiteboard ernaast) en slides schermvullend, veilig voor de beamer;
- laat je in het tabblad *Nota's* snel aanduiden wie materiaal vergeten is, huiswerk niet maakte, enzovoort;
- toont de volgende lessen, met de slides die klaarstaan.

De app bevat geen leerlingen, klassen of rooster. Die staan alleen op je eigen toestel.

## Op GitHub zetten (eenmalig)

1. Maak op github.com een nieuwe **openbare** repository, bijvoorbeeld `klasbord`.
2. Klik op **Add file → Upload files** en sleep **de volledige inhoud** van deze map erin, inclusief de map `pdfjs`.
   Gebruik daarvoor Chrome of Edge op een computer: alleen dan neemt GitHub de map `pdfjs` mee.
   Klik op **Commit changes**.
   Controleer achteraf of de map `pdfjs` op GitHub staat, met daarin `pdf.min.mjs`, `pdf.worker.min.mjs` en de mappen `standard_fonts`, `wasm` en `iccs`.
3. Ga naar **Settings → Pages**. Kies bij *Source* "Deploy from a branch", dan branch `main` en map `/ (root)`, en klik op **Save**.
4. Na een minuut staat de app op `https://<jouw-gebruikersnaam>.github.io/klasbord/`.

## Op de tablet installeren

1. Open dat adres in **Chrome** op de tablet.
2. Tik op het menu (⋮) en dan op **App installeren** of **Toevoegen aan startscherm**.
3. Open Klasbord vanaf je startscherm. De app opent schermvullend.
4. Ga naar **Instellingen → Back-up terugzetten** en kies je bestand `klasbord-startgegevens.json`. Daarmee komen je rooster, klassen en leerlingen erin.
5. Voeg bij **Handboeken & slides** je PDF's toe. Via de bestandskiezer kun je ze ook rechtstreeks uit Google Drive of OneDrive halen. Koppel per klas het juiste handboek.

## Goed om te weten

- Alles (aanduidingen, notities, PDF's, whiteboards) blijft op de tablet zelf. Zet geen back-up en geen leerlingenlijst in deze repository.
- Maak af en toe een back-up via **Instellingen → Back-up downloaden**. Je PDF's zitten daar niet in.
- Na de eerste keer opent de app ook zonder wifi, ook de PDF-lezer.
- De PDF-lezer (map `pdfjs`) is pdf.js van Mozilla, licentie Apache 2.0. Hij werkt ook met gescande boeken, PDF's met een wachtwoord en gedraaide pagina's.
- Pas je `index.html` aan? Verhoog dan in `sw.js` de waarde `VERSIE` (bv. `klasbord-v2`). De tablet haalt de nieuwe versie op bij de volgende start of de start daarna.
