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

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = "http://52.44.189.230/";

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "contacts.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}
