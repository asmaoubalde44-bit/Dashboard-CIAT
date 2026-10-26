# FICHE DE CONTRIBUTION TECHNIQUE : PROFIL DATA ANALYST
## Évaluation Pratique en Intelligence Artificielle Générative - CIAT & Incubateur
**Institut Supérieur d’Enseignement Professionnel (ISEP) Amadou Trawaré de Diamniadio**

---

### Identité du Profil
- **Rôle :** Responsable Modélisation Décisionnelle, Qualité des Données & Analyse Prédictive
- **Projet :** Projet 3 - Tableau de Bord Décisionnel Intelligent du CIAT
- **Promotion :** 2026

---

## 1. Synthèse des Réalisations selon les Exigences du Sujet (Section 9.2)

| Exigence du Sujet (9.2) | Implémentation Concrète dans la Solution | Fichiers Sources Associés |
|---|---|---|
| **Dictionnaire et contrôle de qualité des données** | Dictionnaire exhaustif de 7 tables relationnelles et rapport d'audit qualité sur 64 projets (100% de complétude sur les champs clés, zéro orphelin). | `04_Base_de_Donnees/dictionnaire_des_donnees.md`<br>`04_Base_de_Donnees/controle_qualite_donnees.md` |
| **Définition précise des indicateurs (KPIs)** | Formalisation mathématique et calcul en temps réel du taux de sélection (24,6%), taux de prototypage (60,9%), ratio de mixité féminine (42,2%) et taux d'attrition/retard. | `01_Cahier_des_Charges/Cahier_des_Charges_Tableau_Bord_CIAT.md`<br>`03_Application_Dashboard/app.js` |
| **Analyses descriptives et visualisations pertinentes** | - Bar chart vectoriel des 7 filières prioritaires ISEP.<br>- Donut de parité F/M interactif.<br>- Funnel du pipeline de transfert.<br>- Comparateur inter-cohortes (2023-2026). | `03_Application_Dashboard/charts.js` |
| **Tableau de bord interactif avec filtres** | Filtrage croisé multi-critères instantané (Cohorte, Filière, Statut, Genre, Recherche plein texte). | `03_Application_Dashboard/app.js` |
| **Interprétation des résultats et recommandations** | Diagnostic managérial sur les 8 projets en retard critique, alertes d'approvisionnement FabLab et préconisations de déblocage de fonds de prototypage. | `05_Rapport_Final/Rapport_Evaluation_Tableau_Bord_CIAT.md`<br>`03_Application_Dashboard/ai_assistant.js` |
| **Protection des données et signalement des limites** | Conformité stricte avec les directives de la CDP (Commission des Données Personnelles du Sénégal) : masquage des coordonnées privées et identification des biais d'échantillonnage. | `04_Base_de_Donnees/controle_qualite_donnees.md` |

---

## 2. Synthèse Statistique du Portefeuille CIAT (Dataset Validé)
- **Portefeuille total :** 64 projets retenus sur 260 idées soumises (Sélectivité : 24,6%).
- **Top 3 des Domaines par Volume :** TIC & IA (21,9%), Agriculture & Transformation (18,8%), Énergies Renouvelables (15,6%).
- **Budget Global Engagé :** 130 000 000 FCFA (soit une moyenne de 2,03 Millions FCFA par projet accompagné).
- **Indicateur Mixité & Inclusion :** 42,2% de femmes porteuses (Objectif supérieur au quota ministériel de 40%).
- **Santé Globale du Pipeline :** 64,1% dans les délais nominaux, 23,4% en vigilance modérée, 12,5% nécessitant une médiation d'urgence.
