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
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE = InnoDB;
```

### testing
temp user and contacts for testing purposes
```
INSERT INTO users (first_name, last_name, login, password) 
VALUES ('testuser', 'unknown', 'test', 'test');

INSERT INTO contacts (user_id, first_name, last_name, email) VALUES
(1, 'Alice', 'Johnson', 'alice.johnson@example.com'),
(1, 'Bob', 'Smith', 'bob.smith@example.com'),
(1, 'Charlie', 'Davis', 'charlie.davis@example.com'),
(1, 'David', 'White', 'david.white@example.com'),
(1, 'Emma', 'Brown', 'emma.brown@example.com');
```

### dba user
```
CREATE USER 'dba'@'%' IDENTIFIED BY 'dbapass';
GRANT ALL PRIVILEGES ON contact_manager.* TO 'dba'@'%';
```