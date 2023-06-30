DROP DATABASE EchangeSavoir;
CREATE DATABASE IF NOT EXISTS EchangeSavoir;
USE EchangeSavoir;

CREATE TABLE `user` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `admin` BOOLEAN NOT NULL,
  `login` VARCHAR(255) NOT NULL,
  `mdp` VARCHAR(255) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(10),
  `firstname` VARCHAR(50) NOT NULL,
  `lastname` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255),
  `district` INT,
  `city` VARCHAR(255)
);

CREATE TABLE `course` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `subject_id` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `IRL` BOOLEAN NOT NULL,
  `visio` BOOLEAN NOT NULL
);

CREATE TABLE `lesson` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `course_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `IRL` BOOLEAN NOT NULL,
  `visio` BOOLEAN NOT NULL,
  `date` DATE NOT NULL
);

CREATE TABLE `subject` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `category_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL
);

CREATE TABLE `category` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL
);

CREATE TABLE `language` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL
);

CREATE TABLE `courseLanguage` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `course_id` INT NOT NULL,
  `language_id` INT NOT NULL
);

ALTER TABLE `course` ADD CONSTRAINT `Teacher` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

ALTER TABLE `lesson` ADD CONSTRAINT `master` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE;

ALTER TABLE `lesson` ADD CONSTRAINT `acolyte` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

ALTER TABLE `subject` ADD CONSTRAINT `courseSubject` FOREIGN KEY (`id`) REFERENCES `course` (`subject_id`) ON DELETE CASCADE;

ALTER TABLE `category` ADD CONSTRAINT `subjectCategory` FOREIGN KEY (`id`) REFERENCES `subject` (`category_id`) ON DELETE CASCADE;

ALTER TABLE `courseLanguage` ADD CONSTRAINT `courseLang` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE;

ALTER TABLE `courseLanguage` ADD CONSTRAINT `Language` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE CASCADE;
