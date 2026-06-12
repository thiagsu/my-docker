CREATE DATABASE IF NOT EXISTS puzzle;

use puzzle;


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


INSERT INTO `GAME` VALUES (1,'Zip','A puzzle game where players fill in a grid with numbers based on given clues.',8),(2,'Tango','A puzzle game where players fill in a grid with full moon and half moon symbols based on given clues.',6),(3,'Queen','A puzzle game where players fill in a grid with Crown of Queen based on given clues.',9);
INSERT INTO `CURR_GAME` VALUES (2,3,632,'2026-06-11','2026-06-10 19:57:50',6);
INSERT INTO `GAME_CELLS` VALUES (1,3,632,0,1,NULL,NULL,NULL,NULL,NULL,'#fad2e1'),(2,3,632,2,4,NULL,NULL,NULL,NULL,NULL,'#fde2e4'),(3,3,632,3,1,NULL,NULL,NULL,NULL,NULL,'#e2ece9'),(4,3,632,4,1,NULL,NULL,NULL,NULL,NULL,'#e2ece9'),(5,3,632,4,2,NULL,NULL,NULL,NULL,NULL,'#fde2e4'),(6,3,632,4,3,NULL,NULL,NULL,NULL,NULL,'#fde2e4'),(7,3,632,5,1,NULL,NULL,NULL,NULL,NULL,'#fde2e4'),(8,3,632,5,2,NULL,NULL,NULL,NULL,NULL,'#fad2e1'),(9,3,632,5,3,NULL,NULL,NULL,NULL,NULL,'#fad2e1'),(10,3,632,5,4,NULL,NULL,NULL,NULL,NULL,'#fad2e1'),(11,3,632,5,5,NULL,NULL,NULL,NULL,NULL,'#fad2e1');

