// *****************************************************
// --- 1. DONNÉES DE L'APPLICATION (Le 'STATE' ou l'État) ---
// Ces variables représentent les données de l'application à un instant donné.
// *****************************************************

// C'est le tableau (la liste) de tous nos événements disponibles.
let events = [
    { 
        id: 1, // L'identifiant unique de l'événement (très important pour le retrouver)
        title: 'Nuit de l\'IA', 
        start: '2025-11-25T18:00:00', // Date et heure complètes (format standard)
        location: 'Amphi Turing', 
        desc: 'Débat sur l\'avenir des LLM avec des experts de DeepMind.', 
        category: 'Conférence', 
        spots: 120, // Nombre total de places disponibles
        registered: 80, // Nombre de personnes déjà inscrites (cette valeur change !)
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
    // ... autres événements ...
];

// C'est la liste des ID des événements auxquels l'utilisateur est inscrit.
// Ici, l'utilisateur est inscrit à l'événement qui a l'ID 1.
let myRegistrations = [1]; 

// Variable temporaire pour stocker l'ID de l'événement actuellement ouvert dans le popup (Modale).
let currentEventId = null; 

// *****************************************************
// --- 2. FONCTION POUR AFFICHER LA GRILLE D'ÉVÉNEMENTS (Le Rendu) ---
// Cette fonction lit les données et crée le HTML correspondant dans la page.
// *****************************************************
function renderEventsGrid() {
    // 1. On récupère l'élément HTML (la <div>) par son ID pour y insérer le contenu.
    const grid = document.getElementById('events-grid');
    let htmlContent = ''; // Variable qui va accumuler tout le code HTML des cartes.

    // 2. On utilise 'forEach' pour parcourir TOUS les événements dans notre tableau 'events'.
    events.forEach(e => {
        // Vérifie si l'ID de l'événement (e.id) est présent dans notre liste d'inscriptions.
        const isReg = myRegistrations.includes(e.id); 
        // Calcule la progression pour la barre.
        const percent = (e.registered / e.spots) * 100; 
        
        // 3. On commence à construire le code HTML de la carte.
        htmlContent += `
        <div class="event-card">
            <div class="event-image">
                <img src="${e.img}" alt="${e.title}">
            </div>
            <div class="event-info">
                ${isReg ? '<span class="registered-tag"><i class="fas fa-check"></i> Inscrit</span>' : ''}
                
                <div class="event-details">... ${e.location}</div>
                <h3>${e.title}</h3>
                
                <div class="card-footer">
                    <div class="card-spot-info">Places: ${e.registered} / ${e.spots}</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percent}%"></div>
                    </div>
                    
                    <button class="action-button" onclick="openEventModal(${e.id})">
                        Voir détails
                    </button>
                </div>
            </div>
        </div>`;
    });

    // 4. On insère tout le HTML généré dans la DIV 'events-grid'. C'est le rendu final.
    grid.innerHTML = htmlContent;
}


// *****************************************************
// --- 3. FONCTION POUR OUVRIR LA MODALE (le popup) ---
// S'exécute quand l'utilisateur clique sur "Voir détails".
// *****************************************************
function openEventModal(id) {
    currentEventId = id; // Stocke l'ID pour pouvoir s'inscrire/se désinscrire plus tard.
    
    // 'find' cherche l'événement correspondant à l'ID donné dans le tableau 'events'.
    const evt = events.find(e => e.id === id); 
    if(!evt) return; // Si on ne trouve pas d'événement, on arrête la fonction.

    // Mise à jour des informations dans les éléments HTML de la modale par leur ID.
    document.getElementById('modal-title').innerText = evt.title;
    document.getElementById('modal-category').innerText = evt.category;
    // ... (mise à jour des autres champs de la modale : date, lieu, image, description)
    document.getElementById('modal-spots').innerText = evt.spots - evt.registered; // Calcul des places restantes

    // 🌟 GESTION DU BOUTON D'ACTION DANS LA MODALE 🌟
    const btn = document.getElementById('modal-action-btn');
    if(myRegistrations.includes(id)) {
        // CAS INSCRIT : On change le texte et la classe CSS pour le rendre rouge (unregister-btn).
        btn.innerText = "Annuler inscription";
        btn.className = "action-button unregister-btn"; 
    } else {
        // CAS NON INSCRIT : On change le texte et la classe CSS pour le rendre bleu (register-btn).
        btn.innerText = "Réserver ma place";
        btn.className = "action-button register-btn"; 
    }

    // Afficher la modale : on ajoute la classe 'active' pour que le CSS la rende visible.
    document.getElementById('event-modal').classList.add('active');
}


// *****************************************************
// --- 4. FONCTION POUR GÉRER L'INSCRIPTION/DÉSINSCRIPTION ---
// S'exécute quand l'utilisateur clique sur le bouton "Réserver" ou "Annuler" dans la modale.
// *****************************************************
function handleRegistration() {
    // On retrouve l'événement actuel grâce à 'currentEventId'
    const evt = events.find(e => e.id === currentEventId);

    if(myRegistrations.includes(currentEventId)) {
        // CAS 1 : L'utilisateur est DÉJÀ inscrit -> on le désinscrit.
        // 'filter' crée un nouveau tableau qui exclut l'ID de l'événement actuel.
        myRegistrations = myRegistrations.filter(id => id !== currentEventId);
        evt.registered--; // On diminue le nombre de participants.
        alert(`Inscription annulée pour : ${evt.title}`);
    } else {
        // CAS 2 : L'utilisateur n'est PAS inscrit -> on l'inscrit.
        // 'push' ajoute l'ID à la liste des inscriptions.
        myRegistrations.push(currentEventId);
        evt.registered++; // On augmente le nombre de participants.
        alert(`Inscription réussie pour : ${evt.title}`);
    }

    // On met à jour l'affichage après la modification des données :
    renderEventsGrid(); // Pour que le tag "Inscrit" apparaisse/disparaisse sur la carte principale.
    openEventModal(currentEventId); // Pour rafraîchir la modale et changer le texte du bouton.
}

// *****************************************************
// --- 5. FONCTION POUR FERMER LA MODALE ---
// S'exécute quand on clique sur la croix de fermeture.
// *****************************************************
function closeModal(modalId) {
    // Retire la classe 'active', ce qui fait disparaître la modale (grâce au CSS).
    document.getElementById(modalId).classList.remove('active');
}


// *****************************************************
// --- DÉMARRAGE DE L'APPLICATION ---
// *****************************************************
// Cette ligne est appelée UNIQUEMENT quand le script charge.
// Elle initialise l'affichage de la grille d'événements dès l'ouverture de la page.
renderEventsGrid();