CREATE DATABASE  IF NOT EXISTS `cookbookdb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `cookbookdb`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: cookbookdb
-- ------------------------------------------------------
-- Server version	5.7.11-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `recipe`
--

DROP TABLE IF EXISTS `recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recipe` (
  `rName` varchar(45) CHARACTER SET utf8 NOT NULL,
  `recipeID` int(11) NOT NULL AUTO_INCREMENT,
  `prepTime` varchar(45) NOT NULL,
  `cookTime` varchar(45) NOT NULL,
  `recipeRating` double DEFAULT NULL,
  `creatorName` varchar(45) CHARACTER SET utf8 NOT NULL,
  `rFlags` int(11) DEFAULT '0',
  `directions` varchar(4500) CHARACTER SET utf8 NOT NULL,
  `ingredients` varchar(4500) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`recipeID`),
  UNIQUE KEY `recipeID_UNIQUE` (`recipeID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=armscii8 COMMENT='a list of all recipes in the database';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe`
--

LOCK TABLES `recipe` WRITE;
/*!40000 ALTER TABLE `recipe` DISABLE KEYS */;
INSERT INTO `recipe` VALUES ('spaghetti',1,'5 minutes','15 minutes',4.7,'Ace',0,'Boil water, place noodles in boiled war for 10 minutes, add salt and olive oil, then strain the noodles before adding butter and sauce','spaghetti noodes, butter, olive oil, salt, and tomato sauce'),('cupcakes',2,'20 minutes','60 minutes',3.2,'Ace',0,'Place flour, eggs, sugar, and milk into a bowl and stir until blended, fill mixture into cup cake pan, and place in over for 1 hour.','flour, eggs, sugar, shortening, water, milk'),('water',3,'1 minute','None',NULL,'Ace',0,'get water, and place in glass cup','some water');
/*!40000 ALTER TABLE `recipe` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-01 14:51:41
