# GUIDE DE DÉPLOIEMENT ET D'ACCÈS DU JURY
## Solution Décisionnelle et Assistant IA du CIAT - ISEP Amadou Trawaré
**Livrable N°10 - Mise en Ligne et Accès pour l'Évaluation**

---

## 1. Accès Immédiat pour l'Évaluation Locale (Actif Actuellement)

L'application est **actuellement active et accessible en temps réel** sur votre machine :

| Paramètre | Valeur d'accès |
|---|---|
| **URL Locale de Démonstration :** | **`http://localhost:3000/`** |
| **Port HTTP :** | `3000` |
| **Serveur :** | Serveur Web Node.js intégré (`03_Application_Dashboard/server.js`) |
| **Lancement rapide :** | Double-clic sur `10_Deploiement/start_dashboard.bat` |
| **Compatibilité :** | 100% autonome sans connexion internet requise (tous les scripts, polices de secours et données sont embarqués). |

---

## 2. Déploiement Cloud Public en 1 Minute (Accès Distant Jury)

La structure du projet est configurée pour un déploiement instantané sans configuration complexe sur les trois plateformes leaders :

### Option A : Déploiement sur Vercel (Recommandé)
Le fichier de configuration [`vercel.json`](file:///c:/Users/Pro/Downloads/Evaluations%20_IA_Generative/10_Deploiement/vercel.json) est déjà pré-configuré à la racine :
1. Installez le CLI Vercel ou connectez votre compte GitHub sur [vercel.com](https://vercel.com).
2. Lancez simplement la commande à la racine du projet :
   ```bash
   npx vercel --prod
   ```
3. Vercel génère une URL publique sécurisée (ex: `https://ciat-dashboard-isep.vercel.app`) accessible à tout membre du jury depuis son smartphone ou ordinateur.

### Option B : Déploiement sur Netlify
Le fichier [`netlify.toml`](file:///c:/Users/Pro/Downloads/Evaluations%20_IA_Generative/10_Deploiement/netlify.toml) est également fourni :
1. Rendez-vous sur [app.netlify.com/drop](https://app.netlify.com/drop).
2. Glissez-déposez le dossier `03_Application_Dashboard`.
3. Votre site est déployé mondialement avec certificat HTTPS en moins de 30 secondes.

### Option C : Déploiement sur GitHub Pages
1. Poussez le répertoire sur un dépôt GitHub.
2. Allez dans **Settings > Pages**.
3. Sélectionnez la branche `main` et le dossier `/ (root)` ou `03_Application_Dashboard`.
4. L'application est publiée sous `https://<votre-compte>.github.io/<nom-repo>/`.

---

## 3. Checklist de Validation du Déploiement

Avant le passage devant le jury, vérifiez les points suivants :
- [x] La page d'accueil charge les 6 cartes de KPI avec des valeurs réelles.
- [x] Le filtre *Cohorte* et le filtre *Filière* modifient dynamiquement les visualisations.
- [x] L'assistant décisionnel IA répond à la requête *« Projets en retard critique ? »*.
- [x] L'export CSV génère un fichier `.csv` lisible dans Microsoft Excel.
- [x] Le bouton d'impression PDF déclenche la mise en page imprimable A4.
