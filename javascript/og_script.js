const urlBase = 'https://www.whenthe.cc/API';
const extension = 'php';

let userId = 0;
let first_name = "";
let last_name = "";


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
        first_name = "";
        last_name = "";

        let login = document.getElementById("username").value;
        let password = document.getElementById("password").value;
//      var hash = md5( password );

        document.getElementById("loginResult").innerHTML = "";

        let tmp = {login:login,password:password};
//      var tmp = {login:login,password:hash};
        let jsonPayload = JSON.stringify( tmp );

        let url = urlBase + '/Login.' + extension;

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

                                first_name = jsonObject.first_name;
                                last_name = jsonObject.last_name;

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

function saveCookie()
{
        let minutes = 20;
        let date = new Date();
        date.setTime(date.getTime()+(minutes*60*1000));
        document.cookie = "first_name" + first_name + ",last_name="  + last_name + ",userId=" + userId + ";expires=" + date + date.toGMTString();
}

function readCookie()
{
	  userId = -1;
        let data = document.cookie;
        let splits = data.split(",");
        for(var i = 0; i < splits.length; i++)
        {
                let thisOne = splits[i].trim();
                let tokens = thisOne.split("=");
                if( tokens[0] == "first_name" )
                {
                        first_name = tokens[1];
                }
                else if( tokens[0] == "last_name" )
                {
                        last_name = tokens[1];
                }
                else if( tokens[0] == "userId" )
                {
                        userId = parseInt( tokens[1].trim() );
                }
        }

        if( userId < 0 )
        {
                window.location.href = "index.html";
        }
        else
        {
//              document.getElementById("userName").innerHTML = "Logged in >
        }
}
