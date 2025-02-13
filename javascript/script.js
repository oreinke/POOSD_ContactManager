function toggleAuth() {
    const authTitle = document.getElementById('auth-title');
    const authForm = document.getElementById('auth-form');
    const toggleText = document.querySelector('.auth__toggle');

    if (authTitle.textContent === 'Login') {
        authTitle.textContent = 'Register';
        authForm.innerHTML = `
            <div class="auth__group">
                <label class="auth__label" for="username">Username</label>
                <input class="auth__input" type="text" id="username" required>
            </div>
            <div class="auth__group">
                <label class="auth__label" for="password">Password</label>
                <input class="auth__input" type="password" id="password" required>
            </div>
            <button type="submit" class="auth__button">Register</button>
        `;
        toggleText.textContent = 'Already have an account? Login';
    } else {
        authTitle.textContent = 'Login';
        authForm.innerHTML = `
            <div class="auth__group">
                <label class="auth__label" for="username">Username</label>
                <input class="auth__input" type="text" id="username" required>
            </div>
            <div class="auth__group">
                <label class="auth__label" for="password">Password</label>
                <input class="auth__input" type="password" id="password" required>
            </div>
            <button type="submit" class="auth__button">Login</button>
        `;
        toggleText.textContent = "Don't have an account? Register";
    }
}