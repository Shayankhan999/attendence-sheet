// function login() {
//     let name = document.getElementById("name");
//     let email = document.getElementById("email");
//     let password = document.getElementById("password");
//     let users = localStorage.getItem("users");

//     if (users) {
//         users = JSON.parse(users);
//     } else {
//         users = [];
//     }
//     // console.log(users)
//     let user = {
//         name: name.value,
//         email: email.value,
//         password: password.value,
//     }
//     users.push(user);
//     localStorage.setItem("users",JSON.stringify(users))
    
//     name.value=""
//     email.value=""
//     password.value=""




// }
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    document.getElementById(sectionId).classList.remove('hidden');

    if (sectionId !== 'main-page') {
        document.getElementById('main-page').classList.add('hidden');
    } else {
        document.getElementById('main-page').classList.remove('hidden');
    }
}

function register() {
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const dob = document.getElementById("reg-dob").value;
    const gender = document.getElementById("reg-gender").value;
    const className = document.getElementById("reg-class").value;

    let users = localStorage.getItem("users");
    users = users ? JSON.parse(users) : [];

    const user = { name, email, password, dob, gender, className };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    showSection('main-page');
}

function login() {
    const name = document.getElementById("login-name").value;
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    let users = localStorage.getItem("users");
    users = users ? JSON.parse(users) : [];

    const user = users.find(user => user.name === name && user.email === email && user.password === password);
    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        showSection('attendance-page');
        populateAttendance();
    } else {
        alert("Invalid login credentials");
    }
}

function populateAttendance() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const tbody = document.querySelector("#attendance-table tbody");
    tbody.innerHTML = '';  // Clear existing rows

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${user.name}</td><td>${user.email}</td><td><input type="checkbox"></td>`;
        tbody.appendChild(row);
    });
}

function logout() {
    localStorage.removeItem("loggedInUser");
    showSection('main-page');
}

window.onload = function() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        showSection('attendance-page');
        populateAttendance();
    } else {
        showSection('main-page');
    }
};
