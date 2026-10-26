# FICHE DE CONTRIBUTION TECHNIQUE : PROFIL DÉVELOPPEUR
## Évaluation Pratique en Intelligence Artificielle Générative - CIAT & Incubateur
**Institut Supérieur d’Enseignement Professionnel (ISEP) Amadou Trawaré de Diamniadio**

---

### Identité du Profil
- **Rôle :** Responsable Ingénierie Logicielle, Architecture Web & Intégration de l'IA
- **Projet :** Projet 3 - Tableau de Bord Décisionnel Intelligent du CIAT
- **Promotion :** 2026

---

## 1. Synthèse des Réalisations selon les Exigences du Sujet (Section 9.1)

| Exigence du Sujet (9.1) | Implémentation Concrète dans la Solution | Fichiers Sources Associés |
|---|---|---|
| **Navigation fonctionnelle et responsive** | Navigation latérale adaptative, tiroir mobile tactile, topbar sticky, layout fluide sur desktop, tablette et smartphone. | `03_Application_Dashboard/styles.css`<br>`03_Application_Dashboard/index.html` |
| **Authentification, rôles et autorisations** | Sélecteur de profil actif (Directeur CIAT, Coordonnateur, Data Analyst, Jury) adaptant les permissions d'édition, de consultation et de génération d'analyses. | `03_Application_Dashboard/app.js` (fonction `role-select`) |
| **Base de données persistante et formulaires validés** | Stockage persistant via `localStorage` avec fallback sur `CIAT_DATA` (64 projets) ; formulaire modal d'ajout de projet avec validation HTML5 et contrôles de cohérence. | `03_Application_Dashboard/app.js` (méthodes `persistData`, `handleSaveProject`) |
| **Espace d'administration ou de gestion** | Gestion du portefeuille d'innovations, suivi des jalons de formation et alertes de dépassement calendaire en temps réel. | `03_Application_Dashboard/app.js` |
| **Intégration justifiée d'un service d'IA** | Moteur conversationnel décisionnel NLP avec requêtes rapides, analyse contextuelle des filtres actifs, synthèse pour le Conseil d'Administration et ancrage anti-hallucination. | `03_Application_Dashboard/ai_assistant.js` |
| **Gestion des erreurs et sécurité** | Notifications toast ergonomiques, contrôle de saisie sur les formulaires, protection contre l'injection XSS et masquage des données sensibles. | `03_Application_Dashboard/app.js` |
| **Documentation d'installation et d'exploitation** | Script batch de lancement en 1 clic sous Windows, configurations Cloud (Vercel, Netlify) et guides pas-à-pas. | `10_Deploiement/start_dashboard.bat`<br>`10_Deploiement/Guide_Deploiement.md` |

---

## 2. Choix d'Architecture Logicielle
- **Stack Légère et Autonome :** Choix d'une architecture Vanilla JS moderne sans framework externe lourd pour assurer une disponibilité absolue hors-ligne pour le jury.
- **Moteur Graphique Vectoriel Dédié :** Développement d'un moteur de rendu SVG et HTML dynamique (`charts.js`) réagissant en moins de 50 ms aux actions de filtrage.
- **Pipeline RAG Hybride pour l'IA :** Traitement local haute vitesse des intentions décisionnelles avec possibilité de bascule vers un endpoint LLM distant.
