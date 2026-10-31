# CAHIER DES CHARGES FONCTIONNEL ET TECHNIQUE
## Projet 3 : Tableau de Bord Décisionnel du CIAT & Incubateur
**Institut Supérieur d'Enseignement Professionnel (ISEP) Amadou Trawaré de Diamniadio**  
**Centre d’Innovation, d’Application et de Transfert (CIAT)**

---

### Informations Générales sur le Projet
- **Intitulé du Projet :** Plateforme Analytique et Tableau de Bord Décisionnel Intelligent du CIAT
- **Équipe de réalisation :** Équipe CIAT Innovation - ISEP Diamniadio
  - **Asmaou Baldé :** Développeuse Full-Stack, Architecture & Intégration IA
  - **Massouda Dieng :** Data Analyst & Infographe / UI-UX Designer
- **Cadre d'évaluation :** Évaluation pratique du cours d'Intelligence Artificielle Générative
- **Version du document :** 1.0 (Validée)
- **Date :** Octobre 2026

---

## 1. Contexte Institutionnel et Problématique

### 1.1 Contexte de l'ISEP Amadou Trawaré et du CIAT
L’**Institut Supérieur d’Enseignement Professionnel Amadou Trawaré (ISEP-AT)** de Diamniadio forme des techniciens supérieurs hautement qualifiés dans divers métiers stratégiques (TIC, mécanique, agro-transformation, énergie, pharmacie, etc.).

Le **Centre d’Innovation, d’Application et de Transfert (CIAT)** de l'ISEP Amadou Trawaré a pour mission :
- La promotion de l’innovation technologique et de la recherche appliquée ;
- Le développement, l'expérimentation et le transfert de technologies vers le tissu économique local et sous-régional ;
- L'accueil, la maturation et l'accompagnement des porteurs de projets à travers son **incubateur d'entreprises innovantes**.

### 1.2 Problématique constatée
Au fil des cohortes d'apprenants et de porteurs de projets, le CIAT accumule un volume important de données hétérogènes :
- Idées soumises lors des appels à projets ;
- Projets sélectionnés pour l'incubation ;
- État d'avancement des prototypes et brevets éventuels ;
- Calendrier des jalons de formation et de mentorat ;
- Données de parité de genre et de représentativité sectorielle ;
- Financements débloqués et partenariats industriels noués.

Cependant, le CIAT souffrait jusqu'alors d'un **déficit d'outils d'aide à la décision unifiés** :
1. **Éparpillement des données** : données dispersées sur des tableurs isolés, rapports textuels et fiches papier.
2. **Visibilité restreinte en temps réel** : difficulté d'identifier rapidement les projets en retard critique ou à fort potentiel de transfert.
3. **Absence d'indicateurs standardisés** : pas de vision consolidée de l'impact socio-économique et du taux de réussite par domaine technique.
4. **Temps de reporting chronophage** : la direction consacrait un temps excessif à compiler manuellement des synthèses pour les partenaires institutionnels et ministériels.

### 1.3 Objectifs de la solution
Le projet vise à concevoir et déployer une **plateforme web décisionnelle interactive**, couplée à un **moteur d'IA générative**, permettant à la gouvernance du CIAT :
- De piloter l'ensemble du pipeline d'innovation en temps réel ;
- De croiser les métriques clés (cohortes, domaines, genres, budgets, retards) ;
- D'interroger les données en langage naturel via un **Assistant Décisionnel IA** capable de fournir des diagnostics immédiats, des synthèses exécutives et des recommandations d'action.

---

## 2. Utilisateurs Cibles et Scénarios d'Usage

### 2.1 Personas Définis

| Persona | Rôle institutionnel | Besoins principaux | Fréquence d'utilisation |
|---|---|---|---|
| **Dr. Mamadou Fall** | Directeur de l'ISEP & Gouvernance CIAT | Vision stratégique globale, KPI macro, détection des risques majeurs, génération automatique de synthèses pour le Conseil d'Administration. | Hebdomadaire / Mensuelle |
| **Aïssatou Ndiaye** | Coordonnatrice de l'Incubateur | Suivi opérationnel jalon par jalon, alertes de retards des cohortes, suivi des mentors et des besoins de financement. | Quotidienne |
| **Abdoulaye Sow** | Data Analyst / Responsable Suivi-Évaluation | Filtrage multicritère fin, contrôle qualité des données, exports Excel/CSV, analyse comparative inter-cohortes. | Quotidienne / Hebdomadaire |
| **Partenaires & Jurys** | Bailleurs de fonds, industriels, jurys d'évaluation | Consultation des réussites du CIAT, prototypes aboutis, statistiques de genre et d'impact territorial. | Ponctuelle |

### 2.2 Scénarios Utilisateurs Validés
- **Scénario 1 (Gouvernance) :** Le Directeur souhaite connaître en 30 secondes l'état des financements de la Cohorte 2025 et les 3 projets TIC ayant un retard supérieur à 15 jours. Il pose la question directement à l'assistant IA et exporte la fiche synthétique en PDF.
- **Scénario 2 (Coordonnatrice) :** La coordonnatrice filtre les projets par le domaine *« Agriculture & Environnement »* pour préparer la commission de déblocage des fonds de prototypage. Elle visualise le funnel de conversion (Idée ➔ Prototypage ➔ Incubation) et ajuste le statut des projets.
- **Scénario 3 (Data Analyst) :** L'analyste vérifie la conformité des données de parité (ratio femmes/hommes porteurs de projets) sur les cohortes 2023 à 2026, génère un graphique comparatif et télécharge le jeu de données nettoyé au format CSV.

---

## 3. Périmètre et Exigences Fonctionnelles

### 3.1 Exigences Fonctionnelles (EF)

| Identifiant | Intitulé | Description détaillée | Priorité MoSCoW |
|---|---|---|---|
| **EF-01** | Filtres multicritères dynamiques | Filtrage interactif simultané par **Période/Année**, **Cohorte** (2023 à 2026), **Domaine d'application** (7 filières CIAT), **Statut du projet** (Idée, Sélectionné, Prototypage, Incubation, Terminé, En retard) et **Genre du porteur**. | **Must have** |
| **EF-02** | Indicateurs Clés de Performance (KPI) | Calcul et affichage en temps réel : Nombre total d'idées reçues, projets sélectionnés, prototypes fonctionnels créés, volume de financements mobilisés (en FCFA), taux moyen de complétion et taux d'attrition/retard. | **Must have** |
| **EF-03** | Visualisations interactives riches | - Graphique en barres : Projets par domaine prioritaire.<br>- Graphique en courbes : Évolution chronologique et progression des jalons.<br>- Donut charts : Répartition par genre et par statut d'incubation.<br>- Graphique radar : Performance multidimensionnelle des filières.<br>- Pipeline Funnel : Taux de conversion des projets. | **Must have** |
| **EF-04** | Table des projets & Suivi des retards | Tableau interactif avec tri multicritère, recherche textuelle instantanée, pagination, statut visuel coloré (badges) et indicateur d'écart calendaire (+/- X jours de retard). | **Must have** |
| **EF-05** | Assistant Décisionnel IA (NLP) | Module d'intelligence artificielle générative permettant d'interroger la base de données en langage naturel (ex: *"Quels sont les prototypes prêts à être financés ?"*), proposant des questions rapides, des analyses prédictives et des recommandations managériales fiables (ancrées sur les données réelles du CIAT). | **Must have** |
| **EF-06** | Formulaire de saisie & Mise à jour (CRUD) | Interface de création et d'actualisation d'un projet ou d'un jalon avec validation stricte des champs, persistance dans la base locale (`localStorage` et modèle relationnel). | **Should have** |
| **EF-07** | Module d'export multicritère | Exportation des données et visualisations sous trois formats obligatoires : **Excel/CSV** (données brutes filtrées), **PDF** (rapport exécutif mis en page prêt à l'impression), et **Image PNG** (capture haute définition des graphiques). | **Must have** |
| **EF-08** | Gestion des profils et droits d'accès | Sélecteur de rôle (Directeur CIAT, Coordonnateur, Data Analyst, Jury/Invité) adaptant les permissions d'édition, de consultation et d'export. | **Should have** |
| **EF-09** | Comparateur inter-cohortes | Outil d'analyse comparative directe entre deux promotions (ex: Cohorte 2024 vs Cohorte 2025) sur le taux de sélection et la vitesse de prototypage. | **Could have** |

### 3.2 Les 7 Domaines d'Application Prioritaires du CIAT (respect strict du sujet)
1. **TIC, numérique, intelligence artificielle et données**
2. **Mécanique, fabrication et maintenance**
3. **Agriculture, transformation et environnement**
4. **Énergie, efficacité énergétique et énergies renouvelables**
5. **Pharmaceutique et biomédical**
6. **Éducation, formation professionnelle et insertion**
7. **Services aux collectivités, entrepreneuriat et incubation**

---

## 4. Exigences Non-Fonctionnelles (ENF)

| Identifiant | Domaine | Exigence |
|---|---|---|
| **ENF-01** | **Ergonomie & UX** | Interface soignée respectant la charte graphique de l'ISEP (bordeaux élégant `#731b2c`, or impérial `#d4af37`, fond sombre/clair moderne, typographie lisible *Plus Jakarta Sans* et *Inter*). |
| **ENF-02** | **Performance** | Temps de réponse et de rafraîchissement des graphiques inférieur à **100 ms** lors de l'application d'un filtre sur un échantillon de 100+ projets. |
| **ENF-03** | **Responsive Design** | Affichage fluide et opérationnel sur ordinateur de bureau (Full HD / 4K), tablettes et smartphones (navigation tactile adaptée). |
| **ENF-04** | **Fiabilité de l'IA** | L'assistant conversationnel est configuré avec un ancrage documentaire rigoureux : il utilise le contexte de données actif et signale explicitement lorsqu'une information est absente de la base, évitant toute hallucination. |
| **ENF-05** | **Autonomie & Portabilité** | L'application doit pouvoir fonctionner en local sans dépendance lourde complexe, être déployable instantanément sur les plateformes Cloud web (Vercel, Netlify, GitHub Pages) ou via un serveur local autonome. |
| **ENF-06** | **Sécurité & Protection** | Données personnelles des apprenants protégées conformément aux recommandations de la CDP (Commission des Données Personnelles du Sénégal). |

---

## 5. Limites et Hypothèses du Projet

### 5.1 Limites
- Le projet s'appuie sur un jeu de données synthétique certifié et réaliste (60+ projets, 4 cohortes) représentatif des activités réelles du CIAT de Diamniadio.
- L'authentification est simulée par gestion des rôles côté client avec session sécurisée pour les besoins de la démonstration et du jury sans nécessiter de serveur LDAP institutionnel externe.

### 5.2 Hypothèses de Déploiement
- Tout membre du jury peut tester la solution immédiatement soit via un navigateur moderne (Chrome, Edge, Firefox, Safari) en ouvrant l'application hébergée ou locale, sans prérequis d'installation de base de données lourde.

---

## 6. Validation et Signatures

| Rôle | Nom & Prénom | Statut |
|---|---|---|
| **Responsable Développeur** | Profil Développeur (Équipe CIAT) | Validé |
| **Responsable Data Analyst** | Profil Data Analyst (Équipe CIAT) | Validé |
| **Responsable Infographe** | Profil Infographe (Équipe CIAT) | Validé |
| **Pour le CIAT / ISEP-AT** | Commission d'Évaluation IA Générative | Pour Examen |
