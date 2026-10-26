-- =============================================================================
-- BASE DE DONNÉES DÉCISIONNELLE : CENTRE D'INNOVATION, D'APPLICATION ET DE TRANSFERT (CIAT)
-- INSTITUT SUPÉRIEUR D'ENSEIGNEMENT PROFESSIONNEL (ISEP) AMADOU TRAWARÉ DE DIAMNIADIO
-- Schéma Relationnel et Tables Décisionnelles pour le Pilotage de l'Incubateur
-- Dialecte : PostgreSQL / SQLite / MySQL Compatible
-- =============================================================================

DROP TABLE IF EXISTS financements;
DROP TABLE IF EXISTS jalons_projets;
DROP TABLE IF EXISTS evaluations_comite;
DROP TABLE IF EXISTS projets;
DROP TABLE IF EXISTS porteurs;
DROP TABLE IF EXISTS cohortes;
DROP TABLE IF EXISTS domaines_prioritaires;

-- 1. Table des Domaines Prioritaires d'Application du CIAT (Filières ISEP)
CREATE TABLE domaines_prioritaires (
    id_domaine VARCHAR(20) PRIMARY KEY,
    libelle_domaine VARCHAR(120) NOT NULL,
    description TEXT,
    couleur_code VARCHAR(10) DEFAULT '#0d6efd',
    departement_rattache VARCHAR(100) NOT NULL
);

-- 2. Table des Cohortes d'Incubation
CREATE TABLE cohortes (
    id_cohorte VARCHAR(20) PRIMARY KEY,
    nom_cohorte VARCHAR(100) NOT NULL,
    annee_debut INT NOT NULL,
    annee_fin INT NOT NULL,
    statut VARCHAR(30) CHECK(statut IN ('En cours', 'Clôturée', 'En recrutement', 'Préparatoire')),
    nb_candidatures_recues INT DEFAULT 0,
    nb_projets_retenus INT DEFAULT 0,
    budget_alloue_fcfa BIGINT DEFAULT 0
);

-- 3. Table des Porteurs de Projets (Apprenants / Diplômés ISEP)
CREATE TABLE porteurs (
    id_porteur VARCHAR(20) PRIMARY KEY,
    nom VARCHAR(60) NOT NULL,
    prenom VARCHAR(60) NOT NULL,
    genre VARCHAR(10) CHECK(genre IN ('Féminin', 'Masculin')),
    email VARCHAR(100) UNIQUE NOT NULL,
    telephone VARCHAR(30),
    statut_academique VARCHAR(50) CHECK(statut_academique IN ('Apprenant ISEP', 'Diplômé ISEP', 'Porteur Externe', 'Enseignant-Chercheur')),
    filiere_origine VARCHAR(100),
    niveau_etude VARCHAR(30)
);

-- 4. Table Principale des Projets d'Innovation et de Transfert
CREATE TABLE projets (
    id_projet VARCHAR(20) PRIMARY KEY,
    code_projet VARCHAR(30) UNIQUE NOT NULL,
    titre VARCHAR(150) NOT NULL,
    resume_probleme TEXT NOT NULL,
    solution_proposee TEXT NOT NULL,
    id_domaine VARCHAR(20) NOT NULL,
    id_cohorte VARCHAR(20) NOT NULL,
    id_porteur_principal VARCHAR(20) NOT NULL,
    stade_avancement VARCHAR(40) CHECK(stade_avancement IN ('Idée', 'Sélectionné', 'Prototypage', 'Incubation', 'Accélération / Transfert', 'Abandonné')),
    date_soumission DATE NOT NULL,
    date_entree_incubation DATE,
    date_fin_prevue DATE,
    statut_retard VARCHAR(20) CHECK(statut_retard IN ('Dans les délais', 'Retard modéré', 'Retard critique', 'Jalon franchi')),
    jours_retard INT DEFAULT 0,
    note_evaluation_comite DECIMAL(4,2), -- Sur 20
    prototype_fonctionnel BOOLEAN DEFAULT FALSE,
    brevet_ou_protection BOOLEAN DEFAULT FALSE,
    partenaire_industriel VARCHAR(120),
    montant_financement_obtenu_fcfa BIGINT DEFAULT 0,
    FOREIGN KEY (id_domaine) REFERENCES domaines_prioritaires(id_domaine) ON UPDATE CASCADE,
    FOREIGN KEY (id_cohorte) REFERENCES cohortes(id_cohorte) ON UPDATE CASCADE,
    FOREIGN KEY (id_porteur_principal) REFERENCES porteurs(id_porteur) ON UPDATE CASCADE
);

-- 5. Table des Jalons de Suivi du Parcours d'Incubation
CREATE TABLE jalons_projets (
    id_jalon VARCHAR(20) PRIMARY KEY,
    id_projet VARCHAR(20) NOT NULL,
    titre_jalon VARCHAR(100) NOT NULL,
    description TEXT,
    date_echeance DATE NOT NULL,
    date_realisation DATE,
    statut_jalon VARCHAR(30) CHECK(statut_jalon IN ('À venir', 'En cours', 'Validé', 'En retard', 'Non validé')),
    livrable_attendu VARCHAR(150),
    commentaire_mentor TEXT,
    FOREIGN KEY (id_projet) REFERENCES projets(id_projet) ON DELETE CASCADE
);

-- 6. Table des Financements et Subventions Mobilisés
CREATE TABLE financements (
    id_financement VARCHAR(20) PRIMARY KEY,
    id_projet VARCHAR(20) NOT NULL,
    bailleur_partenaire VARCHAR(120) NOT NULL,
    type_financement VARCHAR(50) CHECK(type_financement IN ('Fonds Propre CIAT', 'Subvention État/Ministère', 'Partenaire Industriel', 'Concours Innovation', 'Prêt d Honneur')),
    montant_fcfa BIGINT NOT NULL,
    date_octroi DATE NOT NULL,
    statut_versement VARCHAR(30) CHECK(statut_versement IN ('Engagé', 'Versé partiellement', 'Totalement décaissé')),
    FOREIGN KEY (id_projet) REFERENCES projets(id_projet) ON DELETE CASCADE
);

-- 7. Table des Évaluations par le Comité de Sélection
CREATE TABLE evaluations_comite (
    id_evaluation VARCHAR(20) PRIMARY KEY,
    id_projet VARCHAR(20) NOT NULL,
    date_comite DATE NOT NULL,
    note_faisabilite_technique DECIMAL(4,2), -- /20
    note_impact_economique DECIMAL(4,2),    -- /20
    note_profil_equipe DECIMAL(4,2),        -- /20
    note_globale DECIMAL(4,2),              -- /20
    decision VARCHAR(30) CHECK(decision IN ('Admis en incubation', 'Admis sous réserve', 'Ajourné', 'Refusé')),
    commentaires_comite TEXT,
    FOREIGN KEY (id_projet) REFERENCES projets(id_projet) ON DELETE CASCADE
);

-- 8. Vue Analytique pour Tableau de Bord Décisionnel (Data Mart CIAT)
CREATE VIEW v_kpi_dashboard_ciat AS
SELECT 
    p.id_projet,
    p.code_projet,
    p.titre,
    p.stade_avancement,
    p.statut_retard,
    p.jours_retard,
    p.prototype_fonctionnel,
    p.montant_financement_obtenu_fcfa,
    d.id_domaine,
    d.libelle_domaine,
    c.id_cohorte,
    c.nom_cohorte,
    c.annee_debut AS annee_cohorte,
    po.genre AS genre_porteur,
    po.statut_academique,
    p.partenaire_industriel
FROM projets p
JOIN domaines_prioritaires d ON p.id_domaine = d.id_domaine
JOIN cohortes c ON p.id_cohorte = c.id_cohorte
JOIN porteurs po ON p.id_porteur_principal = po.id_porteur;

-- Index pour optimiser les requêtes analytiques sur les filtres
CREATE INDEX idx_projets_domaine ON projets(id_domaine);
CREATE INDEX idx_projets_cohorte ON projets(id_cohorte);
CREATE INDEX idx_projets_stade ON projets(stade_avancement);
CREATE INDEX idx_projets_retard ON projets(statut_retard);
CREATE INDEX idx_porteurs_genre ON porteurs(genre);
