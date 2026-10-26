# CHARTE GRAPHIQUE ET GUIDE DE STYLE UI/UX
**Tableau de Bord Décisionnel du CIAT - ISEP Amadou Trawaré de Diamniadio**
**Volet Infographe & Expérience Utilisateur**

---

## 1. Vision et Identité de Marque
L’identité visuelle du CIAT concilie l'héritage institutionnel et académique de l'**ISEP Amadou Trawaré** (noblesse, rigueur, ancrage national) avec la modernité technologique d'un **incubateur d'innovations de pointe** (agilité, vision prospective, intelligence artificielle).

---

## 2. Palette Chromatique Officielle

### 2.1 Couleurs Institutionnelles & Principales
| Usage | Nom de la Teinte | Code HEX | R-G-B | HSL | Évocation symbolique |
|---|---|---|---|---|---|
| **Couleur Primaire** | *Bordeaux ISEP Imperial* | `#801b2a` | `rgb(128, 27, 42)` | `hsl(351, 65%, 30%)` | Rigueur académique, identité historique ISEP |
| **Couleur Secondaire** | *Or Solaire Diamniadio* | `#d97706` | `rgb(217, 119, 6)` | `hsl(32, 95%, 44%)` | Émergence, rayonnement de l'innovation, valeur créée |
| **Accent Technologique** | *Bleu Digital CIAT* | `#0284c7` | `rgb(2, 132, 199)` | `hsl(200, 98%, 39%)` | Données, souveraineté numérique, clarté décisionnelle |
| **Arrière-plan Sombre** | *Nuit Diamniadio (Dark)* | `#0f172a` | `rgb(15, 23, 42)` | `hsl(222, 47%, 11%)` | Élégance, repos visuel pour longues sessions BI |
| **Arrière-plan Clair** | *Blanc Albâtre (Light)* | `#f8fafc` | `rgb(248, 250, 252)`| `hsl(210, 40%, 98%)` | Pureté, contraste et lisibilité administrative |

### 2.2 Couleurs Fonctionnelles (Badges & Indicateurs de Retard)
- **Succès / Dans les délais :** `#16a34a` (Vert émeraude)
- **Attention / Retard modéré :** `#f59e0b` (Ambre soutenu)
- **Alerte critique / Retard majeur :** `#dc2626` (Rouge cramoisi)
- **Statut neutre / En attente :** `#64748b` (Gris ardoise)
- **Innovation / Brevet :** `#9333ea` (Pourpre royal)

---

## 3. Typographie

### 3.1 Polices Sélectionnées
- **Titres, KPI & Accents visuels :** `Plus Jakarta Sans` / `Outfit` (sans-serif géométrique moderne, haute lisibilité à forte graisse).
- **Corps de texte, Tableaux & Données :** `Inter` (neutralité typographique, excellente distinction des chiffres et symboles monétaires).
- **Code & Métriques brutes :** `JetBrains Mono` / `SFMono-Regular` (pour les références techniques des projets).

### 3.2 Hiérarchie Typographique
- **H1 (Titre d'application) :** 28px - 32px / Bold 800
- **H2 (Titres de sections / Modules) :** 20px - 24px / SemiBold 700
- **H3 (Titres de cartes / Graphiques) :** 15px - 17px / SemiBold 600
- **Valeurs des KPI :** 32px - 38px / ExtraBold 800
- **Corps de texte (Body) :** 14px / Regular 400 (interligne 1.5)
- **Labels, Badges & Métadonnées :** 11px - 12px / Medium 500 & Bold 700

---

## 4. Composants UI et Design System

### 4.1 Cartes d'Indicateurs Clés (KPI Cards)
- **Fond :** Effet glassmorphism subtil avec léger dégradé linéaire, bordure semi-transparente `1px solid rgba(255,255,255,0.08)`.
- **Micro-animation au survol :** Translation vers le haut (`transform: translateY(-4px)`), accentuation de l'ombre portée (`box-shadow: 0 12px 24px -8px rgba(0,0,0,0.2)`).
- **Icône dédiée :** Pastille colorée avec SVG vectoriel contrasté.

### 4.2 Boutons & Éléments Interactifs
- **Bouton Principal :** Dégradé bordeaux vers bordeaux profond, texte blanc, bordure or subtile.
- **Bouton IA Générative :** Dégradé bleu cyan / violet avec lueur douce (*glow effect*), symbolisant l'intelligence artificielle.
- **Boutons d'export (PDF, Excel, Image) :** Style contour épuré avec icône spécifique et confirmation visuelle toast.

---

## 5. Ergonomie Multi-Supports (Responsive)
- **Écrans Desktop (>= 1200px) :** Sidebar de navigation permanente, grille de 4 cartes KPI en tête, disposition 2 colonnes pour les graphiques interactifs, table de données complète avec 8 colonnes visibles.
- **Tablettes (768px à 1199px) :** Grille KPI en 2x2, graphiques empilés dynamiquement, barre latérale compacte avec icônes.
- **Smartphones (< 768px) :** Navigation mobile ergonomique avec bouton hamburger tactile, cartes KPI défilables horizontalement, tableau avec défilement fluide, tiroir de filtres repliable.

---

## 6. Accessibilité (Conformité WCAG 2.1 AA)
- Ratios de contraste testés et supérieurs à **4.5:1** pour les textes normaux et **7:1** pour les valeurs de données.
- Couleurs jamais utilisées comme unique vecteur d'information : chaque badge associe une teinte, une icône et un libellé textuel explicite.
