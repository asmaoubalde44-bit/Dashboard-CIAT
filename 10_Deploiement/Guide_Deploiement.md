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

### Option A : Déploiement GitHub Pages (Direct & Gratuit)
Le code est déjà synchronisé sur votre dépôt officiel :  
🔗 **Dépôt GitHub :** [`https://github.com/asmaoubalde44-bit/Dashboard-CIAT`](https://github.com/asmaoubalde44-bit/Dashboard-CIAT)

Pour activer la page publique accessible au jury en 30 secondes :
1. Rendez-vous sur : [https://github.com/asmaoubalde44-bit/Dashboard-CIAT/settings/pages](https://github.com/asmaoubalde44-bit/Dashboard-CIAT/settings/pages)
2. Sous la section **Build and deployment** > **Branch** : choisissez `main` et `/ (root)`.
3. Cliquez sur **Save**.
4. Votre application sera instantanément disponible en ligne à l'adresse :  
   🌐 **`https://asmaoubalde44-bit.github.io/Dashboard-CIAT/`**

### Option B : Déploiement sur Vercel (1-Clic)
Le fichier [`vercel.json`](file:///c:/Users/Pro/Documents/Evaluations%20_IA_Generative/vercel.json) est prêt à la racine du dépôt :
1. Rendez-vous sur [vercel.com](https://vercel.com) et connectez votre compte GitHub.
2. Cliquez sur **Add New > Project** et importez `asmaoubalde44-bit/Dashboard-CIAT`.
3. Cliquez sur **Deploy** : votre URL HTTPS mondiale sera générée immédiatement.

### Option C : Déploiement sur Netlify Drop (Sans ligne de commande)
1. Rendez-vous sur [app.netlify.com/drop](https://app.netlify.com/drop).
2. Glissez-déposez simplement le dossier `03_Application_Dashboard`.
3. Netlify vous attribue un lien public immédiat en moins de 20 secondes.

---

## 3. Checklist de Validation du Déploiement

Avant le passage devant le jury, vérifiez les points suivants :
- [x] La page d'accueil charge les 6 cartes de KPI avec des valeurs réelles.
- [x] Le filtre *Cohorte* et le filtre *Filière* modifient dynamiquement les visualisations.
- [x] L'assistant décisionnel IA répond à la requête *« Projets en retard critique ? »*.
- [x] L'export CSV génère un fichier `.csv` lisible dans Microsoft Excel.
- [x] Le bouton d'impression PDF déclenche la mise en page imprimable A4.
