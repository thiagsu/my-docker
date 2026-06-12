-- MySQL dump 10.13  Distrib 9.7.0, for Linux (aarch64)
--
-- Host: localhost    Database: puzzle
-- ------------------------------------------------------
-- Server version	9.7.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '6e61db9b-643e-11f1-9b7a-ae489fb1d386:1-78';

--
-- Current Database: `puzzle`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `puzzle` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `puzzle`;

--
-- Table structure for table `CURR_GAME`
--

DROP TABLE IF EXISTS `CURR_GAME`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CURR_GAME` (
  `id` int NOT NULL AUTO_INCREMENT,
  `game_id` int DEFAULT NULL,
  `puzzle_id` int DEFAULT NULL,
  `game_day` date DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `grid_size` int DEFAULT '6',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_game_day` (`game_day`),
  KEY `game_id` (`game_id`),
  CONSTRAINT `CURR_GAME_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `GAME` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CURR_GAME`
--

LOCK TABLES `CURR_GAME` WRITE;
/*!40000 ALTER TABLE `CURR_GAME` DISABLE KEYS */;
INSERT INTO `CURR_GAME` VALUES (2,3,632,'2026-06-11','2026-06-10 19:57:50',6);
/*!40000 ALTER TABLE `CURR_GAME` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GAME`
--

DROP TABLE IF EXISTS `GAME`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GAME` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `grid_size` int DEFAULT '6',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_game` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GAME`
--

LOCK TABLES `GAME` WRITE;
/*!40000 ALTER TABLE `GAME` DISABLE KEYS */;
INSERT INTO `GAME` VALUES (1,'Zip','A puzzle game where players fill in a grid with numbers based on given clues.',8),(2,'Tango','A puzzle game where players fill in a grid with full moon and half moon symbols based on given clues.',6),(3,'Queen','A puzzle game where players fill in a grid with Crown of Queen based on given clues.',9);
/*!40000 ALTER TABLE `GAME` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GAME_CELLS`
--

DROP TABLE IF EXISTS `GAME_CELLS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GAME_CELLS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `game_id` int NOT NULL,
  `puzzle_id` int NOT NULL,
  `row_num` int NOT NULL,
  `col_num` int NOT NULL,
  `value` int DEFAULT NULL,
  `right_rel` int DEFAULT NULL,
  `left_rel` int DEFAULT NULL,
  `top_rel` int DEFAULT NULL,
  `bottom_rel` int DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `puzzle_id` (`puzzle_id`,`game_id`,`row_num`,`col_num`),
  KEY `game_id` (`game_id`),
  CONSTRAINT `GAME_CELLS_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `GAME` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GAME_CELLS`
--

LOCK TABLES `GAME_CELLS` WRITE;
/*!40000 ALTER TABLE `GAME_CELLS` DISABLE KEYS */;
INSERT INTO `GAME_CELLS` VALUES (1,3,632,0,1,NULL,NULL,NULL,NULL,NULL,'#fad2e1'),(2,3,632,2,4,NULL,NULL,NULL,NULL,NULL,'#fde2e4'),(3,3,632,3,1,NULL,NULL,NULL,NULL,NULL,'#e2ece9'),(4,3,632,4,1,NULL,NULL,NULL,NULL,NULL,'#e2ece9'),(5,3,632,4,2,NULL,NULL,NULL,NULL,NULL,'#fde2e4'),(6,3,632,4,3,NULL,NULL,NULL,NULL,NULL,'#fde2e4'),(7,3,632,5,1,NULL,NULL,NULL,NULL,NULL,'#fde2e4'),(8,3,632,5,2,NULL,NULL,NULL,NULL,NULL,'#fad2e1'),(9,3,632,5,3,NULL,NULL,NULL,NULL,NULL,'#fad2e1'),(10,3,632,5,4,NULL,NULL,NULL,NULL,NULL,'#fad2e1'),(11,3,632,5,5,NULL,NULL,NULL,NULL,NULL,'#fad2e1');
/*!40000 ALTER TABLE `GAME_CELLS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `soccer`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `soccer` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `soccer`;

--
-- Table structure for table `MATCHES`
--

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
  PRIMARY KEY (`id`),
  KEY `TEAM_A_ID` (`TEAM_A_ID`),
  KEY `TEAM_B_ID` (`TEAM_B_ID`),
  CONSTRAINT `MATCHES_ibfk_1` FOREIGN KEY (`TEAM_A_ID`) REFERENCES `TEAM` (`id`),
  CONSTRAINT `MATCHES_ibfk_2` FOREIGN KEY (`TEAM_B_ID`) REFERENCES `TEAM` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

ALTER TABLE `MATCHES` 
ADD COLUMN `COMPLETED` VARCHAR(1) NULL DEFAULT 'N' AFTER `TOUR_ID`;

--
-- Dumping data for table `MATCHES`
--

LOCK TABLES `MATCHES` WRITE;
/*!40000 ALTER TABLE `MATCHES` DISABLE KEYS */;
INSERT INTO `MATCHES` VALUES (1,3,4,'2026-06-11 15:00:00','Mexico City, Mexico',NULL,NULL,1),(2,5,6,'2026-06-11 22:00:00','Guadalajara, Mexico',NULL,NULL,1),(3,7,8,'2026-06-12 15:00:00','Toronto, Canada',NULL,NULL,1),(4,1,15,'2026-06-12 21:00:00','Los Angeles, USA',NULL,NULL,1),(5,9,10,'2026-06-13 18:00:00','San Francisco, USA',NULL,NULL,1),(6,11,12,'2026-06-13 18:00:00','New Jersey, USA',NULL,NULL,1),(7,13,14,'2026-06-13 21:00:00','Boston, USA',NULL,NULL,1),(8,16,17,'2026-06-14 00:00:00','Vancouver, Canada',NULL,NULL,1),(9,18,19,'2026-06-14 13:00:00','Houston, USA',NULL,NULL,1),(10,22,23,'2026-06-14 16:00:00','Dallas, USA',NULL,NULL,1),(11,20,21,'2026-06-14 19:00:00','Philadelphia, USA',NULL,NULL,1),(12,24,25,'2026-06-14 22:00:00','Guadalupe, Mexico',NULL,NULL,1),(13,30,31,'2026-06-15 12:00:00','Atlanta, USA',NULL,NULL,1),(14,26,27,'2026-06-15 15:00:00','Seattle, USA',NULL,NULL,1),(15,33,32,'2026-06-15 18:00:00','Miami, USA',NULL,NULL,1),(16,28,29,'2026-06-15 21:00:00','Los Angeles, USA',NULL,NULL,1),(17,34,35,'2026-06-16 15:00:00','New Jersey, USA',NULL,NULL,1),(18,36,37,'2026-06-16 18:00:00','Boston, USA',NULL,NULL,1),(19,38,39,'2026-06-16 21:00:00','Kansas City, USA',NULL,NULL,1),(20,42,43,'2026-06-17 00:00:00','San Francisco, USA',NULL,NULL,1),(21,2,44,'2026-06-17 13:00:00','Houston, USA',NULL,NULL,1),(22,47,48,'2026-06-17 16:00:00','Dallas, USA',NULL,NULL,1),(23,49,50,'2026-06-17 19:00:00','Toronto, Canada',NULL,NULL,1),(24,46,45,'2026-06-17 22:00:00','Mexico City, Mexico',NULL,NULL,1);
/*!40000 ALTER TABLE `MATCHES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MATCH_PREDICT`
--

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MATCH_PREDICT`
--

LOCK TABLES `MATCH_PREDICT` WRITE;
/*!40000 ALTER TABLE `MATCH_PREDICT` DISABLE KEYS */;
INSERT INTO `MATCH_PREDICT` VALUES (1,3,'testuser',2,1),(2,1,'testuser',3,1),(3,1,'admin',3,1),(4,2,'admin',1,1);
/*!40000 ALTER TABLE `MATCH_PREDICT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PREDICT_USER`
--

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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PREDICT_USER`
--

LOCK TABLES `PREDICT_USER` WRITE;
/*!40000 ALTER TABLE `PREDICT_USER` DISABLE KEYS */;
INSERT INTO `PREDICT_USER` VALUES ('admin','Administrator',NULL,NULL,_binary '$2b$10$1H92Mx129TRXxx6t6VGFHuyXJmnbWxTvmajeW2gFVjilu/X/31Uf2','admin',NULL,NULL),('myuser','Mika David','mkdavid@myco.com',NULL,NULL,'user',NULL,NULL),('myuser1','Test',NULL,NULL,NULL,'user','Canda','127.0.0.1'),('testuser','Santosh Premnath','santosh.prem@abc.com','santosh.png',_binary '$2b$10$2fCYAEy5fWpJ2HtRX45XzOK5gI8Tu9yekWbex8dbaYXWkNGJMosl2','user',NULL,NULL);
/*!40000 ALTER TABLE `PREDICT_USER` ENABLE KEYS */;
UNLOCK TABLES;

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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TEAM`
--

LOCK TABLES `TEAM` WRITE;
/*!40000 ALTER TABLE `TEAM` DISABLE KEYS */;
INSERT INTO `TEAM` VALUES (1,'USA','usa.png'),(2,'Portugal','portugal.png'),(3,'Mexico','mexico.png'),(4,'South Africa','south-africa.png'),(5,'South Korea','south-korea.png'),(6,'Czechia','czechia.png'),(7,'Canada','canada.png'),(8,'Bosnia-Herzegovinia','bosnia-herzegovinia.png'),(9,'Qatar','qatar.png'),(10,'Switzerland','switzerland.png'),(11,'Brazil','brazil.png'),(12,'Morocco','morocco.png'),(13,'Haiti','haiti.png'),(14,'Scotland','scotland.png'),(15,'Paraguay','paraguay.png'),(16,'Australia','australia.png'),(17,'Turkey','turkey.png'),(18,'Germany','germany.png'),(19,'Curacao','curacao.png'),(20,'Ivory Coast','ivory_coast.png'),(21,'Ecuador','ecuador.png'),(22,'Netherlands','netherlands.png'),(23,'Japan','japan.png'),(24,'Sweden','sweden.png'),(25,'Tunisia','tunisia.png'),(26,'Belgium','belgium.png'),(27,'Egypt','egypt.png'),(28,'Iran','iran.png'),(29,'New Zealand','new_zealand.png'),(30,'Spain','spain.png'),(31,'Cape Verde','cape_verde.png'),(32,'Uruguay','uruguay.png'),(33,'Saudi Arabia','saudi_arabia.png'),(34,'France','france.png'),(35,'Senegal','senegal.png'),(36,'Iraq','iraq.png'),(37,'Norway','norway.png'),(38,'Argentina','argentina.png'),(39,'Algeria','algeria.png'),(40,'Honduras','honduras.png'),(41,'Iceland','iceland.png'),(42,'Austria','austria.png'),(43,'Jordan','jordan.png'),(44,'Congo DR','congo_dr.png'),(45,'Colombia','colombia.png'),(46,'Uzbekistan','uzbekistan.png'),(47,'England','england.png'),(48,'Croatia','croatia.png'),(49,'Ghana','ghana.png'),(50,'Panama','panama.png');
/*!40000 ALTER TABLE `TEAM` ENABLE KEYS */;
UNLOCK TABLES;

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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TOURNAMENT`
--

LOCK TABLES `TOURNAMENT` WRITE;
/*!40000 ALTER TABLE `TOURNAMENT` DISABLE KEYS */;
INSERT INTO `TOURNAMENT` VALUES (1,'FIFA Worldcup 2026 - USA Mexico & Canada','FIFA Worldcup 2026 in USA, Canada and Mexico','fifa-2026-logo.png');
/*!40000 ALTER TABLE `TOURNAMENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TOUR_TEAMS`
--

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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TOUR_TEAMS`
--

LOCK TABLES `TOUR_TEAMS` WRITE;
/*!40000 ALTER TABLE `TOUR_TEAMS` DISABLE KEYS */;
INSERT INTO `TOUR_TEAMS` VALUES (1,1,3,'A'),(2,1,4,'A'),(3,1,5,'A'),(4,1,6,'A'),(5,1,7,'B'),(6,1,8,'B'),(7,1,9,'B'),(8,1,10,'B'),(9,1,11,'C'),(10,1,12,'C'),(11,1,13,'C'),(12,1,14,'C'),(13,1,1,'D'),(14,1,15,'D'),(15,1,16,'D'),(16,1,17,'D'),(17,1,18,'E'),(18,1,19,'E'),(19,1,20,'E'),(20,1,21,'E'),(22,1,22,'F'),(23,1,23,'F'),(24,1,24,'F'),(25,1,25,'F'),(26,1,26,'G'),(27,1,27,'G'),(28,1,28,'G'),(29,1,29,'G'),(30,1,30,'H'),(31,1,31,'H'),(32,1,33,'H'),(33,1,32,'H'),(34,1,34,'I'),(35,1,35,'I'),(36,1,36,'I'),(37,1,37,'I'),(38,1,38,'J'),(39,1,39,'J'),(40,1,42,'J'),(41,1,43,'J'),(42,1,2,'K'),(43,1,44,'K'),(44,1,45,'K'),(45,1,47,'L'),(46,1,46,'K'),(48,1,48,'L'),(49,1,49,'L'),(50,1,50,'L');
/*!40000 ALTER TABLE `TOUR_TEAMS` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-11 18:15:09
