//Function to store user data in local storage as an object
function storeUserData(data) {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            localStorage.setItem(key, data[key]);
        }
    }
}

document.querySelector('button').addEventListener('click', () => {
    const taskName = document.querySelector('#task-name').value.trim();
    const taskDay = document.querySelector('#task-day').value;

    if (taskName && taskDay) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ name: taskName, day: taskDay });
        localStorage.setItem('tasks', JSON.stringify(tasks));

        if (confirm('Task added! Would you like to add another?')) {
            document.querySelector('#task-name').value = '';
            document.querySelector('#task-day').value = '';
        } else {
            window.location.href = 'calendar.html';
        }
    } else {
        alert('Please fill out both the task name and select a day.');
    }
});