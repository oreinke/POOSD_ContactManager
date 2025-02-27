const urlBase = 'https://www.whenthe.cc/API';
const extension = 'php';

let userId = 0;
let first_name = "";
let last_name = "";
let name = "";

function toggleAuth() {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const authTitle = document.getElementById("auth-title");
    const toggleText = document.getElementById("toggle-text");
    const toggleTextPrefix = document.getElementById("toggle-text-prefix");

    let loginResult = document.getElementById("loginResult");
    if (loginResult) 
    {
        loginResult.innerHTML = "";
    }

    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
        authTitle.innerText = "Login";
        /*toggleTextPrefix.innerText = "Don't have an account?"
        toggleText.innerText = "Register"; */
	if (toggleTextPrefix) 
        {
            toggleTextPrefix.innerText = "Don't have an account?";
        }
        if (toggleText) 
        {
            toggleText.innerText = "Register";
        } 
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
        authTitle.innerText = "Register";
        /*toggleTextPrefix.innerText = "Already have an account?"
        toggleText.innerText = "Login"; */
	if (toggleTextPrefix) 
        {
            toggleTextPrefix.innerText = "Already have an account?";
        }
        if (toggleText) 
        {
            toggleText.innerText = "Login";
        } 
    }
}

function doRegister()
{
    let username = document.getElementById("register-username").value;
    let password = document.getElementById("register-password").value;
    let email = document.getElementById("register-email").value;
    let name = document.getElementById("register-name").value;
    let registerResult = document.getElementById("registerResult");
    if (!username || !password || !email || !name) {
        registerResult.innerHTML = "Please fill in all fields.";
        registerResult.style.color = "red";
        return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        registerResult.innerHTML = "Please enter a valid email address<br>(e.g., name@example.com).";
        registerResult.style.color = "red";
        return;  // Stop further processing
    }

    let loginResult = document.getElementById("loginResult");
    if (loginResult) {
        loginResult.innerHTML = "";
    } else {
        console.error("Element with ID 'loginResult' not found in DOM.");
    }

    let tmp = { name: name, email: email, username: username, password: password };
    let jsonPayload = JSON.stringify(tmp);


    let url = urlBase + '/Register.php';

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4) 
            {
                console.log("Response:", this.responseText); // ✅ Debug log

                if (this.status == 200) 
                {
                    let jsonObject = JSON.parse(xhr.responseText);
                    console.log("Parsed JSON:", jsonObject); // ✅ Debug parsed data

                    if (jsonObject.error && jsonObject.error.length > 0) 
                    {
                        document.getElementById("registerResult").innerHTML = jsonObject.error;
                        document.getElementById("registerResult").style.color = 'red';
                        return;
                    }

                    // Switch to login form
                    document.getElementById("register-form").style.display = "none";
                    document.getElementById("login-form").style.display = "block";
                    document.getElementById("auth-title").innerText = "Login";
                    document.getElementById("toggle-text-prefix").innerText = "Don't have an account?";
                    document.getElementById("toggle-text").innerText = "Register";
                    
                    loginResult.style.innerHTML = "Successful register";
                    loginResult.style.color = "green";
                    window.location.href = "index.html";
                }
            }
        };

        xhr.send(jsonPayload);
    }
    catch(err)
    {
       if (registerResult) {
            registerResult.innerHTML = err.message;
            registerResult.style.color = 'red';
        }
    }
}


function doLogin()
{
    userId = 0;
    /*first_name = "";
    last_name = "";*/
    name = "";

    let login = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    let loginResult = document.getElementById("loginResult");
    if (loginResult) {
        loginResult.innerHTML = "";
    } else {
        console.error("Element with ID 'loginResult' not found in DOM.");
    }
	
    if (!login || !password)
    {
        loginResult.innerHTML = "Please fill in all fields.";
        loginResult.style.color = "red"
        return;
    }

    

    let tmp = { username: login, password: password };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/Login.php';

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4) 
            {
            
            console.log("Response:", this.responseText);  // ✅ Debug log

            if (this.status == 200) 
            {
                let jsonObject = JSON.parse(xhr.responseText);
                console.log("Parsed JSON:", jsonObject); // ✅ Debug parsed data

                if (jsonObject.error && jsonObject.error.length > 0) 
                {
                console.error("Login Error:", jsonObject.error); //Debug
                document.getElementById("loginResult").innerHTML = jsonObject.error;
                document.getElementById("loginResult").style.color = 'red';
                return;
                }

                if (jsonObject.id && jsonObject.id > 0) {
                    userId = jsonObject.id;
                } else {
                    console.error("Invalid user ID returned from server.");
                    document.getElementById("loginResult").innerHTML = "Login failed. Invalid user ID.";
                    document.getElementById("loginResult").style.color = 'red';
                    return;
                }
                
                if (jsonObject.name) {
                    name = jsonObject.name;
                } else {
                    console.error("Name not returned from server.");
                    name = ""; // Ensure name is at least an empty string
                }
                /*first_name = jsonObject.first_name;
                last_name = jsonObject.last_name;*/
                console.log("Login Successful: userId =", userId, "name =", name);

                saveCookie();
                window.location.href = "contacts.html";
                }
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
      	console.error("Login Request Failed:", err); //Debug
        if (loginResult) {
                loginResult.innerHTML = err.message;
                document.getElementById("loginResult").style.color = 'red';
            }
        }
}

function togglePasswordVisibility() {
    const passwordInputs = document.querySelectorAll('.auth__input[type="password"]');
    const toggleIcons = document.querySelectorAll('.auth__toggle-icon');

    toggleIcons.forEach((icon, index) => {
        icon.addEventListener('click', function () {
            if (passwordInputs[index].type === 'password') {
                passwordInputs[index].type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInputs[index].type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

function saveCookie()
{
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));

    /*document.cookie = "first_name=" + first_name + ";expires=" + date.toGMTString() + ";path=/";
    document.cookie = "last_name=" + last_name + ";expires=" + date.toGMTString() + ";path=/";*/
    document.cookie = "name=" + name + ";expires=" + date.toGMTString() + ";path=/";
    document.cookie = "userId=" + userId + ";expires=" + date.toGMTString() + ";path=/";
}


function readCookie()
{
    userId = -1;
    let data = document.cookie;
    let splits = data.split(";");

    for (var i = 0; i < splits.length; i++) 
    {
        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");
        if (tokens[0] == "name") 
        {
            name = tokens[1];
        }
        else if (tokens[0] == "userId") 
        {
            userId = parseInt(tokens[1].trim());
        }
    }

    if (userId < 0) 
    {
        window.location.href = "index.html";
    } else {
	// Show Welcome name
	document.getElementById("welcomeUser").innerText = "Welcome " + decodeURIComponent(name);
	searchContacts();
    }
}

function doLogout()
{
    userId = 0;
    first_name = "";
    last_name = "";
    document.cookie = "first_name= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}

// 🔹 Add Contact
function addContact()
{
    let firstName = document.getElementById("first_name").value;
    let lastName = document.getElementById("last_name").value;
    let email = document.getElementById("email").value;
    let contactResult = document.getElementById("contactResult");
    if (!firstName || !lastName || !email)
    {
        contactResult.innerHTML = "Please fill in all fields.";
        contactResult.style.color = "red"
        
        return; // Stop further processing
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        contactResult.innerHTML = "Please enter a valid email address<br>(e.g., contact@example.com).";
        return;  // Do not send the request
    }
    
    let tmp = { userId: userId, first_name: firstName, last_name: lastName, email: email };
    let jsonPayload = JSON.stringify(tmp);
    
    let url = urlBase + '/AddContacts.php';
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                let jsonObject = JSON.parse(xhr.responseText);
                if (jsonObject.error && jsonObject.error.length > 0)
                {
                    document.getElementById("contactResult").innerHTML = jsonObject.error;
                    document.getElementById("contactResult").style.color = 'red';
                }
                else
                {
                    // Update confirmation
                    document.getElementById("contactResult").innerHTML = "Successfully added " + firstName + " " + lastName;
                    document.getElementById("contactResult").style.color = 'green';

                    // Clear input fields:
                    firstName.value = "";
                    lastName.value  = "";
                    email.value      = "";
                    
                    // Refresh contact list
                    searchContacts();
                }
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("contactResult").innerHTML = jsonObject.error;
        document.getElementById("contactResult").style.color = 'red';
    }
}

// 🔹 Search Contacts
function searchContacts() {
    let srch = document.getElementById("search").value.trim(); // Get search input
    let payload = { search: srch, userId: userId }; // Prepare payload

    fetch(urlBase + '/SearchContacts.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        let contactList = document.getElementById("contact-list");
        contactList.innerHTML = ""; // Clear previous results

        // 🔹 Handle No Results
        if (!data.results || data.results.length === 0) {
            contactList.innerHTML = `<li class="list-group-item text-muted">No contacts found.</li>`;
            return;
        }

        // 🔹 Display Results
        data.results.forEach(contact => {
            let entry = document.createElement("li");
            entry.className = "list-group-item d-flex justify-content-between align-items-center";
            entry.innerHTML = `
                <span>${contact.first_name} ${contact.last_name} - ${contact.email}</span>
                <div>
                    <button onclick="openEditPanel(${contact.id}, '${contact.first_name}', '${contact.last_name}', '${contact.email}')" class="btn btn-primary btn-sm">Edit</button>
                    <button onclick="deleteContact(${contact.id})" class="btn btn-danger btn-sm">Delete</button>
                </div>
            `;
            contactList.appendChild(entry);
        });
    })
    .catch(error => console.error("Error searching contacts:", error));
}


// 🔹 Delete Contact
function deleteContact(contactId)
{
    let tmp = { id: contactId, userId: userId };
    let jsonPayload = JSON.stringify(tmp);
    
    let url = urlBase + '/DeleteContacts.php';
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                document.getElementById("contactResult").innerHTML = "Contact deleted successfully";
                document.getElementById("contactResult").style.color = 'green';
                searchContacts(); // Refresh contact list
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("contactResult").innerHTML = jsonObject.error;
        document.getElementById("contactResult").style.color = 'red';
    }
}

// 🔹 Edit Contact
let editingContactId = null;

function openEditPanel(contactId, firstName, lastName, email) {
    editingContactId = contactId;
    document.getElementById("edit_first_name").value = firstName;
    document.getElementById("edit_last_name").value = lastName;
    document.getElementById("edit_email").value = email;
    document.getElementById("editContactPanel").style.display = "block";
}

function editContact() {
    if (!editingContactId) return;
    
    let newFirstName = document.getElementById("edit_first_name").value;
    let newLastName = document.getElementById("edit_last_name").value;
    let newEmail = document.getElementById("edit_email").value;
    if (!newFirstName || !newLastName || !newEmail) {
        registerResult.innerHTML = "Please fill in all fields.";
        registerResult.style.color = "red";
        return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        registerResult.innerHTML = "Please enter a valid email address<br>(e.g., name@example.com).";
        registerResult.style.color = "red";
        return;  // Stop further processing
    }
    
    let tmp = { id: editingContactId, userId: userId, first_name: newFirstName, last_name: newLastName, email: newEmail };
    let jsonPayload = JSON.stringify(tmp);
    
    let url = urlBase + '/EditContacts.php';
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("contactResult").innerHTML = "Contact updated successfully";
            document.getElementById("contactResult").style.color = "green";
            document.getElementById("editContactPanel").style.display = "none";
            searchContacts(); // Refresh the contact list
        }
    };
    
    xhr.send(jsonPayload);
}

function cancelEdit() {
    document.getElementById("editContactPanel").style.display = "none";
    editingContactId = null;
}


document.addEventListener("DOMContentLoaded", togglePasswordVisibility);
