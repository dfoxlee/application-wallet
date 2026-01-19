CREATE DATABASE IF NOT EXISTS application_wallet;

USE application_wallet;

GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'%' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS user (
   user_number INT AUTO_INCREMENT PRIMARY KEY,
   email VARCHAR(255) NOT NULL UNIQUE,
   hashed_password VARCHAR(500) NOT NULL,
   token VARCHAR(500),
   created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS application (
   application_number INT AUTO_INCREMENT PRIMARY KEY,
   user_number INT,
   title VARCHAR(255) NOT NULL,
   company VARCHAR(255),
   description TEXT,
   CONSTRAINT FK_application_user_number FOREIGN KEY (user_number) REFERENCES user(user_number)
);

CREATE TABLE IF NOT EXISTS event (
   event_number INT AUTO_INCREMENT PRIMARY KEY,
   application_number INT,
   event_type INT NOT NULL,
   event_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   notes TEXT,
   CONSTRAINT FK_event_application_number FOREIGN KEY (application_number) REFERENCES application(application_number)
);

CREATE TABLE IF NOT EXISTS ref_code_domain (
   ref_code_domain_number INT AUTO_INCREMENT PRIMARY KEY,
   ref_code_domain_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS ref_code (
   ref_code_number INT AUTO_INCREMENT PRIMARY KEY,
   ref_code_domain INT NOT NULL,
   ref_code_value VARCHAR(255) NOT NULL,
   CONSTRAINT FK_ref_code_domain_number FOREIGN KEY (ref_code_domain) REFERENCES ref_code_domain(ref_code_domain_number)
);

INSERT INTO ref_code_domain (ref_code_domain_name) VALUES
('Application Events');

INSERT INTO ref_code (ref_code_domain, ref_code_value) VALUES
(1, 'Applied'),
(1, 'Callback'),
(1, 'Interviewing'),
(1, 'Offer'),
(1, 'Rejected'),
(1, 'Accepted'),
(1, 'Declined');