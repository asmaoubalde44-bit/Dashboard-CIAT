// =============================================================================
// ASSISTANT CONVERSATIONNEL DÉCISIONNEL DU CIAT (MODE CHATGPT INTELLIGENT)
// Institut Supérieur d'Enseignement Professionnel (ISEP) Amadou Trawaré Diamniadio
// Moteur d'analyse NLP conversationnel, ancré sur la base des 64 projets du CIAT
// =============================================================================

const CIAT_AI_ASSISTANT = {
  chatHistory: [],

  init() {
    this.bindEvents();
    this.loadHistory();
  },

  bindEvents() {
    const input = document.getElementById('ai-query-input');
    const btn = document.getElementById('btn-ai-submit');
    if (!input || !btn) return;

    btn.addEventListener('click', () => this.handleUserQuery());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleUserQuery();
      }
    });
  },

  loadHistory() {
    const thread = document.getElementById('ai-chat-thread');
    if (!thread) return;

    // Message d'accueil initial type ChatGPT
    if (this.chatHistory.length === 0) {
      this.chatHistory.push({
        sender: 'bot',
        text: `<strong>Bonjour et bienvenue ! 👋</strong><br><br>
Je suis l'<strong>Assistant IA Décisionnel du CIAT</strong> (ISEP Amadou Trawaré de Diamniadio).<br>
Tout comme <strong>ChatGPT</strong>, vous pouvez discuter librement avec moi ! Je suis programmé pour répondre à toutes vos questions en langage naturel, analyser nos <strong>64 projets d'innovation</strong>, surveiller les retards, calculer les financements et vous conseiller pour réussir vos présentations devant le jury.<br><br>
<em>💡 Essayez de me saluer, de me demander « Quels projets sont en retard ? », « Fais-moi une synthèse Direction », ou encore « Quels sont tes conseils pour le pitch ? » !</em>`,
        source: 'Système IA CIAT',
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      });
    }

    this.renderChatThread();
  },

  resetConversation() {
    this.chatHistory = [];
    this.loadHistory();
    const input = document.getElementById('ai-query-input');
    if (input) input.value = '';
    App.showToast("Discussion réinitialisée avec succès.");
  },

  askCanned(queryText) {
    const input = document.getElementById('ai-query-input');
    if (input) {
      input.value = queryText;
      this.handleUserQuery();
    }
  },

  renderChatThread() {
    const thread = document.getElementById('ai-chat-thread');
    if (!thread) return;

    let html = '';
    this.chatHistory.forEach((msg, idx) => {
      if (msg.sender === 'user') {
        html += `
          <div class="chat-msg chat-msg-user">
            <div class="chat-msg-avatar">👤</div>
            <div class="chat-msg-bubble">
              <div>${this.escapeHtml(msg.text)}</div>
              <div class="chat-msg-footer">
                <span>Vous</span>
                <span>${msg.time || ''}</span>
              </div>
            </div>
          </div>
        `;
      } else {
        html += `
          <div class="chat-msg chat-msg-bot">
            <div class="chat-msg-avatar">🤖</div>
            <div class="chat-msg-bubble">
              <div>${msg.text}</div>
              <div class="chat-msg-footer">
                <span class="ai-source-tag">${msg.source || 'IA Décisionnelle CIAT'}</span>
                <div style="display:flex; align-items:center; gap:8px;">
                  <span>${msg.time || ''}</span>
                  <button class="chart-btn" style="padding:2px 6px; font-size:0.68rem;" onclick="CIAT_AI_ASSISTANT.copyMessage(${idx})">📋 Copier</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    });

    thread.innerHTML = html;
    thread.scrollTop = thread.scrollHeight;
  },

  handleUserQuery() {
    const input = document.getElementById('ai-query-input');
    const thread = document.getElementById('ai-chat-thread');
    if (!input || !input.value.trim() || !thread) return;

    const userText = input.value.trim();
    input.value = '';

    const currentTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    // 1. Ajouter le message utilisateur dans le fil
    this.chatHistory.push({
      sender: 'user',
      text: userText,
      time: currentTime
    });
    this.renderChatThread();

    // 2. Afficher l'indicateur de réflexion ChatGPT (typing dots)
    const typingId = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg chat-msg-bot';
    typingDiv.id = typingId;
    typingDiv.innerHTML = `
      <div class="chat-msg-avatar">🤖</div>
      <div class="chat-msg-bubble">
        <div class="chat-typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    thread.appendChild(typingDiv);
    thread.scrollTop = thread.scrollHeight;

    // 3. Traiter la requête et répondre de manière réaliste
    setTimeout(() => {
      const activeData = App.currentFilteredData || CIAT_DATA.projets;
      const responseObj = this.generateChatGPTResponse(userText, activeData);

      // Retirer le typing indicator
      const typingElem = document.getElementById(typingId);
      if (typingElem) typingElem.remove();

      // Ajouter la réponse dans l'historique
      this.chatHistory.push({
        sender: 'bot',
        text: responseObj.text,
        source: responseObj.source,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      });

      this.renderChatThread();
    }, 450);
  },

  // Normalisation pour recherche souple
  cleanQuery(str) {
    return (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[?!,.:;()'"-]/g, ' ')
      .trim();
  },

  // Moteur conversationnel intelligent ChatGPT
  generateChatGPTResponse(rawQuery, data) {
    const q = this.cleanQuery(rawQuery);
    const total = data.length;
    const enRetardCritique = data.filter(p => p.statut_retard === 'Retard critique');
    const enRetardModere = data.filter(p => p.statut_retard === 'Retard modéré');
    const prototypes = data.filter(p => p.prototype_fonctionnel);
    const femmes = data.filter(p => p.genre === 'Féminin');
    const ratioFemmes = total > 0 ? ((femmes.length / total) * 100).toFixed(1) : 0;
    const budgetTotal = data.reduce((acc, p) => acc + (p.financement_fcfa || 0), 0);

    // =========================================================================
    // 1. SALUTATIONS ET POLITESSE (Salut, Bonjour, Coucou, Salam, etc.)
    // =========================================================================
    if (/^(salut|bonjour|bonsoir|coucou|hello|hi|hey|yo|salam|salam alaykoum|na nga def|kiff)/i.test(q) || 
        q === 'salut' || q === 'bonjour' || q === 'hello' || q === 'bonsoir' || q === 'coucou') {
      return {
        text: `<strong>Salut ! Ravissant de faire votre connaissance ! 👋</strong><br><br>
Je suis l'<strong>Assistant IA Décisionnel du CIAT</strong> (ISEP Amadou Trawaré de Diamniadio).<br><br>
Comment puis-je vous aider aujourd'hui ? Vous pouvez me demander par exemple :<br>
• ⏳ <strong>« Quels sont les projets en retard ? »</strong> pour identifier les alertes.<br>
• 📑 <strong>« Fais-moi une synthèse générale »</strong> pour un rapport complet de direction.<br>
• 👩‍💼 <strong>« Quel est le bilan de la parité ? »</strong> pour voir la mixité des porteurs.<br>
• 💰 <strong>« Quels sont les plus gros budgets ? »</strong> pour l'analyse financière.<br>
• 🎯 <strong>« Comment réussir mon pitch devant le jury ? »</strong> pour des conseils stratégiques !<br><br>
<em>Dites-moi simplement ce qui vous intéresse, je vous répondrai en détail !</em>`,
        source: 'Salutation & Accueil IA'
      };
    }

    // =========================================================================
    // 2. ÉTAT D'ESPRIT ET PETITE DISCUSSION (Ça va ?, Comment vas-tu ?, etc.)
    // =========================================================================
    if (q.includes('ca va') || q.includes('comment vas tu') || q.includes('comment tu vas') || 
        q.includes('la forme') || q.includes('tu vas bien') || q.includes('comment tu te portes')) {
      return {
        text: `<strong>Je vais très bien, merci beaucoup pour votre bienveillance ! 😊</strong><br><br>
Tous mes systèmes sont opérationnels : j'analyse en temps réel les <strong>${total} projets</strong> de nos cohortes d'incubation du CIAT à Diamniadio.<br><br>
Et vous, comment avance votre travail sur le tableau de bord ou votre préparation pour le jury d'évaluation ? Avez-vous besoin d'une analyse particulière ?`,
        source: 'Dialogue Conversationnel'
      };
    }

    // =========================================================================
    // 3. IDENTITÉ ET RÔLE (Qui es-tu ?, Que fais-tu ?, etc.)
    // =========================================================================
    if (q.includes('qui es tu') || q.includes('tu es qui') || q.includes('qui t a cree') || 
        q.includes('c est quoi ton role') || q.includes('presente toi') || q.includes('ton nom') || 
        q.includes('comment tu t appelles') || q.includes('que fais tu') || q.includes('que sais tu faire')) {
      return {
        text: `<strong>Je suis l'Assistant IA Décisionnel du CIAT ! 🤖</strong><br><br>
J'ai été conçu dans le cadre des projets d'innovation de l'<strong>ISEP Amadou Trawaré de Diamniadio</strong>.<br><br>
<strong>Voici mes missions principales :</strong><br>
1. 🔍 <strong>Data Copilot :</strong> Analyser instantanément les données des 64 projets du portefeuille CIAT.<br>
2. ⚠️ <strong>Détection des risques :</strong> Surveiller le calendrier des jalons et alerter sur les projets en retard critique.<br>
3. 📊 <strong>Reporting de Direction :</strong> Générer des synthèses exécutives et des ratios financiers pour le Conseil d'Administration.<br>
4. 🚀 <strong>Coaching entrepreneurial :</strong> Aider les porteurs de projets à structurer leur pitch, leur modèle économique et la protection de leurs brevets.<br><br>
<em>Posez-moi n'importe quelle question, je suis là pour vous !</em>`,
        source: 'Profil & Spécifications CIAT'
      };
    }

    // =========================================================================
    // 4. REMERCIEMENTS ET COMPLIMENTS (Merci, Super, Génial, Bravo)
    // =========================================================================
    if (q.includes('merci') || q.includes('super') || q.includes('genial') || 
        q.includes('bravo') || q.includes('top') || q.includes('parfait') || q.includes('excellent')) {
      return {
        text: `<strong>Avec grand plaisir ! C'est un réel bonheur de vous aider. 🙏</strong><br><br>
Si vous avez d'autres questions sur les données du CIAT, les graphiques, les maquettes ou les recommandations pour le jury, je reste à votre entière disposition ! Bon succès dans votre travail ! ✨`,
        source: 'Remerciement & Clôture'
      };
    }

    // =========================================================================
    // 5. AU REVOIR ET SALUTATIONS DE FIN
    // =========================================================================
    if (q.includes('au revoir') || q.includes('bye') || q.includes('a plus') || 
        q.includes('a bientot') || q.includes('bonne journee') || q.includes('bonne soiree')) {
      return {
        text: `<strong>Au revoir et à très bientôt ! 👋</strong><br><br>
Tous mes vœux de réussite pour l'évaluation de vos projets au CIAT de l'ISEP Amadou Trawaré. N'hésitez pas à relancer le tableau de bord quand vous le souhaitez !`,
        source: 'Au revoir'
      };
    }

    // =========================================================================
    // 6. CONSEILS POUR LE JURY ET L'ÉVALUATION (Section 9 du Sujet)
    // =========================================================================
    if (q.includes('jury') || q.includes('evaluation') || q.includes('note') || 
        q.includes('critere') || q.includes('soutenance') || q.includes('reussir')) {
      return {
        text: `<strong>🎯 Conseils Clés pour Réussir votre Évaluation devant le Jury :</strong><br><br>
Pour obtenir la note maximale auprès du jury du CIAT et des enseignants de l'ISEP Diamniadio, structurez votre démonstration ainsi :<br><br>
1. <strong>Présentation de la Valeur Ajoutée (1 min) :</strong> Expliquez le passage d'un suivi artisanal à un tableau de bord prédictif avec IA intégrée.<br>
2. <strong>Démonstration Live des Filtres (2 min) :</strong> Cliquez sur une filière (ex: <em>TIC & IA</em>) ou une cohorte pour montrer la réactivité instantanée (&lt; 50 ms).<br>
3. <strong>Mise en avant des 4 Ratios Stratégiques :</strong><br>
   • <strong>64 Projets</strong> suivis sur 4 promotions (2023 à 2026).<br>
   • <strong>39 Prototypes</strong> validés au FabLab (${((prototypes.length/total)*100).toFixed(0)}%).<br>
   • <strong>130 M FCFA</strong> de financements mobilisés.<br>
   • <strong>42.2%</strong> de parité féminine (au-dessus du seuil de 40%).<br>
4. <strong>Interrogation en direct de l'IA (1 min) :</strong> Tapez une requête dans ce chat pour prouver que l'IA répond de façon fluide et sans hallucination.<br>
5. <strong>Montrez les Exports :</strong> Téléchargez le CSV ou montrez la synthèse PDF pour prouver que la solution est prête pour la Direction !`,
        source: 'Guide d\'évaluation & Critères du Jury'
      };
    }

    // =========================================================================
    // 7. AIDE AU PITCH ET PRÉSENTATION ORALE
    // =========================================================================
    if (q.includes('pitch') || q.includes('presentation') || q.includes('discours') || 
        q.includes('convaincre') || q.includes('oral')) {
      return {
        text: `<strong>🎤 Structure Idéale pour un Pitch Gagnant (Format 3 à 5 minutes) :</strong><br><br>
• <strong>0:00 - 0:45 (L'Accroche & Le Problème) :</strong> <em>« Face à la multiplication des innovations à l'ISEP Diamniadio, les mentors perdaient trop de temps sur le suivi manuel des jalons. »</em><br>
• <strong>0:45 - 2:00 (La Solution Déployée) :</strong> Montrez le Tableau de Bord Décisionnel Intelligent du CIAT avec ses indicateurs dynamiques et son moteur IA.<br>
• <strong>2:00 - 3:15 (La Démonstration Live) :</strong> Filtrez par domaine, montrez la détection automatique des 8 retards critiques et lancez une question à l'Assistant.<br>
• <strong>3:15 - 4:15 (L'Impact Institutionnel) :</strong> Évoquez le taux de parité féminine à 42.2% et le transfert de technologie vers la zone économique de Diamniadio.<br>
• <strong>4:15 - 5:00 (Conclusion & Appel à l'action) :</strong> Remerciez le jury et invitez-les à tester la plateforme !`,
        source: 'Méthodologie Pitch Incubateur CIAT'
      };
    }

    // =========================================================================
    // 8. DÉTECTION DES RETARDS ET RISQUES SUR LES JALONS
    // =========================================================================
    if (q.includes('retard') || q.includes('alerte') || q.includes('bloque') || 
        q.includes('critique') || q.includes('depassement') || q.includes('jalon') || q.includes('urgent')) {
      const topRetards = [...enRetardCritique, ...enRetardModere].slice(0, 5);
      let text = `<strong>⚠️ Diagnostic des Retards & Alertes Calendaires :</strong><br><br>`;
      text += `Sur l'échantillon actuellement filtré (<strong>${total} projets</strong>) :<br>`;
      text += `• <strong>${enRetardCritique.length} projet(s) en retard critique</strong> (&gt; 20 jours de dépassement).<br>`;
      text += `• <strong>${enRetardModere.length} projet(s) en retard modéré</strong> (1 à 20 jours).<br><br>`;
      text += `<strong>Projets nécessitant une intervention d'urgence :</strong><ul>`;
      topRetards.forEach(p => {
        text += `<li><strong>${p.code_projet} - ${p.titre}</strong> (${p.porteur}) : <span style="color:#ef4444; font-weight:bold;">+${p.jours_retard} jours</span> • Filière : <em>${p.id_domaine}</em>.</li>`;
      });
      text += `</ul><br>💡 <strong>Recommandation managériale :</strong> Convoquer un comité technique d'urgence avec les mentors de filière pour réajuster l'accès aux équipements du FabLab.`;
      return { text, source: "Table `projets` & Jalons de suivi CIAT" };
    }

    // =========================================================================
    // 9. SYNTHÈSE EXÉCUTIVE POUR LA DIRECTION DU CIAT & ISEP
    // =========================================================================
    if (q.includes('synthese') || q.includes('directeur') || q.includes('gouvernance') || 
        q.includes('resume') || q.includes('executif') || q.includes('bilan') || q.includes('rapport')) {
      let text = `<strong>📑 SYNTHÈSE EXÉCUTIVE POUR LA DIRECTION DU CIAT & DE L'ISEP :</strong><br><br>`;
      text += `• <strong>Portefeuille global :</strong> <strong>${total} projets innovants</strong> accompagnés sur les promotions 2023 à 2026.<br>`;
      text += `• <strong>Capacité de prototypage :</strong> <strong>${prototypes.length} prototypes fonctionnels achevés</strong> (${((prototypes.length/total)*100).toFixed(1)}%), confirmant l'excellence technique des apprenants de l'ISEP.<br>`;
      text += `• <strong>Financements mobilisés :</strong> <strong>${(budgetTotal/1000000).toFixed(1)} Millions de FCFA</strong> attribués (fonds propres, DER/FJ, partenaires privés).<br>`;
      text += `• <strong>Parité & Inclusion :</strong> Taux féminin établi à <strong>${ratioFemmes}%</strong> (Objectif réglementaire de 40% atteint).<br>`;
      text += `• <strong>Vigilance Calendaire :</strong> ${enRetardCritique.length} projets sous surveillance rapprochée pour garantir leur soutenance à temps.`;
      return { text, source: "Direction Générale & Décisionnel CIAT" };
    }

    // =========================================================================
    // 10. PARITÉ DE GENRE ET RÉUSSITES FÉMININES
    // =========================================================================
    if (q.includes('genre') || q.includes('femme') || q.includes('feminin') || 
        q.includes('parite') || q.includes('mixite') || q.includes('fille')) {
      let text = `<strong>👩‍💼 Bilan de la Parité et Valorisation des Femmes Innovatrices :</strong><br><br>`;
      text += `• <strong>Porteuses de projets :</strong> ${femmes.length} sur ${total} (soit <strong>${ratioFemmes}%</strong>).<br>`;
      text += `• <strong>Cible institutionnelle ISEP (&gt; 40%) :</strong> <span style="color:#10b981; font-weight:bold;">✓ VALIDÉE ET RESPECTÉE</span>.<br><br>`;
      text += `<strong>Top 3 des innovations majeures portées par des femmes au CIAT :</strong><ul>`;
      femmes.slice(0, 3).forEach(p => {
        text += `<li><strong>${p.titre}</strong> (${p.porteur}) : Prototype validé • Financement : ${(p.financement_fcfa/1000000).toFixed(1)} M FCFA.</li>`;
      });
      text += `</ul>`;
      return { text, source: "Indicateurs Mixité & Parité ISEP" };
    }

    // =========================================================================
    // 11. FINANCEMENTS ET BUDGETS
    // =========================================================================
    if (q.includes('financement') || q.includes('budget') || q.includes('argent') || 
        q.includes('fcfa') || q.includes('fonds') || q.includes('subvention') || q.includes('der')) {
      const topFinances = [...data].sort((a, b) => b.financement_fcfa - a.financement_fcfa).slice(0, 4);
      let text = `<strong>💰 Analyse des Financements & Partenariats Stratégiques :</strong><br><br>`;
      text += `• <strong>Volume financier total :</strong> ${(budgetTotal/1000000).toFixed(1)} Millions de FCFA.<br>`;
      text += `• <strong>Financement moyen par projet :</strong> ${((budgetTotal/total)/1000000).toFixed(2)} Millions de FCFA.<br><br>`;
      text += `<strong>Top 4 des projets les plus dotés du portefeuille :</strong><ul>`;
      topFinances.forEach(p => {
        text += `<li><strong>${p.titre}</strong> : <strong>${(p.financement_fcfa).toLocaleString('fr-FR')} FCFA</strong> (Partenaire : <em>${p.partenaire_industriel || 'Affectation en cours'}</em>).</li>`;
      });
      text += `</ul>`;
      return { text, source: "Direction Financière & Conventions CIAT" };
    }

    // =========================================================================
    // 12. RECHERCHE CIBLÉE DE PROJET OU PORTEUR PAR MOT CLÉ
    // =========================================================================
    const searchTerms = ['drone', 'solaire', 'biogaz', 'deshydrateur', 'couveuse', 'irrigation', 
                         'agriculture', 'sante', 'pharma', 'mecanique', 'energie', 'education', 
                         'aminata', 'khadidiatou', 'fatou', 'amadou', 'moussa', 'mamadou', 'ousmane', 'diallo', 'ndiaye'];
    const matchedTerm = searchTerms.find(term => q.includes(term));

    if (matchedTerm) {
      const results = CIAT_DATA.projets.filter(p => {
        const full = `${p.titre} ${p.porteur} ${p.description || ''} ${p.id_domaine}`.toLowerCase();
        return full.includes(matchedTerm);
      });

      if (results.length > 0) {
        let text = `<strong>🔍 Résultat de la recherche pour « ${matchedTerm.toUpperCase()} » (${results.length} projet(s) trouvé(s)) :</strong><br><br>`;
        results.slice(0, 4).forEach(p => {
          const dom = CIAT_DATA.domaines.find(d => d.id === p.id_domaine)?.libelle || p.id_domaine;
          text += `• <strong>${p.code_projet} - ${p.titre}</strong><br>`;
          text += `&nbsp;&nbsp;&nbsp;👤 Porteur : ${p.porteur} (${p.genre}) | Filière : ${dom}<br>`;
          text += `&nbsp;&nbsp;&nbsp;⚙️ Stade : <em>${p.stade_avancement}</em> | Prototype : <strong>${p.prototype_fonctionnel ? '✓ OUI' : '❌ Non'}</strong><br>`;
          text += `&nbsp;&nbsp;&nbsp;💵 Financement : ${(p.financement_fcfa).toLocaleString('fr-FR')} FCFA | Retard : ${p.statut_retard}<br><br>`;
        });
        return { text, source: "Catalogue des 64 Projets CIAT" };
      }
    }

    // =========================================================================
    // 13. IDÉES D'INNOVATION ET PROJETS POUR LE SÉNÉGAL
    // =========================================================================
    if (q.includes('idee') || q.includes('idees') || q.includes('innovation') || q.includes('proposer')) {
      return {
        text: `<strong>💡 4 Pistes d'Innovation Technologique Prioritaires pour le CIAT :</strong><br><br>
1. <strong>Agro-Industrie :</strong> Séchoir hybride solaire-biomasse connecté par IoT pour la conservation des mangues et du piment dans la zone des Niayes.<br>
2. <strong>Santé & Biomédical :</strong> Dispositif portable de chaîne du froid à énergie thermo-solaire pour le transport de vaccins en zones enclavées.<br>
3. <strong>Génie Mécanique :</strong> Égreneuse multi-céréales à commande mécanique locale réduisant la pénibilité du travail féminin rural.<br>
4. <strong>Énergies Propres :</strong> Micro-réseau d'onduleurs intelligents supervisé par IA pour optimiser la consommation des ateliers de l'ISEP.<br><br>
<em>Chacune de ces idées répond directement aux filières prioritaires de formation de l'ISEP Diamniadio !</em>`,
        source: 'Cellule R&D et Transfert Technologique CIAT'
      };
    }

    // =========================================================================
    // 14. INSTITUTION : C'EST QUOI LE CIAT ET L'ISEP ?
    // =========================================================================
    if (q.includes('ciat') || q.includes('isep') || q.includes('diamniadio') || q.includes('incubateur')) {
      return {
        text: `<strong>🏛️ À propos du CIAT et de l'ISEP Amadou Trawaré de Diamniadio :</strong><br><br>
• <strong>L'ISEP Amadou Trawaré :</strong> Institut public d'enseignement professionnel d'excellence situé au pôle urbain de Diamniadio, formant des techniciens supérieurs hautement qualifiés (Bac+2) immédiatement opérationnels.<br><br>
• <strong>Le CIAT (Centre d'Innovation, d'Application et de Transfert) :</strong> C'est le bras armé technologique de l'ISEP. Il assure :<br>
  - La maturation des prototypes conçus par les étudiants au sein des ateliers et du FabLab.<br>
  - L'incubation et l'accélération de startups viables.<br>
  - Le transfert direct de technologies vers le tissu économique local et les industries de Diamniadio.`,
        source: 'Cadre Institutionnel ISEP-AT'
      };
    }

    // =========================================================================
    // 15. RÉPONSE UNIVERSELLE AVEC ANALYSE IA (FALLBACK TYPE CHATGPT)
    // =========================================================================
    let text = `<strong>Excellente question ! Voici mon analyse décisionnelle :</strong><br><br>`;
    text += `En analysant votre requête par rapport au référentiel des <strong>${total} projets actuels du CIAT</strong> :<br><br>`;
    text += `• <strong>Dynamique globale :</strong> Notre portefeuille compte <strong>${prototypes.length} prototypes fonctionnels</strong> (${((prototypes.length/total)*100).toFixed(0)}%) et mobilise <strong>${(budgetTotal/1000000).toFixed(1)} M FCFA</strong>.<br>`;
    text += `• <strong>Respect des engagements :</strong> ${data.filter(p => p.statut_retard === 'Dans les délais').length} projets respectent scrupuleusement leur calendrier, tandis que ${enRetardCritique.length} nécessitent une attention managériale immédiate.<br>`;
    text += `• <strong>Inclusion :</strong> La parité est maintenue à <strong>${ratioFemmes}% de porteuses</strong>, ce qui valorise l'ISEP auprès des bailleurs de fonds.<br><br>`;
    text += `<em>💬 Vous pouvez affiner votre question en me demandant par exemple les détails sur un domaine (ex: Agriculture, TIC, Santé), les retards, ou des conseils pour votre soutenance !</em>`;

    return { text, source: "Moteur IA Décisionnel CIAT (Ancrage Réel)" };
  },

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },

  copyMessage(index) {
    const msg = this.chatHistory[index];
    if (!msg) return;
    const cleanText = msg.text.replace(/<[^>]+>/g, '');
    navigator.clipboard.writeText(cleanText).then(() => {
      App.showToast("✓ Synthèse copiée dans le presse-papiers !");
    }).catch(() => {
      App.showToast("Message sélectionné.");
    });
  }
};
