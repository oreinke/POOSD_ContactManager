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
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    login VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE contacts (
    id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE = InnoDB;
```

### testing
temp user and contacts for testing purposes
```
INSERT INTO users (first_name, last_name, login, password) 
VALUES ('testuser1', 'unknown', 'test1', 'test1');

INSERT INTO users (first_name, last_name, login, password) 
VALUES ('testuser2', 'unknown', 'test2', 'test2');

INSERT INTO users (first_name, last_name, login, password) 
VALUES ('testuser3', 'unknown', 'test3', 'test3');
```
```
INSERT INTO contacts (id, first_name, last_name, email) VALUES
(1, 'Alice', 'Johnson', 'alice.johnson@example.com'),
(1, 'Bob', 'Smith', 'bob.smith@example.com'),
(1, 'Charlie', 'Davis', 'charlie.davis@example.com'),
(1, 'David', 'White', 'david.white@example.com'),
(1, 'Emma', 'Brown', 'emma.brown@example.com');

INSERT INTO contacts (id, first_name, last_name, email) VALUES
(2, 'Frank', 'Wilson', 'frank.wilson@example.com'),
(2, 'Grace', 'Moore', 'grace.moore@example.com'),
(2, 'Henry', 'Taylor', 'henry.taylor@example.com'),
(2, 'Isabella', 'Anderson', 'isabella.anderson@example.com'),
(2, 'Jack', 'Thomas', 'jack.thomas@example.com');

INSERT INTO contacts (id, first_name, last_name, email) VALUES
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
select * from contacts
```
```
select * from contacts where id = 1;
```

### dba user
```
CREATE USER 'dba'@'%' IDENTIFIED BY 'dbapass';
GRANT ALL PRIVILEGES ON contact_manager.* TO 'dba'@'%';
```