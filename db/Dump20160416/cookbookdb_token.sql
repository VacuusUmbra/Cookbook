CREATE DATABASE  IF NOT EXISTS `cookbookdb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `cookbookdb`;

CREATE TABLE `users` (
  `token` varchar(45) NOT NULL DEFAULT '',
  `userName` varchar(45) NOT NULL DEFAULT '',
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='This table stores user information';

INSERT INTO `token` VALUES ("test", "Jalvo");
