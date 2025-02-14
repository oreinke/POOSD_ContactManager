# DB commands

### database
```
CREATE database contact_manager;
USE contact_manager;
```

### tables
```
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE contacts (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    userid INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
) ENGINE = InnoDB;
```

### testing
temp user and contacts for testing purposes
```
INSERT INTO users (username, password) 
VALUES ('testuser1', 'test1');

INSERT INTO users (username, password) 
VALUES ('testuser2', 'test2');

INSERT INTO users (username, password) 
VALUES ('testuser3', 'test3');
```
```
INSERT INTO contacts (userid, first_name, last_name, email) VALUES
(1, 'Alice', 'Johnson', 'alice.johnson@example.com'),
(1, 'Bob', 'Smith', 'bob.smith@example.com'),
(1, 'Charlie', 'Davis', 'charlie.davis@example.com'),
(1, 'David', 'White', 'david.white@example.com'),
(1, 'Emma', 'Brown', 'emma.brown@example.com');

INSERT INTO contacts (userid, first_name, last_name, email) VALUES
(2, 'Frank', 'Wilson', 'frank.wilson@example.com'),
(2, 'Grace', 'Moore', 'grace.moore@example.com'),
(2, 'Henry', 'Taylor', 'henry.taylor@example.com'),
(2, 'Isabella', 'Anderson', 'isabella.anderson@example.com'),
(2, 'Jack', 'Thomas', 'jack.thomas@example.com');

INSERT INTO contacts (userid, first_name, last_name, email) VALUES
(3, 'Katherine', 'White', 'katherine.white@example.com'),
(3, 'Liam', 'Harris', 'liam.harris@example.com'),
(3, 'Mia', 'Martin', 'mia.martin@example.com'),
(3, 'Noah', 'Thompson', 'noah.thompson@example.com'),
(3, 'Olivia', 'Garcia', 'olivia.garcia@example.com');
```

### query commands
```
show tables;
```
```
select * from users;
```
```
select * from contacts;
```
```
select * from contacts where username = 'testuser1';
```

### dba user
```
CREATE USER 'dba'@'%' IDENTIFIED BY 'dbapass';
GRANT ALL PRIVILEGES ON contact_manager.* TO 'dba'@'%';
```

### php commands
#### login
login dba
```
$conn = new mysqli("localhost", "dba", "dbapass", "contact_manager");
```
#### user commands
takes id from corresponding username and password combination
```
$sql = "SELECT id FROM users WHERE username=? AND password =?";
```
add users
```
$sql = "INSERT into users (username, password) VALUES(?,?)";
```
#### contact commands
select name and email from contacts based on certain userid
```
$sql = "SELECT id, first_name, last_name, email FROM contacts where userid=?";
```
delete a contact
```
$sql = "DELETE FROM contacts WHERE id=?";
```
update a contact
```
$sql = "UPDATE contacts SET first_name='?', SET last_name='?', SET email='?'  WHERE id=?";
```