# PROTOCOLE DE CONTRÔLE QUALITÉ ET GOUVERNANCE DES DONNÉES
**Volet Data Analyst - Centre d’Innovation, d’Application et de Transfert (CIAT)**
**ISEP Amadou Trawaré de Diamniadio**

---

## 1. Objectifs du Contrôle Qualité
Le tableau de bord décisionnel du CIAT est destiné à orienter les décisions d'allocation de budgets, de sélection de projets et de contractualisation avec les entreprises partenaires. La fiabilité, l'exhaustivité et la traçabilité des données constituent des impératifs absolus.

Ce document consigne les tests d'assurance qualité, les règles de nettoyage et les politiques de gouvernance appliquées au jeu de données du CIAT.

---

## 2. Matrice des Contrôles d'Intégrité et de Cohérence

| Dimension de Qualité | Critère testé | Règle de validation appliquée | Action en cas d'anomalie |
|---|---|---|---|
| **Complétude** | Taux de remplissage des champs obligatoires | 100% des projets doivent comporter un titre, un domaine valide, une cohorte, un porteur principal et un statut d'avancement. | Blocage à l'insertion via formulaire et rejet des enregistrements orphelins. |
| **Validité temporelle** | Chronologie des dates | `date_soumission <= date_entree_incubation <= date_fin_prevue`. | Alerte automatique lors de l'import : recalcul ou correction manuelle. |
| **Cohérence logique** | Statut vs Prototype | Si `stade_avancement` = 'Accélération / Transfert', alors `prototype_fonctionnel` = `TRUE`. | Rétrogradation automatique ou notification de contrôle au mentor. |
| **Unicité** | Clés primaires et codes projets | Pas de doublon sur `code_projet`, `email` de porteur ou `id_projet`. | Contrainte `UNIQUE` en base de données et hash de vérification. |
| **Plages de valeurs** | Notes et pourcentages | Note comité $\in [0, 20]$, jours de retard $\ge 0$, pourcentages $\in [0, 100]$. | Rejet des valeurs négatives ou supérieures aux bornes maximales. |
| **Exactitude monétaire** | Financements | `montant_financement_obtenu_fcfa` doit être égal à la somme des tranches dans la table `financements`. | Réconciliation automatique par trigger ou fonction d'agrégation. |

---

## 3. Résultats de l'Audit Qualité sur le Jeu de Données Test (64 Projets)

```text
================================================================================
RAPPORT D'AUDIT QUALITÉ - DATA ANALYST CIAT (ISEP DIAMNIADIO)
Échantillon analysé : 64 projets (Cohortes 2023, 2024, 2025, 2026)
Date d'exécution : 26 Octobre 2026
================================================================================

[✓] Contrôle 1 : Complétude des identifiants et clés primaires
    - Taux de complétude : 100.0% (0 valeur nulle détectée)

[✓] Contrôle 2 : Intégrité référentielle inter-tables
    - 64 / 64 projets rattachés à un domaine prioritaire valide (7/7 domaines couverts)
    - 64 / 64 projets rattachés à une cohorte existante
    - 64 / 64 porteurs identifiés avec genre et spécialité ISEP

[✓] Contrôle 3 : Cohérence des indicateurs de retard
    - Projets dans les délais : 41 (64.1%)
    - Projets en retard modéré (1 à 20 jours) : 15 (23.4%)
    - Projets en retard critique (> 20 jours) : 8 (12.5%)
    - Corrélation vérifiée avec les échéances des jalons techniques

[✓] Contrôle 4 : Répartition sectorielle et équilibre des filières
    - TIC, IA et Données : 14 projets (21.9%)
    - Agriculture & Agro-industrie : 12 projets (18.8%)
    - Énergies Renouvelables : 10 projets (15.6%)
    - Mécanique & Fabrication : 9 projets (14.1%)
    - Pharmaceutique & Biomédical : 7 projets (10.9%)
    - Éducation & Formation : 6 projets (9.4%)
    - Services & Entrepreneuriat : 6 projets (9.4%)

[✓] Contrôle 5 : Respect de la parité de genre
    - Projets portés par des femmes : 27 (42.2%)
    - Projets portés par des hommes : 37 (57.8%)
    - Objectif institutionnel CIAT (> 40% de mixité) : ATTEINT

Statut Global du Dataset : CONFORME ET VALIDÉ POUR EXPLOITATION DÉCISIONNELLE
```

---

## 4. Politique de Confidentialité et Protection des Données (Conformité CDP Sénégal)
1. **Anonymisation pour affichage public :** Sur les vues non administratives, les données sensibles (numéros de téléphone privés, coordonnées bancaires) sont masquées.
2. **Principe de minimisation :** Seules les informations nécessaires à l'accompagnement pédagogique et entrepreneurial sont conservées.
3. **Droit d'accès et de rectification :** Les apprenants porteurs de projets peuvent demander la modification de leurs fiches auprès de la coordination du CIAT.
