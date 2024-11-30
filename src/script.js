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
    cardIndex = 2; // Change to the next card index
    nextCard(cardIndex);
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

document.getElementById('next-button').addEventListener('click', function() {

    if (selectedPurposes.size === 0) {
        alert('Please choose a purpose.');
    } else {
    const purposesArray = Array.from(selectedPurposes);
    storeUserData({ purposes: purposesArray });
    alert('Purposes stored successfully!'); 
    cardIndex = 3; // Change to the next card index
    nextCard(cardIndex); }
});

document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const data = collectFormData('profile-form');
    const requiredFields = ['firstName', 'birthdate'];

    if (!checkMissingFields(data, requiredFields)) {
        return false;
    }

    storeUserData(data);
    alert('Profile data stored successfully!');
});
