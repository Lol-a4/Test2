// *****************************************************
// --- 1. DONNÉES DE L'APPLICATION (Le 'STATE') ---
// *****************************************************

// Tableau des événements. Chaque {} est un objet événement.
let events = [
    { 
        id: 1, // ID UNIQUE (clé pour la logique)
        title: 'Nuit de l\'IA', 
        start: '2025-11-25T18:00:00', // Date/Heure
        location: 'Amphi Turing', 
        desc: 'Débat sur l\'avenir des LLM avec des experts de DeepMind.', 
        category: 'Conférence', 
        spots: 120, // Places totales
        registered: 80, // Places déjà prises
        img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600',
    },
    { 
        id: 2, 
        title: 'Techno Party', 
        start: '2025-11-28T22:00:00', 
        location: 'Le Bunker', 
        desc: 'La soirée underground du campus. Carte étudiante obligatoire.', 
        category: 'Soirée', 
        spots: 300, 
        registered: 250, 
        img: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600',
    },
    { 
        id: 3, 
        title: 'Atelier Python pour Débutants', 
        start: '2025-12-05T10:00:00', 
        location: 'Labo C', 
        desc: 'Introduction aux bases du langage Python. Venez avec votre ordinateur.', 
        category: 'Workshop', 
        spots: 30, 
        registered: 28, // Presque complet !
        img: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=600',
    }
];

// Tableau des ID des événements auxquels l'utilisateur est inscrit.
let myRegistrations = [1]; 

// ID de l'événement actuellement affiché dans le popup.
let currentEventId = null; 

// *****************************************************
// --- 2. FONCTION POUR AFFICHER LA GRILLE DES CARTES ---
// *****************************************************
function renderEventsGrid() {
    const grid = document.getElementById('events-grid');
    let htmlContent = ''; 

    // 1. Parcours de tous les événements
    events.forEach(e => {
        // Logique : vérifier si l'ID de cet événement (e.id) est dans la liste myRegistrations.
        const isReg = myRegistrations.includes(e.id); 
        const percent = (e.registered / e.spots) * 100; 
        
        // 2. Construction de la carte HTML
        htmlContent += `
        <div class="event-card" onclick="openEventModal(${e.id})"> 
            <div class="event-image">
                <img src="${e.img}" alt="${e.title}">
            </div>
            <div class="event-info">
                ${isReg ? '<span class="registered-tag"><i class="fas fa-check"></i> Inscrit</span>' : ''}
                
                <div class="event-details">${new Date(e.start).toLocaleDateString('fr-FR')} • ${e.location}</div>
                <h3>${e.title}</h3>
                
                <div style="margin-top: 15px;">
                    <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 5px;">
                        ${e.spots - e.registered} places restantes sur ${e.spots}
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percent}%"></div>
                    </div>
                </div>
            </div>
        </div>`;
    });

    // 3. Injection du HTML dans la page
    grid.innerHTML = htmlContent;
}


// *****************************************************
// --- 3. FONCTION POUR OUVRIR LE POPUP (MODALE) ---
// *****************************************************
function openEventModal(id) {
    currentEventId = id;
    // 'find' cherche l'événement correspondant à l'ID
    const evt = events.find(e => e.id === id); 
    if(!evt) return; 

    // Mise à jour du contenu du popup
    document.getElementById('modal-title').innerText = evt.title;
    document.getElementById('modal-category').innerText = evt.category;
    document.getElementById('modal-date-loc').innerText = `${new Date(evt.start).toLocaleString('fr-FR')} • ${evt.location}`;
    document.getElementById('modal-desc').innerText = evt.desc;
    document.getElementById('modal-img').src = evt.img;
    document.getElementById('modal-spots').innerText = evt.spots - evt.registered;

    // Gestion du bouton d'action
    const btn = document.getElementById('modal-action-btn');
    if(myRegistrations.includes(id)) {
        // Si l'utilisateur est inscrit, le bouton est ROUGE
        btn.innerText = "Annuler inscription";
        btn.className = "action-button unregister-btn"; 
    } else {
        // Sinon, le bouton est INDIGO
        btn.innerText = "Réserver ma place";
        btn.className = "action-button register-btn"; 
    }

    // Afficher la modale (ajoute la classe CSS 'is-active')
    document.getElementById('event-modal').classList.add('is-active');
}


// *****************************************************
// --- 4. FONCTION POUR GÉRER L'INSCRIPTION/DÉSINSCRIPTION ---
// *****************************************************
function handleRegistration() {
    const evt = events.find(e => e.id === currentEventId);

    if(myRegistrations.includes(currentEventId)) {
        // CAS DÉSINSCRIPTION : on retire l'ID de la liste.
        myRegistrations = myRegistrations.filter(id => id !== currentEventId);
        evt.registered--;
        alert(`Vous avez annulé votre inscription à : ${evt.title}`);
    } else {
        // CAS INSCRIPTION : on ajoute l'ID à la liste.
        if (evt.registered >= evt.spots) {
             alert(`Désolé, l'événement est complet !`);
             return;
        }
        myRegistrations.push(currentEventId);
        evt.registered++;
        alert(`Inscription confirmée pour : ${evt.title}`);
    }

    // Après la modification des données :
    renderEventsGrid(); // 1. Mettre à jour l'affichage des cartes principales.
    openEventModal(currentEventId); // 2. Mettre à jour le bouton dans la modale.
}

// *****************************************************
// --- 5. FONCTION POUR FERMER LE POPUP ---
// *****************************************************
function closeModal(modalId) {
    // Retire la classe 'is-active' pour cacher la modale.
    document.getElementById(modalId).classList.remove('is-active');
}


// *****************************************************
// --- DÉMARRAGE : Appel initial ---
// *****************************************************
// Affiche la grille des événements au chargement de la page.
renderEventsGrid();