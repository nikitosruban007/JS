const FormRegister = document.getElementById('register');
const FormLogin = document.getElementById('login');

if (FormRegister) {
    FormRegister.addEventListener('submit', async (e) => {
        e.preventDefault();

        let login = FormRegister.elements['login'].value;
        let password = FormRegister.elements['password'].value;
        let AgainPassword = FormRegister.elements['again-password'].value;
        let email = FormRegister.elements['email'].value;

        if (login.length <= 5) {
            showError("Логін повинен бути не менше 5-ти символів!");
            return false;
        }

        if (password.length <= 5) {
            showError("Пароль повинен бути не менше 5-ти символів!");
            return false;
        }

        if (!email.includes("@")) {
            showError("Невірний формат пошти!");
            return false;
        }

        if (password !== AgainPassword) {
            showError("Паролі не співпадають!");
            return false;
        }

        await registerUser(login, email, password);
    });
}

if (FormLogin) {
    FormLogin.addEventListener('submit', async (e) => {
        e.preventDefault();

        let login = FormLogin.elements['login'].value;
        let password = FormLogin.elements['password'].value;

        const success = await loginUser(login, password);

        if (!success) {
            showError("Логін чи пароль не співпадають!");
        }
    });
}

function showError(message) {
    const errorHTML = `
        <div class="error" id="error-id">
            <h3>От халепа!</h3>
            <p>${message}</p>
        </div>
    `;

    const targetElement = FormRegister || FormLogin || document.body;
    targetElement.insertAdjacentHTML('beforebegin', errorHTML);

    const errorElement = document.getElementById('error-id');

    setTimeout(() => {
        if (errorElement) {
            const animation = errorElement.animate([
                { opacity: 1 },
                { opacity: 0 }
            ], {
                duration: 500,
                easing: 'ease'
            });

            animation.onfinish = () => errorElement.remove();
        }
    }, 2000);
}

async function registerUser(login, email, password) {
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, email, password })
        });

        if (response.ok) {
            localStorage.setItem('username', login);
            window.location.href = 'index.html';
        }
    } catch (error) {
        showError("Помилка з'єднання з сервером");
    }
}

async function loginUser(username, password) {
    try {
        const url = `http://localhost:3000/users?login=${username}&password=${password}`;
        const response = await fetch(url);
        const matchedUsers = await response.json();

        if (matchedUsers.length > 0) {
            const user = matchedUsers[0];
            localStorage.setItem('username', user.login);
            window.location.href = 'user.html';
            return true;
        }
        return false;
    } catch (error) {
        showError("Помилка з'єднання з сервером");
        return false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('username');

    if (currentUser && window.location.pathname.includes('user.html')) {
        document.body.insertAdjacentHTML('afterbegin', `<h1>Вітаю, ${currentUser}!</h1>`);
    }
});