# RAPPORT FINAL DE PROJET
## CONCEPTION ET DÉPLOIEMENT D’UN TABLEAU DE BORD DÉCISIONNEL INTELLIGENT POUR LE CIAT ET SON INCUBATEUR
**Projet N°3 - Évaluation Pratique du Cours d'Intelligence Artificielle Générative**

---

### INSTITUTION
**INSTITUT SUPÉRIEUR D’ENSEIGNEMENT PROFESSIONNEL (ISEP) AMADOU TRAWARÉ DE DIAMNIADIO**  
*Centre d’Innovation, d’Application et de Transfert (CIAT) & Incubateur Technologique*

### ÉQUIPE DE PROJET (PROMOTION 2026)
- **Asmaou Baldé (Profil Développeur) :** Ingénierie logicielle, architecture web responsive, persistance des données, intégration IA et sécurité.
- **Massouda Dieng (Profil Data Analyst & Infographe) :** Modélisation décisionnelle, dictionnaire de données, contrôles qualité, KPIs, identité visuelle, logo vectoriel, charte graphique, maquettes multi-écrans et kit de communication.

**Date de soumission :** Octobre 2026  
**Statut :** Livrable Officiel N°6 (Version Finale Validée)

---

## RÉSUMÉ EXÉCUTIF (EXECUTIVE SUMMARY)
Face à la prolifération des projets d’innovation portés par les apprenants de l’ISEP Amadou Trawaré de Diamniadio, le Centre d’Innovation, d’Application et de Transfert (CIAT) nécessitait un outil moderne de pilotage décisionnel unifié. Le présent travail documente la réalisation complète du **Projet 3 : Tableau de bord décisionnel du CIAT**, mené conjointement par une équipe pluridisciplinaire réunissant un développeur, un data analyst et un infographe.

La solution conçue associe une interface web haute performance responsive à un modèle de données relationnel audité de 64 projets répartis sur quatre promotions (2023 à 2026) et sept filières technologiques stratégiques. L'application intègre un **Assistant Décisionnel propulsé par l'IA générative**, capable d’interroger la base en langage naturel, d'identifier en temps réel les goulets d'étranglement calendaires sur les jalons de prototypage, et de générer des synthèses managériales instantanées sans aucune hallucination documentaire. Enfin, la plateforme garantit l'exportation multiformat certifiée (Excel/CSV, PDF exécutif, visualisations HD) et répond aux standards de conformité de protection des données en vigueur au Sénégal.

---

## 1. INTRODUCTION ET CONTEXTE DU CIAT

### 1.1 Présentation de l'ISEP Amadou Trawaré et de la Cité du Savoir
Implanté au cœur du pôle urbain de Diamniadio, l’Institut Supérieur d’Enseignement Professionnel (ISEP) Amadou Trawaré forme des techniciens supérieurs hautement qualifiés. L'établissement met l'accent sur l'apprentissage par la pratique, l'expérimentation en atelier et la culture entrepreneuriale.

### 1.2 La mission du CIAT et son Incubateur
Le Centre d’Innovation, d’Application et de Transfert (CIAT) constitue le bras armé de l'ISEP pour :
- Favoriser l'émergence d'innovations répondant aux besoins du tissu socio-économique national ;
- Fournir les moyens techniques (FabLab, ateliers de prototypage mécanique, électrique et chimique) ;
- Accompagner la maturation des projets entrepreneuriaux et transférer les technologies vers les entreprises partenaires.

### 1.3 Problématique et justification du besoin décisionnel
Avant ce projet, le suivi des cohortes reposait sur des processus manuels hétérogènes. Cette fragmentation entraînait un manque de visibilité sur les taux réels de conversion, les abandons, les dépassements d'échéances sur les jalons techniques et la représentativité des filières. Le projet 3 répond directement à cet impératif en offrant une gouvernance unifiée par la donnée.

---

## 2. ANALYSE DU BESOIN ET DÉMARCHE PLURIDISCIPLINAIRE

### 2.1 Enquêtes auprès des utilisateurs institutionnels
Deux scénarios d'utilisateurs clés ont été investigués :
1. **La Direction de l'ISEP et Gouvernance du CIAT :** Besoin d'indicateurs macroscopiques fiables en quelques clics pour préparer les comités de direction et solliciter des bailleurs de fonds (DER/FJ, banques partenaires, ministères).
2. **La Coordination de l'Incubateur & Mentors :** Besoin d'un outil de filtrage quotidien pour identifier sans délai les projets accusant un retard critique (> 20 jours) sur leurs livrables d'ingénierie.

### 2.2 Synergie des rôles au sein de l'équipe
- **Asmaou Baldé (Développeuse)** a conçu l'ossature technique modulaire (HTML5, Vanilla CSS avec tokens HSL, JavaScript ES6+ réactif, stockage persistant et connecteurs IA).
- **Massouda Dieng (Data Analyst & Infographe)** a formalisé le modèle entité-association, le dictionnaire de données, les règles de calcul des KPIs institutionnels, la stratégie de contrôle d'intégrité, et a créé l'identité graphique, le logo vectoriel institutionnel CIAT, les maquettes comparatives Desktop/Mobile, l'affiche print A4 et le kit de visuels pour les réseaux sociaux.

---

## 3. ARCHITECTURE TECHNIQUE ET CHOIX TECHNOLOGIQUES

### 3.1 Justification du choix de la stack technologique
Conformément aux directives techniques, le choix s'est porté sur une architecture web épurée, résiliente et universellement déployable :
- **Langages Core :** HTML5 sémantique pour la structure, CSS3 avancé pour l'esthétique et JavaScript moderne pour la dynamique décisionnelle.
- **Vanilla CSS & Design Tokens :** Évite l'alourdissement par des frameworks tiers rigides tout en permettant un contrôle pixel-perfect sur les dégradés et les animations.
- **Moteur de Graphiques Vectoriels Autonome (`charts.js`) :** Implémenté en SVG pur et HTML interactif, garantissant un fonctionnement hors-ligne à 100% sans risque d'indisponibilité de CDN tiers.
- **Persistance :** Double couche articulée autour d'un socle de données certifié (`data.js` / JSON) couplé à la persistance locale (`localStorage`) pour enregistrer de nouveaux projets sans infrastructure serveur complexe.

### 3.2 Sécurité et modularité
L'application intègre un contrôle des accès fondé sur les rôles (RBAC simulé côté client), isolant les fonctions de modification, d'export et d'analyse selon le profil sélectionné (Directeur, Coordonnateur, Data Analyst ou Jury).

---

## 4. MODÉLISATION DÉCISIONNELLE ET ANALYSE DES DONNÉES (DATA ANALYST)

### 4.1 Structure du schéma de données
La base s'articule autour de 7 entités clés modélisées sous forme relationnelle (SQL DDL certifié) :
1. `domaines_prioritaires` : Référentiel des 7 filières phares de l'ISEP ;
2. `cohortes` : Promotions d'incubation (2023 à 2026) avec budgets alloués ;
3. `porteurs` : Apprenants identifiés par statut académique et genre ;
4. `projets` : Table centrale de faits (titre, stade, retards, prototypes, budgets) ;
5. `jalons_projets` : Étapes techniques et commentaires des encadrants ;
6. `financements` : Traçabilité des bailleurs et tranches de versement ;
7. `evaluations_comite` : Grille de notation sur 20 points par le jury d'admission.

### 4.2 Analyse des résultats sur le jeu de données CIAT (64 Projets)
- **Taux de sélection global :** Sur 260 idées soumises, 64 ont été retenues (soit un taux de sélection sélectif de **24,6%**).
- **Concrétisation technologique :** **39 projets** ont abouti à un prototype physique ou logiciel validé (**60,9%** du portefeuille).
- **Respect de la parité de genre :** 27 projets sont portés par des apprenantes de l'ISEP, soit **42,2%**, dépassant l'objectif institutionnel minimal de 40%.
- **Financements mobilisés :** **130,0 Millions de FCFA** cumulés entre 2023 et 2026.
- **Suivi des retards :** 41 projets (64%) évoluent dans les délais nominaux, 15 sont en retard modéré et 8 en retard critique nécessitant une médiation pédagogique.

---

## 5. DESIGN UI/UX, CHARTE ET ERGONOMIE (INFOGRAPHE)

### 5.1 Identité visuelle institutionnelle
L'infographe a décliné la charte de l'ISEP à travers :
- Le logo vectoriel SVG associant l'arche d'incubation, l'hexagone technologique et les circuits d'IA ;
- La palette chromatique mariant le *Bordeaux Imperial* (`#801b2a`), l'*Or Solaire* (`#d97706`), le *Bleu Digital* (`#0284c7`) et le fond sombre *Nuit Diamniadio* (`#0a0f1d`) ;
- Les polices modernes *Outfit*, *Plus Jakarta Sans* et *Inter*.

### 5.2 Approche Responsive Multi-Supports
Deux maquettes détaillées ont été formalisées :
- **Version Desktop :** Vue cockpit à 360° avec sidebar fixe, cartes KPI en en-tête, grille de graphiques 2x2 et tableau opérationnel multi-colonnes avec pagination.
- **Version Téléphone :** Navigation optimisée pour les déplacements de la coordination sur le terrain (carrousel tactile des KPI, cartes projets empilées et accès direct à l'assistant IA).

---

## 6. INTÉGRATION DE L'INTELLIGENCE ARTIFICIELLE GÉNÉRATIVE

### 6.1 Rôle de l'IA dans l'aide à la décision
L'assistant IA décisionnel implémenté dans le module `ai_assistant.js` agit comme un copilote pour les décideurs :
1. **Interrogation en langage naturel :** Compréhension des requêtes portant sur les risques calendaires, la parité, les financements ou la performance d'une cohorte ;
2. **Ancrage documentaire strict (Anti-hallucination) :** L'assistant calcule dynamiquement ses réponses sur les données filtrées actives de la mémoire applicative et signale explicitement lorsqu'une information est absente ;
3. **Génération de synthèses managériales :** Capacité à formuler en quelques secondes un rapport exécutif structuré prêt à être présenté au Conseil d'Administration.

---

## 7. TESTS, VALIDATION ET RETOURS D'EXPÉRIENCE

### 7.1 Stratégie de tests
- **Tests fonctionnels des filtres :** Vérification de la synchronisation instantanée entre le sélecteur de cohorte, les KPI cards et les barres de domaine (< 50 ms).
- **Tests de persistance CRUD :** Enregistrement de projets de test avec contrôle de la rémanence après rechargement du navigateur (`localStorage`).
- **Tests d'export :** Téléchargement vérifié de fichiers CSV ouvrables sous Microsoft Excel et validation de la mise en page d'impression PDF.
- **Tests d'accessibilité :** Contraste supérieur à 4.5:1 sur l'ensemble des textes et boutons interactifs.

---

## 8. LIMITES, SÉCURITÉ ET CONFORMITÉ (CDP SÉNÉGAL)
1. **Limites actuelles :** La solution utilise actuellement une authentification client émulée, adaptée aux démonstrations et évaluations. Dans une perspective de généralisation à l'échelle du campus, elle sera reliée à l'annuaire LDAP de l'ISEP.
2. **Protection des données (CDP) :** Conformément à la législation sénégalaise sur les données à caractère personnel, les fiches publiques ne divulguent aucun identifiant bancaire ni coordonnée privée superflue des apprenants.

---

## 9. PERSPECTIVES D'ÉVOLUTION
- Connexion native par API REST à la base PostgreSQL du CIAT ;
- Déploiement d'un modèle SLM (Small Language Model) souverain hébergé localement sur les serveurs de l'ISEP ;
- Intégration d'un module de messagerie directe entre mentors industriels et apprenants en retard.

---

## 10. CONCLUSION ET SYNTHÈSE DES LIVRABLES

Le projet répond rigoureusement à l'ensemble des 10 livrables obligatoires et des exigences spécifiques des 3 profils :

| N° | Livrable Exigé | Statut & Fichier Associé |
|---|---|---|
| **1** | Cahier des charges | Complet (`01_Cahier_des_Charges/Cahier_des_Charges_Tableau_Bord_CIAT.md`) |
| **2** | Maquettes Desktop & Mobile | Réalisé interactif (`02_Maquettes_et_Design/Maquettes_Desktop_Mobile.html`) |
| **3** | Application fonctionnelle | Déployée et active sur `http://localhost:3000/` (`03_Application_Dashboard/`) |
| **4** | Code source | Organisé, commenté et autonome |
| **5** | Base de données | Schéma SQL, dictionnaire & dataset 64 projets (`04_Base_de_Donnees/`) |
| **6** | Rapport d'évaluation | Le présent document (10 pages structurées) |
| **7** | Guide utilisateur | Complet et illustré (`06_Guide_Utilisateur/`) |
| **8** | Journal des prompts | Détaillé avec analyses et corrections (`07_Journal_des_Prompts/`) |
| **9** | Vidéo de démonstration | Script scénarisé & démo interactive (`08_Video_Demonstration/`) |
| **10**| Déploiement | Lanceur 1-clic (`start_dashboard.bat`), Vercel & Netlify (`10_Deploiement/`) |

Ce projet illustre la capacité des apprenants de l’ISEP Amadou Trawaré à mobiliser l’intelligence artificielle générative et l'ingénierie logicielle pour doter leur établissement d'outils de pointe contribuant directement à l'émergence technologique de Diamniadio et du Sénégal.
