-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 12, 2024 at 10:14 AM
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
-- Database: `atms_sms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `username`, `password`, `firstname`, `lastname`) VALUES
(1, 'admin', '036d0ef7567a20b5a4ad24a354ea4a945ddab676', 'Admin', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `attendance_id` int(11) NOT NULL,
  `student_id` int(100) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `remark` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`attendance_id`, `student_id`, `date`, `time`, `remark`) VALUES
(49, 2024170527, '2024-11-11', '17:38:26', 'time-in'),
(50, 2024170527, '2024-11-11', '17:38:44', 'time-out'),
(51, 2024170527, '2024-11-11', '17:44:20', 'time-in'),
(54, 2024170527, '2024-11-11', '17:46:10', 'time-in'),
(55, 2024170527, '2024-11-11', '17:46:55', 'time-out'),
(56, 2024170527, '2024-11-11', '17:47:49', 'time-in'),
(57, 2024170527, '2024-11-11', '17:48:16', 'time-out'),
(58, 2024170527, '2024-11-11', '17:49:48', 'time-in'),
(59, 2024170527, '2024-11-11', '17:50:46', 'time-out'),
(60, 2024170527, '2024-11-11', '17:52:46', 'time-in'),
(61, 2024170518, '2024-11-11', '17:52:58', 'time-in'),
(62, 2024170518, '2024-11-11', '17:54:08', 'time-out'),
(63, 2024170527, '2024-11-11', '18:03:25', 'time-out'),
(64, 2024170527, '2024-11-11', '18:04:00', 'time-in'),
(65, 2024170527, '2024-11-11', '18:04:24', 'time-out'),
(66, 2024170521, '2024-11-11', '18:04:40', 'time-in'),
(67, 2024170527, '2024-11-11', '18:05:05', 'time-in'),
(68, 2024170527, '2024-11-11', '18:06:05', 'time-out'),
(69, 2024170521, '2024-11-11', '18:06:13', 'time-out'),
(70, 2024170527, '2024-11-11', '18:06:31', 'time-in'),
(71, 2024170527, '2024-11-11', '18:09:11', 'time-out'),
(72, 2024170521, '2024-11-11', '18:09:58', 'time-in'),
(73, 2024170527, '2024-11-11', '18:10:21', 'time-in'),
(74, 2024170527, '2024-11-11', '18:25:13', 'time-out'),
(75, 2024170527, '2024-11-11', '18:27:02', 'time-in'),
(76, 2024170527, '2024-11-12', '01:40:45', 'time-in'),
(77, 2024170521, '2024-11-12', '01:40:57', 'time-in'),
(78, 2024170524, '2024-11-12', '01:41:10', 'time-in'),
(79, 2024170527, '2024-11-12', '01:42:08', 'time-out'),
(80, 2024170527, '2024-11-12', '01:42:48', 'time-in'),
(81, 2024170527, '2024-11-12', '01:45:35', 'time-out'),
(82, 2024170527, '2024-11-12', '01:45:38', 'time-in'),
(83, 2024170527, '2024-11-12', '01:46:22', 'time-out'),
(84, 2024170521, '2024-11-12', '01:46:29', 'time-out'),
(85, 2024170521, '2024-11-12', '01:46:39', 'time-in'),
(86, 2024170524, '2024-11-12', '01:46:50', 'time-out'),
(87, 2024170521, '2024-11-12', '07:29:06', 'time-out'),
(88, 2024170527, '2024-11-12', '07:29:12', 'time-in'),
(89, 2024170524, '2024-11-12', '07:29:36', 'time-in'),
(90, 2024170527, '2024-11-12', '07:29:40', 'time-out'),
(91, 2024170527, '2024-11-12', '07:29:43', 'time-in'),
(92, 2024170527, '2024-11-12', '07:29:46', 'time-out'),
(93, 2024170527, '2024-11-12', '07:29:49', 'time-in'),
(94, 2024170527, '2024-11-12', '07:30:15', 'time-out'),
(95, 2024170527, '2024-11-12', '07:30:19', 'time-in'),
(96, 2024170527, '2024-11-12', '07:33:11', 'time-out'),
(97, 2024170527, '2024-11-12', '07:33:15', 'time-in'),
(98, 2024170527, '2024-11-12', '07:33:17', 'time-out'),
(99, 2024170527, '2024-11-12', '07:34:02', 'time-in'),
(100, 2024170527, '2024-11-12', '07:34:08', 'time-out'),
(101, 2024170527, '2024-11-12', '07:34:14', 'time-in'),
(102, 2024170521, '2024-11-12', '07:34:18', 'time-in'),
(103, 2024170521, '2024-11-12', '07:34:21', 'time-out'),
(104, 2024170527, '2024-11-12', '07:37:00', 'time-out'),
(105, 2024170527, '2024-11-12', '07:37:05', 'time-in'),
(106, 2024170527, '2024-11-12', '07:37:09', 'time-out'),
(107, 2024170527, '2024-11-12', '07:39:11', 'time-in'),
(108, 2024170527, '2024-11-12', '07:39:16', 'time-out'),
(109, 2024170527, '2024-11-12', '07:41:00', 'time-in'),
(110, 2024170527, '2024-11-12', '07:44:47', 'time-out'),
(111, 2024170527, '2024-11-12', '07:45:22', 'time-in'),
(114, 2024170527, '2024-11-12', '07:46:13', 'time-out'),
(117, 2024170527, '2024-11-12', '07:47:38', 'time-in'),
(119, 2024170521, '2024-11-12', '07:53:27', 'time-in'),
(120, 2024170524, '2024-11-12', '07:53:48', 'time-out'),
(122, 2024170527, '2024-11-12', '09:41:47', 'time-out'),
(123, 2024170521, '2024-11-12', '09:41:51', 'time-out'),
(124, 2024170524, '2024-11-12', '09:41:59', 'time-in'),
(125, 2024170521, '2024-11-12', '09:42:08', 'time-in'),
(126, 2024170527, '2024-11-12', '12:32:54', 'time-in'),
(127, 2024170521, '2024-11-12', '12:33:04', 'time-out'),
(128, 2024170524, '2024-11-12', '12:33:09', 'time-out'),
(129, 2024170527, '2024-11-12', '12:34:07', 'time-out'),
(130, 2024170521, '2024-11-12', '12:34:18', 'time-in'),
(131, 2024170524, '2024-11-12', '12:34:24', 'time-in');

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `section_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `grade` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`section_id`, `name`, `grade`) VALUES
(5, 'Narra', 'G11'),
(6, 'Athena', 'G12'),
(7, 'Zues', 'G11'),
(20, 'Salazar', 'G7');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `section_id` int(11) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `profile` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `parent` varchar(100) NOT NULL,
  `parent_no` varchar(13) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `first_name`, `last_name`, `section_id`, `gender`, `profile`, `status`, `parent`, `parent_no`) VALUES
(2024170521, 'Juan', 'Dela Cruz', 6, 'Male', '52be91679dfa94275de5ed8f69840259.png', 'Active', 'Eric Dela Cruz', '09123456789'),
(2024170524, 'Juanna', 'Salazar', 6, 'Female', '68e687c4923600fc6fdd658295e5f243.jpg', 'Active', 'Don Suljueta', '09123456789'),
(2024170527, 'Dallia', 'Cruz', 6, 'Female', 'c588afd06a88e3e509e92d68834f73ed.jpg', 'Active', 'Amie Cruz', '09123456789');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`attendance_id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`section_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `section_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2024170531;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
