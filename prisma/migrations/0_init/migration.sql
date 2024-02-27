-- CreateTable
CREATE TABLE `authorization` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `team` INTEGER NULL,
    `user` INTEGER NULL,
    `project` INTEGER NULL,
    `role` INTEGER NULL,

    INDEX `auth_project_id_idx`(`project`),
    INDEX `auth_role_id_idx`(`role`),
    INDEX `auth_team_id_idx`(`team`),
    INDEX `auth_user_id_idx`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `task` INTEGER NOT NULL,
    `user` INTEGER NOT NULL,
    `timestamp` DATETIME(0) NULL,
    `supercedes` INTEGER NULL,
    `data` TEXT NULL,

    INDEX `note_task_id_idx`(`task`),
    INDEX `note_user_id_idx`(`user`),
    INDEX `supercedes_note_id_idx`(`supercedes`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `primary_team` INTEGER NULL,

    INDEX `project_primary_team_idx`(`primary_team`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `view` TINYINT NOT NULL DEFAULT 0,
    `edit` TINYINT NOT NULL DEFAULT 0,
    `assign_team` TINYINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project` INTEGER NULL,
    `user` INTEGER NULL,
    `team` INTEGER NULL,
    `name` VARCHAR(45) NULL,
    `description` VARCHAR(45) NULL,
    `due_date` DATETIME(0) NULL,
    `started_date` DATETIME(0) NULL,
    `completed_date` DATETIME(0) NULL,

    INDEX `task_project_id_idx`(`project`),
    INDEX `task_team_id_idx`(`team`),
    INDEX `task_user_id_idx`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `lead` INTEGER NULL,

    INDEX `lead_idx`(`lead`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NULL,
    `email` VARCHAR(45) NULL,
    `full_name` VARCHAR(45) NULL,
    `team_id` INTEGER NULL,
    `github_login` VARCHAR(45) NULL,
    `google_login` VARCHAR(45) NULL,

    INDEX `user_team_id_idx`(`team_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `authorization` ADD CONSTRAINT `auth_project_id` FOREIGN KEY (`project`) REFERENCES `project`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `authorization` ADD CONSTRAINT `auth_role_id` FOREIGN KEY (`role`) REFERENCES `role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `authorization` ADD CONSTRAINT `auth_team_id` FOREIGN KEY (`team`) REFERENCES `team`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `authorization` ADD CONSTRAINT `auth_user_id` FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `note` ADD CONSTRAINT `note_task_id` FOREIGN KEY (`task`) REFERENCES `task`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `note` ADD CONSTRAINT `note_user_id` FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `note` ADD CONSTRAINT `supercedes_note_id` FOREIGN KEY (`supercedes`) REFERENCES `note`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_primary_team` FOREIGN KEY (`primary_team`) REFERENCES `team`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_project_id` FOREIGN KEY (`project`) REFERENCES `project`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_team_id` FOREIGN KEY (`team`) REFERENCES `team`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_user_id` FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `team` ADD CONSTRAINT `lead_user_id` FOREIGN KEY (`lead`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_team_id` FOREIGN KEY (`team_id`) REFERENCES `team`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

