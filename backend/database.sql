-- MySQL Script generated by MySQL Workbench
-- Wed Feb  1 19:45:48 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema expense_tracker
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `expense_tracker` ;

-- -----------------------------------------------------
-- Schema expense_tracker
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `expense_tracker` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `expense_tracker` ;

-- -----------------------------------------------------
-- Table `expense_tracker`.`group_detail`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `expense_tracker`.`group_detail` ;

CREATE TABLE IF NOT EXISTS `expense_tracker`.`group_detail` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `group_name` VARCHAR(45) NOT NULL,
  `image` VARCHAR(300) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `expense_tracker`.`category_detail`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `expense_tracker`.`category_detail` ;

CREATE TABLE IF NOT EXISTS `expense_tracker`.`category_detail` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(45) NOT NULL,
  `group_id` INT NOT NULL DEFAULT '6',
  `image` VARCHAR(300) NULL DEFAULT NULL,
  `user_id` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  INDEX `group_id_idx` (`group_id` ASC) VISIBLE,
  CONSTRAINT `group_id`
    FOREIGN KEY (`group_id`)
    REFERENCES `expense_tracker`.`group_detail` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `expense_tracker`.`user_detail`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `expense_tracker`.`user_detail` ;

CREATE TABLE IF NOT EXISTS `expense_tracker`.`user_detail` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `hashedPassword` VARCHAR(150) NOT NULL,
  `is_admin` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `expense_tracker`.`transaction`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `expense_tracker`.`transaction` ;

CREATE TABLE IF NOT EXISTS `expense_tracker`.`transaction` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amount` DECIMAL(8,2) NOT NULL,
  `date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `comment` VARCHAR(150) NULL DEFAULT NULL,
  `user_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_idx` (`user_id` ASC) VISIBLE,
  INDEX `id_idx1` (`category_id` ASC) VISIBLE,
  CONSTRAINT `category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `expense_tracker`.`category_detail` (`id`),
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `expense_tracker`.`user_detail` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


INSERT INTO group_detail (group_name) values 
('Revenu'),('Factures'),('Besoins'),
('Loisir / Caprices'),('Culture'), ('Autre');

INSERT INTO category_detail (category_name, group_id) values 
('Revenu', 1),('Vente', 1),('Cadeaux', 1),('Loyer', 2),('Électricité', 2),
('Téléphone', 2),('Internet', 2),('Mutuelle', 2),
('Abonnements', 2),('Courses', 3),('Medical', 3),
('Transport', 3),('Animaux', 3),('Cafe', 4),
('Restaurants', 4),('Alcool', 4),('Tabac', 4),
('Vêtements', 4), ('Voyages', 4), ('Livres', 5), 
('Cinéma', 5), ('Concerts', 5), ('Autre', 6);

INSERT INTO user_detail (username, email, hashedPassword) values
 ('Javier', 'javier@wild.fr', '$argon2id$v=19$m=65536,t=5,p=1$IQXXOerzW64QYULeWzCsaA$QioiFzKhiicNn3htwaI1QoIIySCoaI5WbzWtKXYUICw'), ('Admin', 'admin@wild.fr', '$argon2id$v=19$m=65536,t=5,p=1$IQXXOerzW64QYULeWzCsaA$QioiFzKhiicNn3htwaI1QoIIySCoaI5WbzWtKXYUICw');

INSERT INTO transaction (amount, date, comment, user_id, category_id) values 
(1000, '2023-01-03 14:56:48', 'Allocation Pole Emploi', 1, 1),
(-8, '2023-01-14 14:56:48', 'Kebab Kusadasi', 1, 15),
(-69, '2023-01-03 14:56:48', 'Abonnemment metro', 1, 12),
(-550, '2023-01-03 14:56:48', 'Loyer', 1, 4),
(-62, '2023-01-03 14:56:48', 'Facture Electricité Janvier', 1, 5),
(-35, '2023-01-03 14:56:48', 'Facture Mutuelle Janvier', 1, 8), 
(-20, '2023-01-03 14:56:48', 'Facture internet Janvier', 1, 7),
(-25, '2023-01-14 14:56:48', 'Coiffeur', 1, 11),
(-21, '2023-01-03 14:56:48', 'Pizza MARIA', 1, 15), 
(-12, '2023-01-23 14:56:48', 'facture portable janvier', 1, 6), 
(55, '2023-01-28 14:56:48', 'Tapis Leboncoin', 1, 2),
(-41.85, '2023-01-11 14:56:48', 'Croquettes et sable chat', 1, 13),
(-60.99, '2023-01-01 14:56:48', 'Cartouche aeroport espagne', 1, 17), 
(-31.28, '2023-01-07 14:56:48', 'Leclerc Drive', 1, 10),
(-53.61, '2023-01-27 14:56:48', 'Essence', 1, 12),
(-15, '2023-01-19 14:56:48', 'Vin', 1, 16),
(-2, '2023-01-05 14:56:48', 'Cafe à côté de la Wild', 1,14),
(-2, '2023-01-06 14:56:48', 'Cafe à côté de la Wild', 1,14),
(-2, '2023-01-14 14:56:48', 'Cafe à côté de la Wild', 1,14),
(-2, '2023-01-15 14:56:48', 'Cafe à côté de la Wild', 1,14),
(-2, '2023-01-18 14:56:48', 'Cafe à côté de la Wild', 1,14),
(-2, '2023-01-19 14:56:48', 'Cafe à côté de la Wild', 1,14),
(-2, '2023-01-19 11:56:48', 'Cafe à côté de la Wild', 1,14),
(-2, '2023-01-21 14:56:48', 'Cafe à côté de la Wild', 1,14),
(-2, '2023-01-22 14:56:48', 'Cafe à côté de la Wild', 1,14),
(-2, '2023-01-23 14:56:48', 'Cafe à côté de la Wild', 1,14),
(-2, '2023-01-24 14:56:48', 'Cafe à côté de la Wild', 1,14),
(-2, '2023-01-25 14:56:48', 'Cafe à côté de la Wild', 1,14),
(-2, '2023-01-27 14:56:48', 'Cafe à côté de la Wild', 1,14),
(-2, '2023-01-28 14:56:48', 'Cafe à côté de la Wild', 1,14),
(-12, '2023-01-31 14:56:48', 'FULLSTACK EN 3 JOURS', 1,20), 
(-70, '2023-01-10 14:56:48', 'TICKET RHCP', 1,22);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
