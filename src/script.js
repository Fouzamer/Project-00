var cardIndex = 1;
hiddenCard();
showCard(cardIndex);

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
    // Hide all the cards
    var cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        card.style.display = 'none';
    });
}

function showCard(n) {
    // Show the card based on cardIndex
    var cardToShow = document.getElementById('card' + n);
    if (cardToShow) {
        cardToShow.style.display = 'block';
    }
}

function nextCard(cardIndex) {
    // Hide all the cards
    hiddenCard();

    // Show the card based on cardIndex
    showCard(cardIndex);
}

document.getElementById('sign-in-form').addEventListener('submit', function(event) {
    event.preventDefault();
    if (verifyInput()) {
        // Redirect or perform further actions
        alert('Form submitted successfully!');
        // Example: window.location.href = 'Main-Tab.html';
    }
});

// THIS IS WHERE THE SIGN UP PAGE ENDS //

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


// Create a profile card // 
document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    
    const formData = collectFormData('profile-form');

    // Check for missing fields and alert if any are missing
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

    // Store the data or do further processing here
    storeUserData(formData);

    // Move to card index 3
    cardIndex = 3;
    nextCard(cardIndex);
});

// Collect form data
function collectFormData(formId) {
    const form = document.getElementById(formId);
    const data = {};
    new FormData(form).forEach((value, key) => {
        data[key] = value;
    });
    return data;
}

// Placeholder for storing user data
function storeUserData(data) {
    console.log('Data stored:', data);
}

// Placeholder for transitioning to the next card
function nextCard(cardIndex) {
    console.log('Moving to card:', cardIndex);
    hiddenCard(); // Hide all cards
    showCard(cardIndex); // Show the selected card
}

// Placeholder to hide all cards
function hiddenCard() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.style.display = 'none');
}

// Placeholder to show the selected card
function showCard(cardIndex) {
    const cardToShow = document.getElementById('card' + cardIndex);
    if (cardToShow) {
        cardToShow.style.display = 'block';
    }

}

// Java for 