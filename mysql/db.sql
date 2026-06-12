CREATE TABLE TEAM (
   id int NOT NULL AUTO_INCREMENT,
   name varchar(100) DEFAULT NULL,
   logo_img varchar(100) DEFAULT NULL,
   PRIMARY KEY (id)
);

CREATE TABLE TOURNAMENT (
   id int NOT NULL AUTO_INCREMENT,
   name varchar(100) DEFAULT NULL,
   description varchar(500) DEFAULT NULL,
   logo_img varchar(100) DEFAULT NULL,
   PRIMARY KEY (id)
);

CREATE TABLE MATCHES (
   id int NOT NULL AUTO_INCREMENT,
   TOUR_ID int DEFAULT NULL,
   TEAM_A_ID int DEFAULT NULL,
   TEAM_B_ID int DEFAULT NULL,
   DAY date DEFAULT NULL,
   LOCATION varchar(100) DEFAULT NULL,
   SCORE_A int DEFAULT NULL,
   SCORE_B int DEFAULT NULL,
   PRIMARY KEY (id),
   KEY TOUR_ID (TOUR_ID),
   KEY TEAM_A_ID (TEAM_A_ID),
   KEY TEAM_B_ID (TEAM_B_ID),
   CONSTRAINT MATCHES_ibfk_0 FOREIGN KEY (TOUR_ID) REFERENCES TOURNAMENT (id),
   CONSTRAINT MATCHES_ibfk_1 FOREIGN KEY (TEAM_A_ID) REFERENCES TEAM (id),
   CONSTRAINT MATCHES_ibfk_2 FOREIGN KEY (TEAM_B_ID) REFERENCES TEAM (id)
);


CREATE TABLE TOUR_TEAMS (
id int NOT NULL AUTO_INCREMENT,
TOUR_ID int DEFAULT NULL,
TEAM_ID int DEFAULT NULL,
GROUP_NAME varchar(50) DEFAULT NULL,
PRIMARY KEY (id),
KEY TOUR_ID (TOUR_ID),
KEY TEAM_ID (TEAM_ID),
CONSTRAINT TOUR_TEAMS_ibfk_1 FOREIGN KEY (TOUR_ID) REFERENCES TOURNAMENT (id),
CONSTRAINT TOUR_TEAMS_ibfk_2 FOREIGN KEY (TEAM_ID) REFERENCES TEAM (id)
);

CREATE TABLE PREDICT_USER (
Userid varchar(20) NOT NULL,
name varchar(100) DEFAULT NULL,
email varchar(100) DEFAULT NULL,
photo_img varchar(100) DEFAULT NULL,
role varchar(20) NOT NULL DEFAULT 'user',
country varchar(100) DEFAULT NULL,
ip_address varchar(45) DEFAULT NULL,
credential blob,
PRIMARY KEY (Userid)
);

CREATE TABLE MATCH_PREDICT (
 id int NOT NULL AUTO_INCREMENT,
 MATCH_ID int DEFAULT NULL,
 USERID varchar(20) DEFAULT NULL,
 SCORE_A int DEFAULT NULL,
 SCORE_B int DEFAULT NULL,
 PRIMARY KEY (id),
 UNIQUE KEY MATCH_ID (MATCH_ID,USERID),
 KEY USERID (USERID),
 CONSTRAINT MATCH_PREDICT_ibfk_1 FOREIGN KEY (MATCH_ID)
     REFERENCES MATCHES (id),
 CONSTRAINT MATCH_PREDICT_ibfk_2 FOREIGN KEY (USERID)
     REFERENCES PREDICT_USER (Userid)
);

-- Seed data
INSERT INTO TEAM (id, name, logo_img) VALUES
    (1, 'USA',         'https://via.placeholder.com/50'),
    (2, 'Paraguay',    'https://via.placeholder.com/50'),
    (3, 'Canada',      'https://via.placeholder.com/50'),
    (4, 'South Korea', 'https://via.placeholder.com/50');

INSERT INTO MATCHES (TEAM_A_ID, TEAM_B_ID, DAY, LOCATION, SCORE_A, SCORE_B) VALUES
    (1, 2, '2026-06-11 18:00:00', 'New Jersey', NULL, NULL),
    (3, 4, '2026-06-11 21:00:00', 'Georgia',    NULL, NULL);

-- Default admin (userId: admin / password: admin) — change after first login
INSERT INTO PREDICT_USER (Userid, name, email, photo_img, role, credential) VALUES
    ('admin', 'Administrator', NULL, NULL, 'admin',
     '$2b$10$hhgPdpzEiqZO4boYQDvcP.rqoynZQZCmlYL1l0TBSiFd.pCSXHxou');

