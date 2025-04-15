DROP DATABASE IF EXISTS voting_system;
CREATE DATABASE voting_system;
USE voting_system;

-- ADMINS
CREATE TABLE admins (
    admin_id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (admin_id),
    UNIQUE INDEX idx_admin_email (email)
);

-- VOTERS
CREATE TABLE voters (
    voter_id INT(11) NOT NULL AUTO_INCREMENT,
    document VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    direction VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    sex ENUM('M', 'F') NOT NULL,
    is_candidate TINYINT NOT NULL DEFAULT 0,
    PRIMARY KEY (voter_id),
    UNIQUE INDEX idx_voter_email (document)
);

-- VOTES
CREATE TABLE votes (
    vote_id INT NOT NULL AUTO_INCREMENT,
    voter_id INT NOT NULL,
    candidate_id INT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (vote_id),
    INDEX idx_vote_candidate (candidate_id),
    UNIQUE INDEX idx_vote_voter (voter_id),
    FOREIGN KEY (voter_id) REFERENCES voters(voter_id) ON DELETE RESTRICT,
    FOREIGN KEY (candidate_id) REFERENCES voters(voter_id) ON DELETE RESTRICT
);

-- Admins
INSERT INTO admins (name, lastName, email, password) VALUES 
('Admin', 'System', 'admin@votingsystem.com', '$2y$10$8sA7AMhNvSqevrnT.lx8puQe.6vXQYo5A3vx1YpdYEkW3vF/vGX/O');

-- VOTERS (8)
INSERT INTO voters (document, name, lastName, date_of_birth, direction, phone, sex, is_candidate) VALUES
('1234567', 'Juan', 'Pérez', '1990-01-15', 'Calle 1', '555-1234', 'M', 0),
('2345678', 'María', 'Gómez', '1985-02-20', 'Calle 2', '555-5678', 'F', 0),
('3456789', 'Carlos', 'López', '1992-03-30', 'Calle 3', '555-8765', 'M', 0),
('4567890', 'Ana', 'Martínez', '1988-04-10', 'Calle 4', '555-4321', 'F', 0),
('5678901', 'Luis', 'Hernández', '1995-05-05', 'Calle 5', '555-1357', 'M', 0),
('6789012', 'Sofía', 'Díaz', '1993-06-15', 'Calle 6', '555-2468', 'F', 0),
('7890123', 'Javier', 'Torres', '1987-07-20', 'Calle 7', '555-3579', 'M', 0),
('8901234', 'Lucía', 'Ramírez', '1991-08-25', 'Calle 8', '555-4680','F' , 0);


-- CANDIDATES (2)
INSERT INTO voters (document, name, lastName, date_of_birth, direction, phone, sex, is_candidate) VALUES
('1111111', 'Jon', 'Snow', '1980-09-30', 'The Wall', '555-1111', 'M', 1),
('2222222', 'Laura', 'Fernández', '1986-10-15', 'Calle 10', '555-2222', 'F', 1);

-- VOTES (8)
INSERT INTO votes (voter_id, candidate_id) VALUES
(4, 9),
(5, 10),
(6, 9),
(7, 10),
(8, 9);

-- CANDIDATE VOTES VIEW
CREATE VIEW candidate_votes AS
SELECT 
    v.voter_id AS candidate_id,
    v.name AS candidate_name,
    v.lastName AS candidate_last_name,
    COUNT(vt.vote_id) AS vote_count
FROM 
    voters v
LEFT JOIN 
    votes vt ON v.voter_id = vt.candidate_id
WHERE 
    v.is_candidate = 1
GROUP BY 
    v.voter_id, v.name, v.lastName
ORDER BY 
    vote_count DESC;