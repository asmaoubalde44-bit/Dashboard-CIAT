# FICHE DE CONTRIBUTION TECHNIQUE : PROFIL INFOGRAPHE
## Évaluation Pratique en Intelligence Artificielle Générative - CIAT & Incubateur
**Institut Supérieur d’Enseignement Professionnel (ISEP) Amadou Trawaré de Diamniadio**

---

### Identité du Profil
- **Rôle :** Responsable Identité Visuelle, UI/UX Design, Ergonomie & Supports Média
- **Projet :** Projet 3 - Tableau de Bord Décisionnel Intelligent du CIAT
- **Promotion :** 2026

---

## 1. Synthèse des Réalisations selon les Exigences du Sujet (Section 9.3)

| Exigence du Sujet (9.3) | Implémentation Concrète dans la Solution | Fichiers Sources Associés |
|---|---|---|
| **Logo officiel** | Logo vectoriel SVG intégrant l'arche d'incubation, l'hexagone technologique, les connexions d'IA et la typographie institutionnelle. | `02_Maquettes_et_Design/logo_ciat.svg` |
| **Identité visuelle cohérente avec la charte ISEP** | Charte de style unifiée basée sur le bordeaux ISEP (`#801b2a`), l'or solaire de Diamniadio (`#d97706`), le bleu tech (`#0284c7`) et le thème dark/light. | `02_Maquettes_et_Design/charte_graphique.md` |
| **Maquettes des pages et des parcours principaux** | Prototype interactif comparatif en HTML/CSS documentant la vue Ordinateur (Desktop HD) et la vue Téléphone (Mobile) avec annotations UX. | `02_Maquettes_et_Design/Maquettes_Desktop_Mobile.html` |
| **Illustrations et médias optimisés** | Icônes vectorielles SVG épurées, graphismes légers, dégradés CSS sans latence de chargement. | `03_Application_Dashboard/styles.css` |
| **Ergonomie sur ordinateur et téléphone** | Dispositions adaptatives (grille CSS 4 colonnes sur desktop, carrousel tactile horizontal et cartes projet empilables sur smartphone). | `03_Application_Dashboard/styles.css`<br>`02_Maquettes_et_Design/Maquettes_Desktop_Mobile.html` |
| **Affiche ou flyer de lancement** | Affiche officielle de communication A4 haute résolution prête pour l'impression avec QR Code vectoriel intégré et chiffres clés. | `02_Maquettes_et_Design/affiche_lancement.html` |
| **Kit de communication pour les réseaux sociaux** | Modèles complets de posts (textes, dimensions, hashtags et cibles) pour LinkedIn, Twitter/X, Instagram et bannières web. | `02_Maquettes_et_Design/kit_communication_reseaux_sociaux.md` |

---

## 2. Principes d'Expérience Utilisateur (UX) Appliqués
- **Clarté Cognitive :** Les indicateurs d'alerte et de retard utilisent des codes couleurs universels (Vert = OK, Ambre = Retard modéré, Rouge = Retard critique) doublés de libellés textuels explicites pour respecter les critères d'accessibilité WCAG AA.
- **Micro-Animations :** Effets de survol discrets (`hover`) sur les cartes, transitions fluides sur les jauges et animation d'apparition progressive de la réponse de l'assistant IA.
- **Sobriété et Élégance Institutionnelle :** Reflet fidèle du prestige académique de l'ISEP Amadou Trawaré allié au dynamisme d'un incubateur technologique de rang international.
