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
INSERT INTO voters (document, name, lastName, date_of_birth, is_candidate) VALUES
('1111111', 'Jon', 'Nieves', '1985-05-12', 0),
('2222222', 'María', 'Torres', '1990-09-23', 0),
('3333333', 'Carlos', 'Rodríguez', '1978-03-18', 0),
('4444444', 'Ana', 'Martínez', '1992-11-05', 0),
('5555555', 'Pedro', 'Sánchez', '1983-07-30', 0),
('6666666', 'Laura', 'González', '1988-12-15', 0),
('7777777', 'Miguel', 'Fernández', '1975-01-20', 0),
('8888888', 'Sofía', 'Torres', '1995-06-08', 0);

-- CANDIDATES (2)
INSERT INTO voters (document, name, lastName, date_of_birth, is_candidate) VALUES
('9999999', 'Elena', 'Ramírez', '1980-04-25', 1),
('1010101', 'David', 'Moreno', '1982-08-10', 1);

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