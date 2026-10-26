// =============================================================================
// APPLICATION PRINCIPALE : TABLEAU DE BORD DÉCISIONNEL DU CIAT
// Institut Supérieur d'Enseignement Professionnel (ISEP) Amadou Trawaré Diamniadio
// Architecture Modulaire, State Réactif, Persistance LocalStorage & UX Fluide
// =============================================================================

const App = {
  projects: [],
  currentFilteredData: [],
  currentPage: 1,
  pageSize: 8,
  currentSort: { field: 'id_projet', order: 'asc' },
  currentRole: 'Directeur ISEP / CIAT',
  activeSection: 'dashboard',

  // 1. Initialisation
  init() {
    this.loadData();
    this.populateFilterDropdowns();
    this.bindEvents();
    this.applyFilters();
    CIAT_AI_ASSISTANT.init();
    this.showToast("Bienvenue sur le Tableau de Bord Décisionnel du CIAT !");
  },

  // 2. Chargement des données (LocalStorage + Fallback Dataset)
  loadData() {
    const saved = localStorage.getItem('CIAT_PROJECTS_DATA');
    if (saved) {
      try {
        this.projects = JSON.parse(saved);
      } catch (e) {
        this.projects = [...CIAT_DATA.projets];
      }
    } else {
      this.projects = [...CIAT_DATA.projets];
      this.persistData();
    }
    this.currentFilteredData = [...this.projects];
  },

  persistData() {
    localStorage.setItem('CIAT_PROJECTS_DATA', JSON.stringify(this.projects));
  },

  // 3. Remplissage des listes déroulantes de filtres
  populateFilterDropdowns() {
    const cohorteSelect = document.getElementById('filter-cohorte');
    const domaineSelect = document.getElementById('filter-domaine');
    const modalDomaine = document.getElementById('modal-domaine');
    const modalCohorte = document.getElementById('modal-cohorte');

    if (cohorteSelect) {
      CIAT_DATA.cohortes.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = `${c.nom} (${c.annee})`;
        cohorteSelect.appendChild(opt);
        if (modalCohorte) modalCohorte.appendChild(opt.cloneNode(true));
      });
    }

    if (domaineSelect) {
      CIAT_DATA.domaines.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = d.libelle;
        domaineSelect.appendChild(opt);
        if (modalDomaine) modalDomaine.appendChild(opt.cloneNode(true));
      });
    }
  },

  // 4. Écouteurs d'événements
  bindEvents() {
    // Filtres
    document.getElementById('filter-cohorte')?.addEventListener('change', () => this.applyFilters());
    document.getElementById('filter-domaine')?.addEventListener('change', () => this.applyFilters());
    document.getElementById('filter-statut')?.addEventListener('change', () => this.applyFilters());
    document.getElementById('filter-genre')?.addEventListener('change', () => this.applyFilters());
    document.getElementById('filter-search')?.addEventListener('input', () => this.applyFilters());
    document.getElementById('btn-reset-filters')?.addEventListener('click', () => this.resetFilters());

    // Navigation de la barre latérale (onglets internes)
    document.querySelectorAll('.nav-item[data-target]').forEach(item => {
      item.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-item[data-target]').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const target = item.dataset.target;
        this.navigateSection(target);
      });
    });

    // Rôle switcher
    document.getElementById('role-select')?.addEventListener('change', (e) => {
      this.currentRole = e.target.value;
      this.showToast(`Mode activé : ${this.currentRole}`);
    });

    // Thème toggle
    document.getElementById('btn-theme-toggle')?.addEventListener('click', () => {
      document.body.classList.toggle('theme-light');
      const isLight = document.body.classList.contains('theme-light');
      this.showToast(`Thème : ${isLight ? 'Clair Institutionnel' : 'Sombre Décisionnel'}`);
    });

    // Responsive Sidebar Toggle
    document.getElementById('btn-sidebar-toggle')?.addEventListener('click', () => {
      document.querySelector('.sidebar')?.classList.toggle('mobile-open');
    });

    // Modal Nouveau Projet
    document.getElementById('btn-new-project')?.addEventListener('click', () => this.openNewProjectModal());
    document.getElementById('btn-close-modal')?.addEventListener('click', () => this.closeModal());
    document.getElementById('form-new-project')?.addEventListener('submit', (e) => this.handleSaveProject(e));
  },

  // 5. Filtrage Dynamique & Calcul en temps réel
  applyFilters() {
    const cohorteVal = document.getElementById('filter-cohorte')?.value || '';
    const domaineVal = document.getElementById('filter-domaine')?.value || '';
    const statutVal = document.getElementById('filter-statut')?.value || '';
    const genreVal = document.getElementById('filter-genre')?.value || '';
    const searchVal = document.getElementById('filter-search')?.value.toLowerCase().trim() || '';

    this.currentFilteredData = this.projects.filter(p => {
      if (cohorteVal && p.id_cohorte !== cohorteVal) return false;
      if (domaineVal && p.id_domaine !== domaineVal) return false;
      if (genreVal && p.genre !== genreVal) return false;
      
      if (statutVal) {
        if (statutVal === 'En retard') {
          if (!p.statut_retard.includes('Retard')) return false;
        } else if (p.stade_avancement !== statutVal) {
          return false;
        }
      }

      if (searchVal) {
        const haystack = `${p.titre} ${p.code_projet} ${p.porteur} ${p.description || ''} ${p.partenaire_industriel || ''}`.toLowerCase();
        if (!haystack.includes(searchVal)) return false;
      }

      return true;
    });

    this.currentPage = 1;
    this.updateKPICards();
    this.renderCharts();
    this.renderTable();
  },

  resetFilters() {
    if (document.getElementById('filter-cohorte')) document.getElementById('filter-cohorte').value = '';
    if (document.getElementById('filter-domaine')) document.getElementById('filter-domaine').value = '';
    if (document.getElementById('filter-statut')) document.getElementById('filter-statut').value = '';
    if (document.getElementById('filter-genre')) document.getElementById('filter-genre').value = '';
    if (document.getElementById('filter-search')) document.getElementById('filter-search').value = '';
    this.applyFilters();
    this.showToast("Filtres réinitialisés.");
  },

  filterByDomain(domainId) {
    const domaineSelect = document.getElementById('filter-domaine');
    if (domaineSelect) {
      domaineSelect.value = domainId;
      this.applyFilters();
      this.showToast(`Filtre activé : ${CIAT_DATA.domaines.find(d => d.id === domainId)?.libelle}`);
    }
  },

  // 6. Mise à jour des cartes KPI
  updateKPICards() {
    const total = this.currentFilteredData.length;
    const protos = this.currentFilteredData.filter(p => p.prototype_fonctionnel).length;
    const retards = this.currentFilteredData.filter(p => p.statut_retard.includes('Retard')).length;
    const femmes = this.currentFilteredData.filter(p => p.genre === 'Féminin').length;
    const budgetTotal = this.currentFilteredData.reduce((acc, p) => acc + (p.financement_fcfa || 0), 0);
    
    // Total Idées estimées (Cohortes sélectionnées)
    const ideesRecues = total * 4; // Ratio de candidature
    const pctParite = total > 0 ? ((femmes / total) * 100).toFixed(1) : 0;
    const pctProto = total > 0 ? ((protos / total) * 100).toFixed(0) : 0;

    const elTotal = document.getElementById('kpi-total-projets');
    const elProto = document.getElementById('kpi-prototypes');
    const elBudget = document.getElementById('kpi-budget-total');
    const elParite = document.getElementById('kpi-parite-genre');
    const elRetard = document.getElementById('kpi-retards-alert');
    const elIdees = document.getElementById('kpi-idees-recues');

    if (elTotal) elTotal.textContent = total;
    if (elProto) elProto.textContent = `${protos} (${pctProto}%)`;
    if (elBudget) elBudget.textContent = `${(budgetTotal / 1000000).toFixed(1)} M`;
    if (elParite) elParite.textContent = `${pctParite}%`;
    if (elRetard) elRetard.textContent = retards;
    if (elIdees) elIdees.textContent = ideesRecues;
  },

  // 7. Rendu des graphiques
  renderCharts() {
    CIAT_CHARTS.renderDomainsBarChart('chart-domains-bar', this.currentFilteredData);
    CIAT_CHARTS.renderGenderDonut('chart-gender-donut', this.currentFilteredData);
    CIAT_CHARTS.renderIncubationFunnel('chart-funnel', this.currentFilteredData);
    CIAT_CHARTS.renderCohortComparison('chart-cohort-comparison', this.currentFilteredData);
  },

  // 8. Rendu du tableau des projets
  renderTable() {
    const tbody = document.getElementById('projects-table-body');
    if (!tbody) return;

    const data = [...this.currentFilteredData];
    const total = data.length;

    // Pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const paginated = data.slice(startIndex, startIndex + this.pageSize);

    if (paginated.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color: var(--text-secondary);">Aucun projet correspondant aux critères de recherche.</td></tr>`;
      this.updatePagination(0);
      return;
    }

    let html = '';
    paginated.forEach(p => {
      const domaine = CIAT_DATA.domaines.find(d => d.id === p.id_domaine);
      const cohorte = CIAT_DATA.cohortes.find(c => c.id === p.id_cohorte);
      
      let badgeClass = 'badge-ontime';
      if (p.statut_retard === 'Retard critique') badgeClass = 'badge-danger';
      else if (p.statut_retard === 'Retard modéré') badgeClass = 'badge-warning';
      else if (p.statut_retard === 'Jalon non validé') badgeClass = 'badge-neutral';

      const genderBadge = p.genre === 'Féminin' 
        ? `<span class="gender-tag gender-f">F</span>` 
        : `<span class="gender-tag gender-m">M</span>`;

      html += `
        <tr>
          <td>
            <strong>${p.code_projet}</strong><br>
            <span style="font-weight: 600; color: #fff;">${p.titre}</span>
          </td>
          <td>
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${domaine?.couleur || '#fff'}; margin-right:6px;"></span>
            ${domaine?.libelle || p.id_domaine}
          </td>
          <td>${cohorte?.annee || p.id_cohorte}</td>
          <td>${p.porteur} ${genderBadge}</td>
          <td>
            <span class="badge-status ${badgeClass}">
              ● ${p.statut_retard} ${p.jours_retard > 0 ? `(+${p.jours_retard}j)` : ''}
            </span>
          </td>
          <td>
            <strong style="color: #d97706;">${(p.financement_fcfa || 0).toLocaleString('fr-FR')} FCFA</strong>
          </td>
          <td style="text-align: right;">
            <button class="chart-btn" onclick="App.openProjectDetails('${p.id_projet}')" title="Voir la fiche détaillée">👁️ Détails</button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
    this.updatePagination(total);
  },

  updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / this.pageSize) || 1;
    const infoElem = document.getElementById('table-info');
    const controlsElem = document.getElementById('table-page-controls');

    if (infoElem) {
      const start = totalItems === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
      const end = Math.min(this.currentPage * this.pageSize, totalItems);
      infoElem.textContent = `Affichage de ${start} à ${end} sur ${totalItems} projets enregistrés`;
    }

    if (controlsElem) {
      let btns = '';
      for (let i = 1; i <= totalPages; i++) {
        btns += `<button class="btn-page ${i === this.currentPage ? 'active' : ''}" onclick="App.goToPage(${i})">${i}</button>`;
      }
      controlsElem.innerHTML = btns;
    }
  },

  goToPage(pageNum) {
    this.currentPage = pageNum;
    this.renderTable();
  },

  // 9. Modales : Ajout & Détails d'un projet
  openNewProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) modal.classList.add('active');
  },

  closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) modal.classList.remove('active');
  },

  handleSaveProject(e) {
    e.preventDefault();
    const titre = document.getElementById('modal-titre').value;
    const porteur = document.getElementById('modal-porteur').value;
    const genre = document.getElementById('modal-genre').value;
    const domaine = document.getElementById('modal-domaine').value;
    const cohorte = document.getElementById('modal-cohorte').value;
    const stade = document.getElementById('modal-stade').value;
    const retard = document.getElementById('modal-retard').value;
    const budget = parseInt(document.getElementById('modal-budget').value) || 0;
    const desc = document.getElementById('modal-desc').value;

    const newPrj = {
      id_projet: `PRJ_CUSTOM_${Date.now()}`,
      code_projet: `CIAT-NEW-${Math.floor(Math.random() * 900 + 100)}`,
      titre: titre,
      description: desc || "Projet enregistré via l'interface décisionnelle CIAT",
      id_domaine: domaine,
      id_cohorte: cohorte,
      porteur: porteur,
      genre: genre,
      stade_avancement: stade,
      statut_retard: retard,
      jours_retard: retard.includes('critique') ? 25 : (retard.includes('modéré') ? 12 : 0),
      note_evaluation: 16.0,
      prototype_fonctionnel: (stade === 'Prototypage' || stade === 'Accélération / Transfert'),
      brevet_protection: false,
      partenaire_industriel: "Partenaire en cours d'affectation",
      financement_fcfa: budget
    };

    this.projects.unshift(newPrj);
    this.persistData();
    this.closeModal();
    this.applyFilters();
    this.showToast(`✓ Projet "${titre}" enregistré avec succès dans la base CIAT !`);
  },

  openProjectDetails(id) {
    const prj = this.projects.find(p => p.id_projet === id);
    if (!prj) return;

    const domaine = CIAT_DATA.domaines.find(d => d.id === prj.id_domaine);
    const cohorte = CIAT_DATA.cohortes.find(c => c.id === prj.id_cohorte);

    alert(`📋 FICHE PROJET CIAT :\n\nCode : ${prj.code_projet}\nTitre : ${prj.titre}\nPorteur : ${prj.porteur} (${prj.genre})\nDomaine : ${domaine?.libelle}\nCohorte : ${cohorte?.nom}\nStatut : ${prj.stade_avancement}\nRetard : ${prj.statut_retard} (${prj.jours_retard} jours)\nFinancement : ${prj.financement_fcfa.toLocaleString('fr-FR')} FCFA\nPrototype Validé : ${prj.prototype_fonctionnel ? 'OUI' : 'NON'}\nPartenaire : ${prj.partenaire_industriel || 'Aucun'}\n\nRésumé : ${prj.description}`);
  },

  // 10. Navigation par onglet
  navigateSection(target) {
    this.activeSection = target;
    if (target === 'retards') {
      document.getElementById('filter-statut').value = 'En retard';
      this.applyFilters();
      this.showToast("Affichage ciblé : Projets en retard sur les jalons");
    } else if (target === 'assistant') {
      const aiInput = document.getElementById('ai-query-input');
      aiInput?.scrollIntoView({ behavior: 'smooth' });
      aiInput?.focus();
    } else if (target === 'exports') {
      CIAT_EXPORT.exportToCSV();
    } else {
      this.resetFilters();
    }
  },

  // Toast Notification
  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>ℹ️</span> <div>${message}</div>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

// Lancement automatique au chargement du DOM
document.addEventListener('DOMContentLoaded', () => App.init());
