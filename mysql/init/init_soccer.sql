
CREATE DATABASE IF NOT EXISTS soccer;

use soccer;

--
-- Table structure for table `TOURNAMENT`
--

DROP TABLE IF EXISTS `TOURNAMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TOURNAMENT` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `logo_img` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Table structure for table `TEAM`
--

DROP TABLE IF EXISTS `TEAM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TEAM` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `logo_img` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `TOUR_TEAMS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TOUR_TEAMS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `TOUR_ID` int DEFAULT NULL,
  `TEAM_ID` int DEFAULT NULL,
  `group_name` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `TOUR_ID` (`TOUR_ID`),
  KEY `TEAM_ID` (`TEAM_ID`),
  CONSTRAINT `TOUR_TEAMS_ibfk_1` FOREIGN KEY (`TOUR_ID`) REFERENCES `TOURNAMENT` (`id`),
  CONSTRAINT `TOUR_TEAMS_ibfk_2` FOREIGN KEY (`TEAM_ID`) REFERENCES `TEAM` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



DROP TABLE IF EXISTS `MATCHES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MATCHES` (
  `id` int NOT NULL AUTO_INCREMENT,
  `TEAM_A_ID` int DEFAULT NULL,
  `TEAM_B_ID` int DEFAULT NULL,
  `DAY` datetime DEFAULT NULL,
  `LOCATION` varchar(100) DEFAULT NULL,
  `SCORE_A` int DEFAULT NULL,
  `SCORE_B` int DEFAULT NULL,
  `TOUR_ID` int DEFAULT '1',
  `COMPLETED` varchar(1) DEFAULT 'N',
  PRIMARY KEY (`id`),
  KEY `TEAM_A_ID` (`TEAM_A_ID`),
  KEY `TEAM_B_ID` (`TEAM_B_ID`),
  CONSTRAINT `MATCHES_ibfk_1` FOREIGN KEY (`TEAM_A_ID`) REFERENCES `TEAM` (`id`),
  CONSTRAINT `MATCHES_ibfk_2` FOREIGN KEY (`TEAM_B_ID`) REFERENCES `TEAM` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `PREDICT_USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PREDICT_USER` (
  `userid` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `photo_img` varchar(100) DEFAULT NULL,
  `credential` blob,
  `role` varchar(20) NOT NULL DEFAULT 'user',
  `country` varchar(100) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `MATCH_PREDICT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MATCH_PREDICT` (
  `id` int NOT NULL AUTO_INCREMENT,
  `MATCH_ID` int DEFAULT NULL,
  `USERID` varchar(20) DEFAULT NULL,
  `SCORE_A` int DEFAULT NULL,
  `SCORE_B` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `MATCH_ID` (`MATCH_ID`,`USERID`),
  KEY `USERID` (`USERID`),
  CONSTRAINT `MATCH_PREDICT_ibfk_1` FOREIGN KEY (`MATCH_ID`) REFERENCES `MATCHES` (`id`),
  CONSTRAINT `MATCH_PREDICT_ibfk_2` FOREIGN KEY (`USERID`) REFERENCES `PREDICT_USER` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `TOURNAMENT` VALUES (1,'FIFA Worldcup 2026 - USA Mexico & Canada','FIFA Worldcup 2026 in USA, Canada and Mexico','fifa-2026-logo.png');

INSERT INTO `TEAM` VALUES (1,'USA','usa.png'),(2,'Portugal','portugal.png'),(3,'Mexico','mexico.png'),(4,'South Africa','southafrica.png'),(5,'South Korea','southkorea.png'),(6,'Czechia','czechia.png'),(7,'Canada','canada.png'),(8,'Bosnia-Herzegovinia','bosniaherzegovinia.png'),(9,'Qatar','qatar.png'),(10,'Switzerland','switzerland.png'),(11,'Brazil','brazil.png'),(12,'Morocco','morocco.png'),(13,'Haiti','haiti.png'),(14,'Scotland','scotland.png'),(15,'Paraguay','paraguay.png'),(16,'Australia','australia.png'),(17,'Turkey','turkey.png'),(18,'Germany','germany.png'),(19,'Curacao','curacao.png'),(20,'Ivory Coast','ivorycoast.png'),(21,'Ecuador','ecuador.png'),(22,'Netherlands','netherlands.png'),(23,'Japan','japan.png'),(24,'Sweden','sweden.png'),(25,'Tunisia','tunisia.png'),(26,'Belgium','belgium.png'),(27,'Egypt','egypt.png'),(28,'Iran','iran.png'),(29,'New Zealand','newzealand.png'),(30,'Spain','spain.png'),(31,'Cape Verde','capeverde.png'),(32,'Uruguay','uruguay.png'),(33,'Saudi Arabia','saudiarabia.png'),(34,'France','france.png'),(35,'Senegal','senegal.png'),(36,'Iraq','iraq.png'),(37,'Norway','norway.png'),(38,'Argentina','argentina.png'),(39,'Algeria','algeria.png'),(40,'Honduras','honduras.png'),(41,'Iceland','iceland.png'),(42,'Austria','austria.png'),(43,'Jordan','jordan.png'),(44,'Congo DR','congodr.png'),(45,'Colombia','colombia.png'),(46,'Uzbekistan','uzbekistan.png'),(47,'England','england.png'),(48,'Croatia','croatia.png'),(49,'Ghana','ghana.png'),(50,'Panama','panama.png');

INSERT INTO `TOUR_TEAMS` VALUES (1,1,3,'A'),(2,1,4,'A'),(3,1,5,'A'),(4,1,6,'A'),(5,1,7,'B'),(6,1,8,'B'),(7,1,9,'B'),(8,1,10,'B'),(9,1,11,'C'),(10,1,12,'C'),(11,1,13,'C'),(12,1,14,'C'),(13,1,1,'D'),(14,1,15,'D'),(15,1,16,'D'),(16,1,17,'D'),(17,1,18,'E'),(18,1,19,'E'),(19,1,20,'E'),(20,1,21,'E'),(22,1,22,'F'),(23,1,23,'F'),(24,1,24,'F'),(25,1,25,'F'),(26,1,26,'G'),(27,1,27,'G'),(28,1,28,'G'),(29,1,29,'G'),(30,1,30,'H'),(31,1,31,'H'),(32,1,33,'H'),(33,1,32,'H'),(34,1,34,'I'),(35,1,35,'I'),(36,1,36,'I'),(37,1,37,'I'),(38,1,38,'J'),(39,1,39,'J'),(40,1,42,'J'),(41,1,43,'J'),(42,1,2,'K'),(43,1,44,'K'),(44,1,45,'K'),(45,1,47,'L'),(46,1,46,'K'),(48,1,48,'L'),(49,1,49,'L'),(50,1,50,'L');

INSERT INTO `MATCHES` VALUES (1,3,4,'2026-06-11 19:00:00','Mexico City, Mexico',2,0,1,'Y'),(2,5,6,'2026-06-12 02:00:00','Guadalajara, Mexico',2,1,1,'Y'),(3,7,8,'2026-06-12 19:00:00','Toronto, Canada',NULL,NULL,1,'N'),(4,1,15,'2026-06-13 01:00:00','Los Angeles, USA',NULL,NULL,1,'N'),(5,9,10,'2026-06-13 22:00:00','San Francisco, USA',NULL,NULL,1,'N'),(6,11,12,'2026-06-13 22:00:00','New Jersey, USA',NULL,NULL,1,'N'),(7,13,14,'2026-06-14 01:00:00','Boston, USA',NULL,NULL,1,'N'),(8,16,17,'2026-06-14 04:00:00','Vancouver, Canada',NULL,NULL,1,'N'),(9,18,19,'2026-06-14 17:00:00','Houston, USA',NULL,NULL,1,'N'),(10,22,23,'2026-06-14 20:00:00','Dallas, USA',NULL,NULL,1,'N'),(11,20,21,'2026-06-14 23:00:00','Philadelphia, USA',NULL,NULL,1,'N'),(12,24,25,'2026-06-15 02:00:00','Guadalupe, Mexico',NULL,NULL,1,'N'),(13,30,31,'2026-06-15 16:00:00','Atlanta, USA',NULL,NULL,1,'N'),(14,26,27,'2026-06-15 19:00:00','Seattle, USA',NULL,NULL,1,'N'),(15,33,32,'2026-06-15 22:00:00','Miami, USA',NULL,NULL,1,'N'),(16,28,29,'2026-06-16 01:00:00','Los Angeles, USA',NULL,NULL,1,'N'),(17,34,35,'2026-06-16 19:00:00','New Jersey, USA',NULL,NULL,1,'N'),(18,36,37,'2026-06-16 22:00:00','Boston, USA',NULL,NULL,1,'N'),(19,38,39,'2026-06-17 01:00:00','Kansas City, USA',NULL,NULL,1,'N'),(20,42,43,'2026-06-17 04:00:00','San Francisco, USA',NULL,NULL,1,'N'),(21,2,44,'2026-06-17 17:00:00','Houston, USA',NULL,NULL,1,'N'),(22,47,48,'2026-06-17 20:00:00','Dallas, USA',NULL,NULL,1,'N'),(23,49,50,'2026-06-17 23:00:00','Toronto, Canada',NULL,NULL,1,'N'),(24,46,45,'2026-06-18 02:00:00','Mexico City, Mexico',NULL,NULL,1,'N');

INSERT INTO `PREDICT_USER` VALUES ('admin','Administrator',NULL,NULL,_binary '$2b$10$1H92Mx129TRXxx6t6VGFHuyXJmnbWxTvmajeW2gFVjilu/X/31Uf2','admin',NULL,NULL),('ananthy','Anantharajah T',NULL,NULL,_binary '$2b$10$5MY8sVilvCOxrjsy9h1R1eq0lXYpGc9y2Z.a8OO04MzgxGjSLeiYu','user','Canada','::1'),('janagan','Janagan Kula',NULL,NULL,NULL,'user','Canada','192.168.65.1'),('kuddy','John Pathmakumar',NULL,NULL,_binary '$2b$10$poVZrQoBWxbaIqE.6bDTw..GYMPCAvAU2rx7kEPSbBx3M7.wo6kOW','user','Norway','192.168.65.1'),('rooban','Kumararooban Thiru',NULL,NULL,_binary '$2b$10$RnDJKzZ13jTLWEFatn521OxZuh/z5pjZc8m5BuhqcRqhXSSp.WU2y','user','England','192.168.65.1'),('shanthan','Shanthakumar S',NULL,NULL,_binary '$2b$10$0BjkqB3HMwPSIdh4Mj0oueuIrkS5PZxZc/.A.W1dyYbvybAUE/dnO','user','England','::1'),('thasan','Thasan Sinnarajah',NULL,NULL,_binary '$2b$10$n95jGr3ULEkybAkSEXmXvOE2epo6aC9BA4fPw6XaFOg3cZfqRUVHm','user','Canada','::1'),('thiagsu','Sukumar T',NULL,NULL,_binary '$2b$10$phjJoTCSnwiJG84HSexg/OXs4.eWqjwhm84BQegjtmk/rPxkt.Imq','user','USA','::1');

INSERT INTO `MATCH_PREDICT` VALUES (5,1,'kuddy',2,1),(6,2,'kuddy',1,1),(7,1,'thiagsu',3,1),(8,2,'thiagsu',1,1),(9,1,'thasan',2,3),(10,2,'thasan',2,1),(11,1,'ananthy',2,1),(12,2,'ananthy',1,1),(13,1,'shanthan',2,0),(14,3,'thiagsu',2,2),(15,4,'thiagsu',2,1),(16,3,'ananthy',1,1),(17,4,'ananthy',1,1),(18,3,'shanthan',1,1),(19,4,'shanthan',2,1),(20,3,'thasan',2,1),(21,4,'thasan',2,0);





