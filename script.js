// *****************************************************
// --- 1. DONNÉES DE L'ÉVÉNEMENT (Le "State") ---
// *****************************************************
let eventData = {
    id: 42,
    title: 'Atelier de Création de Chatbots',
    category: 'Conférence',
    date: '20 décembre 2025 à 14:00',
    location: 'Salle Polyvalente A',
    description: "Apprenez les bases du traitement du langage naturel (NLP) et construisez votre premier chatbot avec Python. Ouvert à tous les niveaux.",
    spots: 30, // Places totales
    registered: 18, // Inscriptions actuelles
    img: "https://images.unsplash.com/photo-1549683935-85c181f9b37c?q=80&w=600"
};

// État de l'utilisateur : Vrai s'il est inscrit, Faux sinon.
let isRegistered = false; 

// *****************************************************
// --- 2. FONCTION PRINCIPALE D'ACTION (Appelée au clic du bouton) ---
// *****************************************************
function handleRegistration() {
    // 1. Récupération des éléments HTML à modifier
    const btn = document.getElementById('main-action-btn');
    const statusMsg = document.getElementById('status-message');
    const spotsCount = document.getElementById('spots-count');
    
    // 2. Logique de basculement Inscription/Désinscription
    if (isRegistered) {
        // CAS DÉJÀ INSCRIT -> On annule
        isRegistered = false;
        eventData.registered--;
        
        // Mise à jour de l'apparence et des messages
        btn.innerText = "Réserver ma place";
        btn.className = "action-button register-btn"; // Applique le style bleu/cyan
        statusMsg.className = "status-message status-spots";
        
    } else {
        // CAS NON INSCRIT -> On s'inscrit
        
        // Vérification des places disponibles
        if (eventData.registered >= eventData.spots) {
             alert("Désolé, l'événement est complet !");
             return; // Arrête la fonction
        }
        
        isRegistered = true;
        eventData.registered++; // On augmente le compteur
        
        // Mise à jour de l'apparence et des messages
        btn.innerText = "Inscription réussie ! Annuler ?";
        btn.className = "action-button unregister-btn"; // Applique le style rouge
        statusMsg.className = "status-message status-registered";
    }
    
    // 3. Mise à jour finale du nombre de places
    spotsCount.innerText = eventData.spots - eventData.registered;
}

// *****************************************************
// --- 3. FONCTION DE DÉMARRAGE (Initialisation) ---
// *****************************************************
function initPage() {
    // 1. Remplissage des éléments HTML avec les données
    document.getElementById('event-title').innerText = eventData.title;
    document.getElementById('event-category').innerText = eventData.category.toUpperCase();
    document.getElementById('event-date').innerText = eventData.date;
    document.getElementById('event-location').innerText = eventData.location;
    document.getElementById('event-description').innerText = eventData.description;
    document.getElementById('event-img').src = eventData.img;

    // 2. Initialisation du bouton (pour qu'il affiche "Réserver ma place" avec le bon style)
    // On force un appel à handleRegistration pour initialiser l'affichage correct (voir notes dans la version précédente)
    // On simule une désinscription pour s'assurer que l'état initial (isRegistered=false) est bien appliqué à l'affichage.
    handleRegistration(); 
}

// Démarre la fonction 'initPage' une fois que la page entière est chargée.
window.onload = initPage;