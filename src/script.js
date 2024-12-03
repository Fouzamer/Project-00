var cardIndex = 1;
hiddenCard();
showCard(cardIndex);


// --------SIGN UP PAGE CARD 2------- // 
function collectFormData(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    return data;
}

function checkMissingFields(data, requiredFields) {
    for (const field of requiredFields) {
        if (!data[field]) {
            alert(`Please enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
            return false;
        }
    }
    return true;
}


function verifyInput() {
    const data = collectFormData('sign-in-form');
    const requiredFields = ['username', 'password', 'confirmPassword'];

    if (!checkMissingFields(data, requiredFields)) {
        return false;
    }

    const { username, password, confirmPassword } = data;

    if (password !== confirmPassword) {
        alert('Please make sure your passwords match');
        return false;
    }

    storeUserData({ username, password });
    
    return true;
}

function hiddenCard() {

    var cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        card.style.display = 'none';
    });
}

function showCard(n) {
   
    var cardToShow = document.getElementById('card' + n);
    if (cardToShow) {
        cardToShow.style.display = 'block';
    }
}

function nextCard(cardIndex) {
    
    hiddenCard();

   
    showCard(cardIndex);
}

document.getElementById('sign-in-form').addEventListener('submit', function(event) {
    event.preventDefault();
    if (verifyInput()) {
        
        alert('Form submitted successfully!');
       window.location.href = 'Main-Tab.html';
    }
});

// ------ THIS IS WHERE THE SIGN UP PAGE ENDS -----//


// -------CARD 1 : CHOOSE YOUR PURPOSE------ //

// Java for Purposes style //
const purposeButtons = document.querySelectorAll('.purpose-button');
const selectedPurposes = new Set();

purposeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const purpose = this.getAttribute('data-purpose');
        if (selectedPurposes.has(purpose)) {
            selectedPurposes.delete(purpose);
            this.classList.remove('selected');
        } else {
            selectedPurposes.add(purpose);
            this.classList.add('selected');
        }
    });
});

// Java for User Alerts // 
document.getElementById('next-button').addEventListener('click', function() {

    if (selectedPurposes.size === 0) {
        alert('Please choose a purpose.');
    } else {
    const purposesArray = Array.from(selectedPurposes);
    storeUserData({ purposes: purposesArray });
    alert('Purposes stored successfully!'); 
    cardIndex = 2; 
    nextCard(cardIndex); }
});


// ----- CARD 3:Create a profile card // 

document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const formData = collectFormData('profile-form');

   
    if (!formData['first-name']) {
        alert('Please write your first name');
        return;
    }
    if (!formData['last-name']) {
        alert('Please write your last name');
        return;
    }
    
    if (!formData['email']) {
        alert('Please write your email');
        return;
    }

    
    storeUserData(formData);

   
    cardIndex = 3;
    nextCard(cardIndex);
});

// Fonction pour afficher la date actuelle
function updateCalendar() {
    const date = new Date();
    
    // Afficher la date complète
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = date.toLocaleDateString('fr-FR', options);
    
    // Afficher le jour
    document.getElementById('current-day').textContent = date.getDate();
    
    // Afficher le mois
    const monthOptions = { month: 'long' };
    document.getElementById('current-month').textContent = date.toLocaleDateString('fr-FR', monthOptions);
}

// Exécuter la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', updateCalendar);

// Exemple de tâches (à adapter selon votre base de données)
function displayTasks() {
    const tasksContainer = document.getElementById('daily-tasks');
    // Nettoyer le conteneur
    tasksContainer.innerHTML = '';
    
    // Exemple de tâches (à remplacer par vos données)
    const tasks = [
        { time: '09:00', title: 'Réunion équipe' },
        { time: '14:00', title: 'Présentation' }
    ];

    // Afficher chaque tâche
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'bg-gray-50 p-2 rounded flex justify-between items-center';
        taskElement.innerHTML = `
            <span class="text-gray-600">${task.time}</span>
            <span>${task.title}</span>
        `;
        tasksContainer.appendChild(taskElement);
    });
}

// Exécuter l'affichage des tâches au chargement
document.addEventListener('DOMContentLoaded', displayTasks);

function collectFormData(formId) {
    const form = document.getElementById(formId);
    const data = {};
    new FormData(form).forEach((value, key) => {
        data[key] = value;
    });
    return data;
}

function storeUserData(data) {
    console.log('Data stored:', data);
}

function nextCard(cardIndex) {
    console.log('Moving to card:', cardIndex);
    hiddenCard(); 
    showCard(cardIndex); 
}


function hiddenCard() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.style.display = 'none');
}


function showCard(cardIndex) {
    const cardToShow = document.getElementById('card' + cardIndex);
    if (cardToShow) {
        cardToShow.style.display = 'block';
    }

}

// CONTACT US // 

document.getElementById("ContactForm").addEventListener('submit', function(event) {
    event.preventDefault();


    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;


    if (email && message) {
        alert('Thank you for your message!');

      
        window.location.href = 'Main-Tab.html'; 
    } else {
        alert('Please fill out both the email and message fields.');
    }
});

// Fonction pour gérer la génération du calendrier
function handleCalendarGeneration() {
    const generateButton = document.querySelector('#generate-calendar-btn'); // Assurez-vous d'avoir cet ID sur votre bouton
    
    if (generateButton) {
        generateButton.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Vérifier si toutes les données nécessaires sont présentes
            if (validateCalendarData()) {
                // Sauvegarder les données si nécessaire
                saveCalendarData();
                
                // Rediriger vers la page principale
                window.location.href = 'Main-Tab.html';
            } else {
                alert('Veuillez remplir toutes les informations nécessaires.');
            }
        });
    }
}

const taskName = document.querySelector('#task-name').value.trim();
const taskDay = document.querySelector('#task-day').value;

if (taskName && taskDay) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ name: taskName, day: taskDay });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

console.log(localStorage.getItem('tasks'));

// Fonction de validation des données du calendrier
function validateCalendarData() {
    // Ajoutez ici votre logique de validation
    return true; // À modifier selon vos besoins
}

// Fonction pour sauvegarder les données du calendrier
function saveCalendarData() {
    // Ajoutez ici votre logique de sauvegarde
}

// Initialiser la gestion du calendrier au chargement de la page
document.addEventListener('DOMContentLoaded', handleCalendarGeneration);

// Remplacez le script existant par celui-ci
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page chargée'); // Debug

    // Récupérer les tâches
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log('Tâches récupérées:', tasks); // Debug

    // Afficher les tâches dans le calendrier
    tasks.forEach(task => {
        const dayId = task.day.toLowerCase();
        const dayDiv = document.getElementById(dayId);
        
        console.log('Recherche du jour:', dayId); // Debug
        console.log('Élément trouvé:', dayDiv); // Debug

        if (dayDiv) {
            const taskElement = document.createElement('div');
            taskElement.textContent = `- ${task.name}`;
            taskElement.classList.add('text-sm', 'text-gray-700', 'mt-2', 'bg-blue-200', 'p-1', 'rounded');
            dayDiv.appendChild(taskElement);
        }
    });

    // Gestionnaire pour effacer les tâches
    const clearButton = document.getElementById('clear-tasks');
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            if (confirm('Voulez-vous vraiment effacer toutes les tâches ?')) {
                // Effacer localStorage
                localStorage.removeItem('tasks');

                // Effacer l'affichage
                const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                days.forEach(day => {
                    const dayDiv = document.getElementById(day);
                    if (dayDiv) {
                        dayDiv.innerHTML = day.toUpperCase();
                    }
                });

                alert('Toutes les tâches ont été effacées.');
            }
        });
    }
});

// Fonction pour ajouter une tâche (à utiliser depuis votre formulaire)
function addTask(day, taskName) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ day: day.toLowerCase(), name: taskName });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Rafraîchir l'affichage
    const dayDiv = document.getElementById(day.toLowerCase());
    if (dayDiv) {
        const taskElement = document.createElement('div');
        taskElement.textContent = `- ${taskName}`;
        taskElement.classList.add('text-sm', 'text-gray-700', 'mt-2', 'bg-blue-200', 'p-1', 'rounded');
        dayDiv.appendChild(taskElement);
    }
}


// Run displayTasks when the page loads
document.addEventListener('DOMContentLoaded', displayTasks);

document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-calendar-btn');
    if (generateButton) {
        generateButton.addEventListener('click', () => {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            if (tasks.length === 0) {
                alert('No tasks found to generate the calendar.');
                return;
            }
            window.location.href = 'Main-Tab.html';
        });
    }
});

// Attach the event listener to the button
document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.querySelector('#generate-calendar-btn');
    if (generateButton) {
        generateButton.addEventListener('click', handleCalendarGeneration);
    }
});

// Dans script.js, ajouter :

function updateUserProfile() {
    const data = collectFormData('profile-form');
    const requiredFields = ['username', 'email'];

    if (!checkMissingFields(data, requiredFields)) {
        return false;
    }

    // Récupérer l'utilisateur actuel
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Mettre à jour les données
    const updatedUser = {
        ...currentUser,
        username: data.username,
        email: data.email
    };

    // Sauvegarder dans localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Mettre à jour aussi dans la liste des utilisateurs
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
    }

    alert('Profile updated successfully!');
    // Redirection vers la page principale
    window.location.href = 'Main-Tab.html';
}
document.addEventListener('DOMContentLoaded', function() {
    // Charger les données utilisateur
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('user-name').textContent = currentUser.name || 'N/A';
        document.getElementById('user-username').textContent = currentUser.username || 'N/A';
        document.getElementById('user-lastname').textContent = currentUser.lastName || 'N/A';
    }

    // Charger les tâches
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const userTasks = tasks.filter(task => task.userId === currentUser.username);
    const tasksContainer = document.getElementById('user-tasks');

    if (userTasks.length > 0) {
        userTasks.forEach(task => {
            tasksContainer.innerHTML += `
                <div class="bg-gray-50 p-3 rounded-lg">
                    <h4 class="font-medium text-gray-800">${task.title}</h4>
                    <p class="text-gray-600 text-sm">${task.description}</p>
                    <p class="text-gray-500 text-xs mt-1">Due: ${task.dueDate}</p>
                </div>
            `;
        });
    } else {
        tasksContainer.innerHTML = '<p class="text-gray-500">No tasks found</p>';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const tasksContainer = document.getElementById('tasksContainer');
    if (!tasksContainer) {
        console.error('Tasks container not found!');
        return;
    }

    tasksContainer.innerHTML = ''; // Vider le contenu précédent

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const profileName = currentUser.name || 'User';

    // Filtrer les tâches de l'utilisateur actuel
    const userTasks = tasks.filter(task => task.userId === currentUser.username);

    if (userTasks.length === 0) {
        // Afficher un message si aucune tâche n'est trouvée
        tasksContainer.innerHTML = `
            <p class="text-gray-500 text-center">No tasks today, ${profileName}.</p>
        `;
        return;
    }

    // Afficher les tâches
    userTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'bg-blue-100 p-2 rounded-md mb-2 flex justify-between items-center';
        taskElement.innerHTML = `
            <span class="font-medium">${task.title}</span>
            <span class="text-gray-500 text-sm">${task.dueDate}</span>
        `;
        tasksContainer.appendChild(taskElement);
    });
});