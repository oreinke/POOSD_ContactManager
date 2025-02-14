# DB commands

### database
```
CREATE database contact_manager;
USE contact_manager;
```

### tables
```
CREATE TABLE users (
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE contacts (
    username VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
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
INSERT INTO contacts (username, first_name, last_name, email) VALUES
('testuser1', 'Alice', 'Johnson', 'alice.johnson@example.com'),
('testuser1', 'Bob', 'Smith', 'bob.smith@example.com'),
('testuser1', 'Charlie', 'Davis', 'charlie.davis@example.com'),
('testuser1', 'David', 'White', 'david.white@example.com'),
('testuser1', 'Emma', 'Brown', 'emma.brown@example.com');

INSERT INTO contacts (username, first_name, last_name, email) VALUES
('testuser2', 'Frank', 'Wilson', 'frank.wilson@example.com'),
('testuser2', 'Grace', 'Moore', 'grace.moore@example.com'),
('testuser2', 'Henry', 'Taylor', 'henry.taylor@example.com'),
('testuser2', 'Isabella', 'Anderson', 'isabella.anderson@example.com'),
('testuser2', 'Jack', 'Thomas', 'jack.thomas@example.com');

INSERT INTO contacts (username, first_name, last_name, email) VALUES
('testuser3', 'Katherine', 'White', 'katherine.white@example.com'),
('testuser3', 'Liam', 'Harris', 'liam.harris@example.com'),
('testuser3', 'Mia', 'Martin', 'mia.martin@example.com'),
('testuser3', 'Noah', 'Thompson', 'noah.thompson@example.com'),
('testuser3', 'Olivia', 'Garcia', 'olivia.garcia@example.com');
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