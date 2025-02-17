const urlBase = 'https://www.whenthe.cc/API';
const extension = 'php';

let userId = 0;
let first_name = "";
let last_name = "";

function doLogin()
{
    userId = 0;
    first_name = "";
    last_name = "";

    let login = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    document.getElementById("loginResult").innerHTML = "";

    let tmp = { username: login, password: password };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/login.' + extension;

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
                userId = jsonObject.id;

                if (userId < 1) 
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
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = "first_name=" + first_name + ",last_name=" + last_name + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
    userId = -1;
    let data = document.cookie;
    let splits = data.split(",");

    for (var i = 0; i < splits.length; i++) 
    {
        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");
        if (tokens[0] == "first_name") 
        {
            first_name = tokens[1];
        }
        else if (tokens[0] == "last_name") 
        {
            last_name = tokens[1];
        }
        else if (tokens[0] == "userId") 
        {
            userId = parseInt(tokens[1].trim());
        }
    }

    if (userId < 0) 
    {
        window.location.href = "index.html";
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
    let firstName = document.getElementById("contactFirstName").value;
    let lastName = document.getElementById("contactLastName").value;
    let email = document.getElementById("contactEmail").value;
    
    let tmp = { userId: userId, first_name: firstName, last_name: lastName, email: email };
    let jsonPayload = JSON.stringify(tmp);
    
    let url = urlBase + '/addcontact.' + extension;
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                alert("Contact added successfully!");
                searchContacts(); // Refresh contact list
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        alert(err.message);
    }
}

// 🔹 Search Contacts
function searchContacts()
{
    let srch = document.getElementById("searchText").value;
    let tmp = { search: srch, userId: userId };
    let jsonPayload = JSON.stringify(tmp);
    
    let url = urlBase + '/searchcontacts.' + extension;
    
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
                let contactList = document.getElementById("contactList");
                contactList.innerHTML = "";

                if (jsonObject.results.length == 0) 
                {
                    contactList.innerHTML = "No contacts found.";
                    return;
                }

                jsonObject.results.forEach(contact => {
                    let entry = document.createElement("div");
                    entry.innerHTML = `
                        <p>${contact.first_name} ${contact.last_name} - ${contact.email}</p>
                        <button onclick="deleteContact(${contact.id})">Delete</button>
                        <button onclick="editContact(${contact.id}, '${contact.first_name}', '${contact.last_name}', '${contact.email}')">Edit</button>
                    `;
                    contactList.appendChild(entry);
                });
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        alert(err.message);
    }
}

// 🔹 Delete Contact
function deleteContact(contactId)
{
    let tmp = { id: contactId, userId: userId };
    let jsonPayload = JSON.stringify(tmp);
    
    let url = urlBase + '/deletecontact.' + extension;
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                alert("Contact deleted successfully!");
                searchContacts(); // Refresh contact list
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        alert(err.message);
    }
}

// 🔹 Edit Contact
function editContact(contactId, firstName, lastName, email)
{
    let newFirstName = prompt("Enter new first name:", firstName);
    let newLastName = prompt("Enter new last name:", lastName);
    let newEmail = prompt("Enter new email:", email);
    
    if (!newFirstName || !newLastName || !newEmail) return;

    let tmp = { id: contactId, userId: userId, first_name: newFirstName, last_name: newLastName, email: newEmail };
    let jsonPayload = JSON.stringify(tmp);
    
    let url = urlBase + '/editcontacts.' + extension;
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                alert("Contact updated successfully!");
                searchContacts(); // Refresh contact list
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        alert(err.message);
    }
}

