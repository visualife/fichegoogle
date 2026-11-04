# fichegoogle.com

Guide simple sur la fiche Google (créer, valider, réparer, avoir plus d'avis Google) et porte d'entrée vers le bilan gratuit de [Googlow](https://googlow.fr). Site statique (HTML + CSS), déployé sur Vercel, sans build.

- `index.html` : la page (titre, description, FAQ et données structurées pour le référencement).
- `site.css`, `icons.svg`, `fonts/`, `logo.png` : copie des fichiers de design de googlow.fr. **Si le design de Googlow change, recopier ces fichiers.**
- `consent.js` : bandeau cookies et Google Analytics (mode consentement), identique à googlow.fr.
- `vercel.json` : `www` vers le domaine sans www ; `/privacy`, `/terms`, `/contact`, `/audit`, `/account`, `/login`, `/qr-code-avis-google` renvoient vers googlow.fr (le produit et la connexion restent uniquement sur googlow.fr).

Règles : français, « tu », « bilan » et non « audit » ; chaque page porte « Googlow n'est pas affilié à Google » ; un seul appel à l'action par page, vers googlow.fr.
