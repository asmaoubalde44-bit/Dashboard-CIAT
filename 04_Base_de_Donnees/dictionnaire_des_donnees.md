# DICTIONNAIRE DES DONNÉES DÉCISIONNELLES DU CIAT
**Système Décisionnel & Tableau de Bord de l'Incubateur ISEP Amadou Trawaré**

Ce document présente l'inventaire exhaustif des entités, attributs, types de données, contraintes d'intégrité et règles de gestion qui structurent la base de données du CIAT.

---

## 1. Entité : `domaines_prioritaires`
Représente les filières technologiques et métiers prioritaires de l'ISEP Amadou Trawaré de Diamniadio.

| Attribut | Type | Contraintes | Description & Règle de gestion | Exemple |
|---|---|---|---|---|
| `id_domaine` | `VARCHAR(20)` | **PK**, NOT NULL | Identifiant unique normalisé du domaine | `DOM_TIC` |
| `libelle_domaine` | `VARCHAR(120)` | NOT NULL | Nom officiel complet de la filière prioritaire | `TIC, IA & Données` |
| `description` | `TEXT` | NULL | Périmètre applicatif et technologies clés | `Solutions IoT, cloud, IA` |
| `couleur_code` | `VARCHAR(10)` | NOT NULL | Code hexadécimal pour l'uniformité visuelle | `#2563eb` |
| `departement_rattache` | `VARCHAR(100)` | NOT NULL | Département pédagogique de rattachement à l'ISEP | `Pôle Ingénierie Numérique` |

---

## 2. Entité : `cohortes`
Représente les promotions d'incubation accueillies au CIAT.

| Attribut | Type | Contraintes | Description & Règle de gestion | Exemple |
|---|---|---|---|---|
| `id_cohorte` | `VARCHAR(20)` | **PK**, NOT NULL | Code unique de la cohorte | `COH_2024` |
| `nom_cohorte` | `VARCHAR(100)` | NOT NULL | Dénomination usuelle de la promotion | `Promotion Diamniadio Emergence 2024` |
| `annee_debut` | `INT` | NOT NULL | Année de lancement de l'appel | `2024` |
| `annee_fin` | `INT` | NOT NULL | Année prévisionnelle ou effective de sortie | `2025` |
| `statut` | `VARCHAR(30)` | CHECK list | Statut (`En cours`, `Clôturée`, `En recrutement`, `Préparatoire`) | `Clôturée` |
| `nb_candidatures_recues` | `INT` | >= 0 | Nombre brut de dossiers soumis | `45` |
| `nb_projets_retenus` | `INT` | >= 0 | Nombre final de projets acceptés en incubation | `18` |
| `budget_alloue_fcfa` | `BIGINT` | >= 0 | Dotation financière globale d'accompagnement | `25000000` |

---

## 3. Entité : `porteurs`
Représente les porteurs de projet (apprenants, diplômés ou enseignants de l'ISEP).

| Attribut | Type | Contraintes | Description & Règle de gestion | Exemple |
|---|---|---|---|---|
| `id_porteur` | `VARCHAR(20)` | **PK**, NOT NULL | Identifiant unique du porteur | `POR_012` |
| `nom` | `VARCHAR(60)` | NOT NULL | Nom de famille | `Diallo` |
| `prenom` | `VARCHAR(60)` | NOT NULL | Prénom de l'apprenant | `Fatoumata` |
| `genre` | `VARCHAR(10)` | CHECK (`Féminin`, `Masculin`) | Genre (indispensable pour indicateur parité) | `Féminin` |
| `email` | `VARCHAR(100)` | UNIQUE, NOT NULL | Adresse mail institutionnelle ou personnelle | `f.diallo@isep.sn` |
| `telephone` | `VARCHAR(30)` | NULL | Coordonnées de contact direct | `+221 77 123 45 67` |
| `statut_academique` | `VARCHAR(50)` | CHECK list | `Apprenant ISEP`, `Diplômé ISEP`, `Porteur Externe` | `Apprenant ISEP` |
| `filiere_origine` | `VARCHAR(100)` | NULL | Spécialité de formation initiale | `BTS Énergies Renouvelables` |
| `niveau_etude` | `VARCHAR(30)` | NULL | Bac+2, Bac+3, Licence Pro, etc. | `Bac+2 (2ème année)` |

---

## 4. Entité : `projets` (Table Centrale de Faits)
Détaille chaque projet suivi par le CIAT avec son historique, ses métriques et son statut.

| Attribut | Type | Contraintes | Description & Règle de gestion | Exemple |
|---|---|---|---|---|
| `id_projet` | `VARCHAR(20)` | **PK**, NOT NULL | Identifiant unique interne | `PRJ_2024_005` |
| `code_projet` | `VARCHAR(30)` | UNIQUE, NOT NULL | Référence d'enregistrement officielle | `CIAT-AGRI-024` |
| `titre` | `VARCHAR(150)` | NOT NULL | Intitulé clair de la solution innovante | `AgroSolaire Séchoir Intelligent` |
| `resume_probleme` | `TEXT` | NOT NULL | Problème socio-économique ciblé au Sénégal | `Pertes post-récoltes de mangues` |
| `solution_proposee` | `TEXT` | NOT NULL | Innovation technique développée | `Séchoir hybride solaire régulé par IoT` |
| `id_domaine` | `VARCHAR(20)` | **FK**, NOT NULL | Référence au domaine prioritaire | `DOM_AGRI` |
| `id_cohorte` | `VARCHAR(20)` | **FK**, NOT NULL | Référence à la cohorte d'appartenance | `COH_2024` |
| `id_porteur_principal` | `VARCHAR(20)` | **FK**, NOT NULL | Référence au leader du projet | `POR_012` |
| `stade_avancement` | `VARCHAR(40)` | CHECK list | `Idée`, `Sélectionné`, `Prototypage`, `Incubation`, `Accélération / Transfert`, `Abandonné` | `Prototypage` |
| `date_soumission` | `DATE` | NOT NULL | Date du dépôt initial de la candidature | `2024-02-15` |
| `date_entree_incubation`| `DATE` | NULL | Date de contractualisation au CIAT | `2024-04-01` |
| `date_fin_prevue` | `DATE` | NULL | Échéance fixée du programme d'incubation | `2024-12-31` |
| `statut_retard` | `VARCHAR(20)` | CHECK list | `Dans les délais`, `Retard modéré`, `Retard critique`, `Jalon franchi` | `Retard modéré` |
| `jours_retard` | `INT` | DEFAULT 0 | Nombre de jours de dépassement par rapport au jalon actif | `14` |
| `note_evaluation_comite`| `DECIMAL(4,2)`| 0 <= Note <= 20 | Note de sélection attribuée par le jury d'admission | `16.50` |
| `prototype_fonctionnel` | `BOOLEAN` | DEFAULT FALSE | Indique si le prototype physique/logiciel est validé | `TRUE` |
| `brevet_ou_protection` | `BOOLEAN` | DEFAULT FALSE | Dépôt auprès de l'OAPI ou droit d'auteur | `TRUE` |
| `partenaire_industriel` | `VARCHAR(120)` | NULL | Entreprise marraine ou partenaire d'application | `SODEFITEX / SAED` |
| `montant_financement_obtenu_fcfa` | `BIGINT` | DEFAULT 0 | Cumul des fonds et subventions mobilisés | `4500000` |

---

## 5. Entité : `jalons_projets`
Enregistre les jalons programmatiques et techniques de chaque projet incubé.

| Attribut | Type | Contraintes | Description | Exemple |
|---|---|---|---|---|
| `id_jalon` | `VARCHAR(20)` | **PK**, NOT NULL | Identifiant du jalon | `JAL_101` |
| `id_projet` | `VARCHAR(20)` | **FK**, NOT NULL | Projet rattaché | `PRJ_2024_005` |
| `titre_jalon` | `VARCHAR(100)` | NOT NULL | Nom de l'étape clé | `Validation du modèle CAO & PCB` |
| `date_echeance` | `DATE` | NOT NULL | Date limite prévue | `2024-07-30` |
| `date_realisation` | `DATE` | NULL | Date effective de validation | `2024-08-13` |
| `statut_jalon` | `VARCHAR(30)` | CHECK list | `À venir`, `En cours`, `Validé`, `En retard`, `Non validé` | `Validé` |
| `commentaire_mentor` | `TEXT` | NULL | Feedback de l'encadrant technique | `Prototype thermique concluant` |

---

## 6. Entité : `financements`
Traçabilité des subventions, aides du CIAT et investissements partenaires.

| Attribut | Type | Contraintes | Description | Exemple |
|---|---|---|---|---|
| `id_financement` | `VARCHAR(20)` | **PK**, NOT NULL | Identifiant unique de la tranche | `FIN_042` |
| `id_projet` | `VARCHAR(20)` | **FK**, NOT NULL | Projet bénéficiaire | `PRJ_2024_005` |
| `bailleur_partenaire` | `VARCHAR(120)` | NOT NULL | Organisme financeur | `Fonds CIAT Prototypage` |
| `type_financement` | `VARCHAR(50)` | CHECK list | Subvention, Fonds CIAT, Partenaire, Prêt d'honneur | `Subvention État/Ministère` |
| `montant_fcfa` | `BIGINT` | > 0 | Montant en Francs CFA | `2500000` |
| `date_octroi` | `DATE` | NOT NULL | Date de notification | `2024-05-10` |
| `statut_versement` | `VARCHAR(30)` | CHECK list | `Engagé`, `Versé partiellement`, `Totalement décaissé` | `Totalement décaissé` |

---

## 7. Règles de Calcul des Métriques Décisionnelles (KPIs)
1. **Taux de Sélection ($T_{sel}$)** : $\frac{\text{Projets Sélectionnés}}{\text{Idées Reçues}} \times 100$
2. **Taux de Prototypage ($T_{proto}$)** : $\frac{\text{Projets avec Prototype Fonctionnel}}{\text{Projets Retenus}} \times 100$
3. **Taux de Parité Genre ($P_F$)** : $\frac{\text{Porteuses de Genre Féminin}}{\text{Total Porteurs}} \times 100$
4. **Taux de Projets en Retard ($T_{retard}$)** : $\frac{\text{Projets avec statut Retard modéré ou critique}}{\text{Projets Actifs en Incubation}} \times 100$
5. **Financement Moyen par Projet ($F_{moy}$)** : $\frac{\sum \text{Montant Financement}}{\text{Nombre de Projets Financés}}$
