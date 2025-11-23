// *****************************************************
// --- 1. DONNÉES DE L'APPLICATION (Le "State" Statistique) ---
// *****************************************************

// Tableau des événements. On conserve les données complètes (titre, lieu, places).
let events = [
    { 
        id: 1, 
        title: 'Nuit de l\'IA', 
        start: '2025-11-25T18:00:00', 
        location: 'Amphi Turing', 
        desc: 'Débat sur l\'avenir des LLM avec des experts de DeepMind.', 
        category: 'Conférence', 
        spots: 120, // Places totales
        registered: 80, // Places prises (on garde l'info, mais on ne la calcule pas)
        img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600',
    },
    { 
        id: 2, 
        title: 'Techno Party', 
        start: '2025-11-28T22:00:00', 
        location: 'Le Bunker', 
        desc: 'La soirée underground du campus.', 
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
        registered: 28, 
        img: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=600',
    }
];

// *****************************************************
// --- 2. FONCTION POUR AFFICHER LA GRILLE DES CARTES ---
// *****************************************************
function renderEventsGrid() {
    const grid = document.getElementById('events-grid');
    let htmlContent = ''; 

    // Parcours de tous les événements
    events.forEach(e => {
        
        // Construction de la carte HTML.
        htmlContent += `
        <div class="event-card"> 
            <div class="event-image">
                <img src="${e.img}" alt="${e.title}">
            </div>
            <div class="event-info">
                <h3>${e.title}</h3>
                <div class="event-details">
                    <i class="fas fa-calendar"></i> ${new Date(e.start).toLocaleDateString('fr-FR')} 
                    <span style="margin: 0 5px;">|</span>
                    <i class="fas fa-map-marker-alt"></i> ${e.location}
                </div>
                <div style="font-size: 12px; color: var(--text-muted); margin-top: 5px;">
                    <i class="fas fa-users"></i> ${e.spots} places totales.
                </div>
            </div>
        </div>`;
    });

    // Injection du HTML dans la page
    grid.innerHTML = htmlContent;
}


// *****************************************************
// --- DÉMARRAGE : Appel initial ---
// *****************************************************
// Affiche la grille des événements au chargement de la page.
renderEventsGrid();