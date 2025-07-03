-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2025 at 11:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat_application`
--

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `chat_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `start_time` timestamp NULL DEFAULT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`chat_id`, `title`, `admin_id`, `start_time`, `end_time`, `is_active`, `created_at`) VALUES
(1, 'General Discussion', 1, '2025-04-01 04:30:00', '2025-04-01 06:00:00', 0, '2025-04-12 16:15:23'),
(2, 'Tech Talk', 1, NULL, NULL, 0, '2025-04-12 16:15:23'),
(3, 'Project Meeting', 1, '2025-04-02 08:30:00', NULL, 1, '2025-04-12 16:15:23'),
(4, 'sdsd', 1, '2025-04-23 10:52:10', NULL, NULL, '2025-04-23 10:52:10'),
(5, 'NewChat', 1, '2025-04-23 11:21:28', NULL, NULL, '2025-04-23 11:21:28'),
(6, 'MyPubChat', 1, '2025-04-23 11:25:44', NULL, NULL, '2025-04-23 11:25:44'),
(7, 'MineChat', 1, '2025-04-23 11:30:04', NULL, NULL, '2025-04-23 11:30:04'),
(8, 'Sunny', 1, '2025-04-23 11:49:27', NULL, NULL, '2025-04-23 11:49:27'),
(9, 'Sunny', 1, '2025-04-23 11:49:35', NULL, NULL, '2025-04-23 11:49:35');

-- --------------------------------------------------------

--
-- Table structure for table `chat_files`
--

CREATE TABLE `chat_files` (
  `file_id` int(11) NOT NULL,
  `chat_id` int(11) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chat_files`
--

INSERT INTO `chat_files` (`file_id`, `chat_id`, `file_path`, `created_at`) VALUES
(1, 1, '/chat_logs/chat_1_20250401.txt', '2025-04-12 16:15:23'),
(2, 3, '/chat_logs/chat_3_20250402.txt', '2025-04-12 16:15:23');

-- --------------------------------------------------------

--
-- Table structure for table `chat_messages`
--

CREATE TABLE `chat_messages` (
  `message_id` int(11) NOT NULL,
  `chat_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` tinytext NOT NULL,
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chat_messages`
--

INSERT INTO `chat_messages` (`message_id`, `chat_id`, `user_id`, `message`, `sent_at`) VALUES
(1, 1, 2, 'Hello everyone!', '2025-04-01 04:35:00'),
(2, 1, 3, 'Hi there!', '2025-04-01 04:36:00'),
(3, 1, 2, 'How are you all doing?', '2025-04-01 04:40:00'),
(4, 3, 4, 'When is our next deadline?', '2025-04-02 08:35:00'),
(5, 1, 1, 'hu', '2025-04-23 12:25:36'),
(6, 1, 1, 'hi', '2025-04-23 12:25:55'),
(7, 1, 1, 'okay', '2025-04-23 12:26:00'),
(8, 1, 1, 'hi', '2025-04-24 05:15:48'),
(9, 1, 1, 'okay', '2025-04-24 05:15:52'),
(10, 1, 1, 'hi', '2025-04-24 05:18:36'),
(11, 1, 1, 'hellooo...', '2025-04-24 05:18:47'),
(12, 1, 1, 'okay', '2025-04-24 05:19:07'),
(13, 1, 1, 'wel', '2025-04-24 05:19:21'),
(14, 1, 1, 'working... ma boys', '2025-04-24 05:44:26'),
(15, 1, 1, 'really', '2025-04-24 05:44:47'),
(16, 1, 1, 'ok', '2025-04-24 05:44:52'),
(17, 2, 1, 'tech talk', '2025-04-24 05:53:34'),
(18, 2, 1, 'nice', '2025-04-24 05:53:53'),
(19, 4, 1, 'this is private chat', '2025-04-24 05:54:05'),
(20, 1, 1, 'hi', '2025-04-24 06:19:16'),
(21, 2, 1, 'hi', '2025-04-24 06:19:35'),
(22, 1, 1, 'hi', '2025-04-24 06:20:16'),
(23, 1, 1, 'hihhh', '2025-04-24 06:20:30'),
(24, 3, 1, 'hi', '2025-04-25 01:25:01'),
(25, 1, 1, 'jk', '2025-04-26 12:50:41'),
(26, 4, 1, 'hi', '2025-04-26 13:35:33'),
(27, 9, 1, 'hu', '2025-04-26 13:35:55'),
(28, 6, 1, 'hi', '2025-04-26 13:55:56'),
(29, 9, 1, 'hi', '2025-04-26 13:56:23'),
(30, 7, 1, 'hi', '2025-04-26 14:10:22'),
(31, 4, 1, ',,m', '2025-04-26 14:11:19'),
(32, 3, 1, ':>', '2025-04-26 14:11:45'),
(33, 3, 1, 'jwew', '2025-04-26 14:11:49'),
(34, 1, 1, 'ncc', '2025-04-26 14:14:21'),
(35, 1, 1, '90 💥', '2025-04-26 14:14:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nick_name` varchar(50) NOT NULL,
  `profile_picture_path` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `username`, `password`, `nick_name`, `profile_picture_path`, `is_admin`, `created_at`, `updated_at`) VALUES
(1, 'admin@chat.com', 'admin', '$2a$10$xJwL5v5Jz5UZJf5U5f5U5e', 'System Admin', NULL, 1, '2025-04-12 16:15:23', '2025-04-12 16:15:23'),
(2, 'user1@chat.com', 'user1', '$2a$10$xJwL5v5Jz5UZJf5U5f5U5e', 'Chatter1', '/profiles/user1.jpg', 0, '2025-04-12 16:15:23', '2025-04-12 16:15:23'),
(3, 'user2@chat.com', 'user2', '$2a$10$xJwL5v5Jz5UZJf5U5f5U5e', 'Talkative', '/profiles/user2.png', 0, '2025-04-12 16:15:23', '2025-04-12 16:15:23'),
(4, 'user3@chat.com', 'user3', '$2a$10$xJwL5v5Jz5UZJf5U5f5U5e', 'SilentBob', NULL, 0, '2025-04-12 16:15:23', '2025-04-12 16:15:23');

-- --------------------------------------------------------

--
-- Table structure for table `user_chats`
--

CREATE TABLE `user_chats` (
  `user_id` int(11) NOT NULL,
  `chat_id` int(11) NOT NULL,
  `subscribed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_chats`
--

INSERT INTO `user_chats` (`user_id`, `chat_id`, `subscribed_at`) VALUES
(2, 1, '2025-04-12 16:15:23'),
(2, 2, '2025-04-12 16:15:23'),
(3, 1, '2025-04-12 16:15:23'),
(4, 3, '2025-04-12 16:15:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`chat_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `chat_files`
--
ALTER TABLE `chat_files`
  ADD PRIMARY KEY (`file_id`),
  ADD KEY `chat_id` (`chat_id`);

--
-- Indexes for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `chat_id` (`chat_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `user_chats`
--
ALTER TABLE `user_chats`
  ADD PRIMARY KEY (`user_id`,`chat_id`),
  ADD KEY `chat_id` (`chat_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `chat_files`
--
ALTER TABLE `chat_files`
  MODIFY `file_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `chat_files`
--
ALTER TABLE `chat_files`
  ADD CONSTRAINT `chat_files_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`chat_id`) ON DELETE CASCADE;

--
-- Constraints for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD CONSTRAINT `chat_messages_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`chat_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chat_messages_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_chats`
--
ALTER TABLE `user_chats`
  ADD CONSTRAINT `user_chats_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_chats_ibfk_2` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`chat_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
