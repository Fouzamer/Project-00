//Function to store user data in local storage as an object
function storeUserData(data) {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            localStorage.setItem(key, data[key]);
        }
    }
}