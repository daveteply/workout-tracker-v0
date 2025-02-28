-- CreateTable
CREATE TABLE `activity_categories` (
    `activity_category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(512) NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`activity_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activities` (
    `activity_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(512) NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `activities_category_id_fkey`(`category_id`),
    PRIMARY KEY (`activity_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity_attributes` (
    `activity_attribute_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(512) NULL,
    `attribute_type` ENUM('LENGTH', 'MASS', 'TIME', 'NUMBER', 'STRING') NOT NULL DEFAULT 'LENGTH',
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`activity_attribute_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity_activity_attributes` (
    `activity_id` INTEGER NOT NULL,
    `attribute_id` INTEGER NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `activity_activity_attributes_attribute_id_fkey`(`attribute_id`),
    PRIMARY KEY (`activity_id`, `attribute_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `routines` (
    `routine_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `started` DATETIME(3) NOT NULL,
    `completed` DATETIME(3) NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`routine_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members` (
    `member_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `role` ENUM('MEMBER', 'ADMIN') NOT NULL DEFAULT 'MEMBER',
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `members_email_key`(`email`),
    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member_routines` (
    `member_id` INTEGER NOT NULL,
    `routine_id` INTEGER NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `member_routines_routine_id_fkey`(`routine_id`),
    PRIMARY KEY (`member_id`, `routine_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `activities_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `activity_categories`(`activity_category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity_activity_attributes` ADD CONSTRAINT `activity_activity_attributes_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `activities`(`activity_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity_activity_attributes` ADD CONSTRAINT `activity_activity_attributes_attribute_id_fkey` FOREIGN KEY (`attribute_id`) REFERENCES `activity_attributes`(`activity_attribute_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_routines` ADD CONSTRAINT `member_routines_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `members`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_routines` ADD CONSTRAINT `member_routines_routine_id_fkey` FOREIGN KEY (`routine_id`) REFERENCES `routines`(`routine_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
