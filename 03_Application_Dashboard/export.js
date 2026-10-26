// =============================================================================
// MODULE D'EXPORTATION MULTI-FORMATS DU CIAT (EXCEL/CSV, PDF & IMAGES)
// Dashboard Décisionnel - ISEP Amadou Trawaré Diamniadio
// =============================================================================

const CIAT_EXPORT = {
  // 1. Export CSV / Excel compatible
  exportToCSV() {
    const data = App.currentFilteredData || CIAT_DATA.projets;
    if (!data || data.length === 0) {
      App.showToast("⚠️ Aucun projet à exporter avec les filtres actuels.");
      return;
    }

    const headers = [
      "Code Projet", "Titre", "Domaine", "Cohorte", "Porteur",
      "Genre", "Stade d'Avancement", "Statut Retard", "Jours de Retard",
      "Note Jury /20", "Prototype Validé", "Brevet Déposé",
      "Partenaire Industriel", "Financement (FCFA)"
    ];

    const rows = data.map(p => {
      const domaineName = CIAT_DATA.domaines.find(d => d.id === p.id_domaine)?.libelle || p.id_domaine;
      const cohorteName = CIAT_DATA.cohortes.find(c => c.id === p.id_cohorte)?.nom || p.id_cohorte;
      return [
        `"${p.code_projet}"`,
        `"${p.titre.replace(/"/g, '""')}"`,
        `"${domaineName}"`,
        `"${cohorteName}"`,
        `"${p.porteur}"`,
        `"${p.genre}"`,
        `"${p.stade_avancement}"`,
        `"${p.statut_retard}"`,
        p.jours_retard,
        p.note_evaluation,
        p.prototype_fonctionnel ? "OUI" : "NON",
        p.brevet_protection ? "OUI" : "NON",
        `"${(p.partenaire_industriel || '').replace(/"/g, '""')}"`,
        p.financement_fcfa
      ].join(";");
    });

    const csvContent = "\uFEFF" + [headers.join(";"), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `CIAT_Dashboard_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    App.showToast("✓ Export CSV téléchargé avec succès !");
  },

  // 2. Export / Impression PDF du rapport exécutif
  exportToPDF() {
    App.showToast("📄 Préparation du rapport d'impression PDF...");
    setTimeout(() => {
      window.print();
    }, 300);
  },

  // 3. Copier la synthèse IA dans le presse-papier
  copyAIReport() {
    const content = document.getElementById('ai-response-content');
    if (!content || !content.innerText.trim()) {
      App.showToast("⚠️ Aucune analyse IA active à copier.");
      return;
    }

    navigator.clipboard.writeText(content.innerText).then(() => {
      App.showToast("✓ Analyse décisionnelle copiée dans le presse-papier !");
    }).catch(() => {
      App.showToast("✓ Texte prêt à être partagé.");
    });
  }
};
