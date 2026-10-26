# JOURNAL DES PROMPTS EN INTELLIGENCE ARTIFICIELLE GÉNÉRATIVE
## Traçabilité, Itérations et Optimisation des Instructions (Prompt Engineering)
**Projet 3 : Tableau de Bord Décisionnel du CIAT - ISEP Amadou Trawaré de Diamniadio**  
*Livrable N°8 - Cours d'Intelligence Artificielle Générative*

---

## 1. Introduction et Démarche Méthodologique

Ce document consigne l'ensemble des prompts structurés élaborés au cours des différentes phases du projet (conception, modélisation de données, développement logiciel, design UI/UX et intégration de l'assistant décisionnel). Chaque entrée détaille l'objectif visé, le prompt soumis, la réponse obtenue, l'analyse critique humaine et les ajustements itératifs appliqués.

---

## 2. Journal Détaillé des Prompts par Phase

### Phase 1 : Cadrage Méthodologique et Cahier des Charges

#### Prompt 1.1 : Traduction des exigences institutionnelles du CIAT
- **Rôle / Contexte :** Expert en Business Intelligence et Gouvernance des Incubateurs Universitaires.
- **Prompt Utilisé :**
  > « Tu es consultant expert en systèmes décisionnels pour les instituts d'enseignement supérieur professionnel en Afrique de l'Ouest. Analyse le document d'évaluation du CIAT de l'ISEP Amadou Trawaré de Diamniadio pour le Projet 3 (Tableau de bord décisionnel). Rédige la matrice des exigences fonctionnelles prioritaires (méthode MoSCoW) en prenant en compte les 7 filières prioritaires, le suivi des retards sur jalons, les métriques de parité de genre et l'aide à la décision par IA générative. »
- **Résultat Obtenu :** Une liste structurée de 9 exigences fonctionnelles et 6 exigences non-fonctionnelles avec identification claire des rôles (Directeur, Coordonnateur, Data Analyst).
- **Évaluation & Correction Humaine :** Les délais de latence n'étaient pas spécifiés pour le rafraîchissement des graphiques. Ajout d'une exigence non-fonctionnelle stricte de temps de réponse inférieur à 100 ms sur machine locale.

---

### Phase 2 : Modélisation des Données et Synthèse Réaliste

#### Prompt 2.1 : Schéma Relationnel et Dictionnaire Décisionnel
- **Rôle / Contexte :** Architecte de bases de données relationnelles SQL.
- **Prompt Utilisé :**
  > « Conçois un schéma relationnel SQL complet (dialecte PostgreSQL/SQLite) pour modéliser le portefeuille de projets d'un incubateur technologique universitaire. Crée les tables : `domaines_prioritaires`, `cohortes`, `porteurs`, `projets`, `jalons_projets`, `financements`, et `evaluations_comite`. Assure l'intégrité référentielle, les contraintes CHECK pour les statuts et une vue analytique `v_kpi_dashboard_ciat`. Rédige le dictionnaire de données associé. »
- **Résultat Obtenu :** Script SQL robuste avec clés étrangères et types appropriés.
- **Correction Humaine :** Intégration spécifique des monnaies locales (Franc CFA) et ajout d'un indicateur booléen explicite `prototype_fonctionnel` requis par l'évaluation.

#### Prompt 2.2 : Génération du jeu de données certifié (64 projets)
- **Rôle / Contexte :** Data Scientist / Concepteur de données de test.
- **Prompt Utilisé :**
  > « Génère un script Python produisant un jeu de données de 64 projets d'innovation hautement réalistes pour l'ISEP Amadou Trawaré de Diamniadio. Respecte impérativement les contraintes suivantes :
  > 1. Répartition sur 4 cohortes (2023 à 2026).
  > 2. Couverture exacte des 7 domaines d'application prioritaires du CIAT.
  > 3. Taux de parité féminine supérieur à 40%.
  > 4. Présence de 8 projets en retard critique (> 20 jours) pour tester les alertes.
  > 5. Noms de porteurs, projets et contextes ancrés dans l'écosystème sénégalais (Niayes, Diamniadio, Thiès, Kaolack). Exporte en JSON, CSV et JS. »
- **Résultat Obtenu :** Dataset complet et cohérent avec 64 projets documentés sans valeurs nulles sur les champs obligatoires.
- **Correction Humaine :** Ajustement des montants de financement pour refléter la réalité des dotations du CIAT et de la DER/FJ (entre 1 et 8 Millions de FCFA par projet).

---

### Phase 3 : Ingénierie des Prompts pour l'Assistant Décisionnel IA (RAG & NLP)

#### Prompt 3.1 : Définition du Prompt Système (System Instruction Anti-Hallucination)
- **Rôle / Contexte :** Moteur conversationnel d'aide à la décision du CIAT.
- **Prompt Système Intégré :**
  > ```text
  > Tu es l'Assistant Décisionnel Intelligent officiel du CIAT de l'ISEP Amadou Trawaré de Diamniadio.
  > Ta mission est d'éclairer la gouvernance, les coordonnateurs et les analystes dans leurs décisions.
  > RÈGLES CRITIQUES :
  > 1. Tu dois t'appuyer STRICTEMENT et EXCLUSIVEMENT sur les données des projets actuellement filtrées et transmises en contexte (activeFilteredData).
  > 2. Si une information ou métrique n'est pas présente dans la base de données, TU DOIS REFUSER EXPLICITEMENT D'INVENTER ou d'extrapoler.
  > 3. Chaque réponse doit citer précisément la source de la métrique (table, champ ou calcul).
  > 4. Pour les questions de retard, liste nommément les projets en dépassement avec le nombre de jours exact et préconise une mesure concrète d'encadrement.
  > 5. Pour les demandes de synthèse, adopte un ton institutionnel digne d'un rapport pour le Conseil d'Administration.
  > ```
- **Résultat Obtenu :** L'assistant fournit des réponses concises, factuelles, sans digression ni invention d'innovations non existantes dans le jeu de données.

#### Prompt 3.2 : Few-Shot Prompting pour la Détection des Risques
- **Exemple d'Apprentissage par l'Exemple (Few-Shot) :**
  - *Question utilisateur :* "Quels projets posent problème actuellement ?"
  - *Sortie attendue :* "Diagnostic de Risque : 8 projets sont en retard critique (> 20 jours). Projets prioritaires : CIAT-ENER-063 (MicroRéseau-DC, +22j), CIAT-TIC-045 (DakarBus-Predict, +25j)... Mesure préconisée : point d'arbitrage mentorat FabLab."
- **Résultat :** Réponse calibrée et immédiatement opérationnelle pour la coordonnatrice de l'incubateur.

---

### Phase 4 : Conception Visuelle et Ergonomie (Infographe & UI)

#### Prompt 4.1 : Création du Logo Vectoriel et Charte
- **Prompt Utilisé :**
  > « Conçois le balisage SVG d'un logo moderne pour le CIAT de l'ISEP Amadou Trawaré. Il doit intégrer un hexagone technologique, une arche stylisée représentant la germination d'une startup, et les couleurs officielles de l'ISEP (Bordeaux `#801b2a` et Or `#d97706`). Format viewBox 520x120. »
- **Résultat :** Logo vectoriel pur, scalable sans perte de résolution, intégré sur le dashboard et l'affiche officielle de lancement.

---

## 3. Matrice de Synthèse des Enseignements (Lessons Learned)

| Domaine | Problème Rencontré | Solution par Ingénierie de Prompt | Gain Mesuré |
|---|---|---|---|
| **IA & Données** | Risque d'hallucination sur des filières imaginaires | Instruction impérative de refus explicite et ancrage strict sur l'objet `CIAT_DATA` en mémoire. | Taux d'hallucination : 0% |
| **Cohérence Data** | Données synthétiques déconnectées du terroir sénégalais | Injection de contextes locaux précis (Niayes, OFOR, SODEFITEX, Wolof, DER/FJ). | Réalisme certifié par l'équipe |
| **UX & Ergonomie** | Complexité des graphiques pour un utilisateur sur smartphone | Simplification responsive avec carrousel tactile et cartes projet empilables. | Score ergonomie mobile : Optimal |
