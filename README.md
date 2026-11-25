# neuro / dev Website

## Neuen Blog-Artikel anlegen

1. Ordner anlegen: `src/content/blog/<slug>/`. Der Ordnername ist die URL: `/en/blog/<slug>/` und `/de/blog/<slug>/`.
2. Darin `en.md` **und** `de.md` anlegen (am einfachsten einen Platzhalter-Ordner kopieren). Fehlt eine Sprache, bricht der Build mit einer Meldung ab.
3. Bilder in denselben Ordner legen. Astro optimiert sie automatisch.
   - Titelbild: `cover: ./cover.webp` und `coverAlt: "..."` im Kopfteil. Es erscheint auf der Übersicht, über dem Artikel und als Social-Media-Vorschau.
   - Bild im Text: `![Was das Bild zeigt](./bild-1.webp)`
4. Kopfteil (Frontmatter):

   ```yaml
   ---
   title: "Titel"
   description: "1–2 Sätze für Übersicht und Suchmaschinen"
   pubDate: 2026-12-01
   cover: ./cover.webp          # optional
   coverAlt: "Bildbeschreibung" # Pflicht, wenn cover gesetzt ist
   draft: true                  # nur lokal sichtbar (npm run dev), nicht im Deploy
   ---
   ```

5. Zum Veröffentlichen `draft: true` entfernen oder auf `false` setzen.

Darunter folgt der Text in Markdown (`## Zwischenüberschrift`, Listen, Links, `> Zitat`).

# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
