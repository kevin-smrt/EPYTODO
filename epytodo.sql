CREATE DATABASE IF NOT EXISTS `epytodo` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `epytodo`;

CREATE TABLE IF NOT EXISTS `user`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `firstname` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `todo`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `due_time` DATETIME NOT NULL,
    `status` enum('not started','todo', 'in progress','done') NOT NULL DEFAULT 'not started',
    `user_id` INT UNSIGNED,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);