-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 25, 2026 at 01:35 AM
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
-- Database: `smart_business_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `quantity` int(11) DEFAULT 1,
  `price` decimal(10,2) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `payment_status` varchar(50) DEFAULT 'Unpaid',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `product_id`, `product_name`, `quantity`, `price`, `total_price`, `status`, `payment_status`, `created_at`) VALUES
(1, 1, 5, 'Noodles', 1, 20.00, 20.00, 'Pending', 'Unpaid', '2026-07-13 14:07:17'),
(2, 1, 5, 'Noodles', 1, 20.00, 20.00, 'Pending', 'Unpaid', '2026-07-13 14:07:35'),
(3, 1, 4, 'Biscuits', 1, 20.00, 20.00, 'Pending', 'Unpaid', '2026-07-13 14:13:14');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `price`, `stock`, `quantity`) VALUES
(1, 'Laptop', 'Electronics', 55000.00, 10, 0),
(2, 'Mobile', 'Electronics', 25000.00, 20, 0),
(3, 'Chair', 'Furniture', 3000.00, 50, 0),
(4, 'Biscuits', '', 20.00, 3, 0),
(5, 'Noodles', 'food', 20.00, 1000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','retailer','user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2b$10$ks3fRENATJKOdKpO5WM9ZOjmi6Vw3OC2bjFkb.uIJfVUivPeJMcS6', 'admin'),
(2, 'Renusha', 'thaparenusha12@gmail.com', '$2b$10$rIN6sS4T6EOSF0/0ujq7xOBHhGEKdAT1Q0Ojldu9DFLBLKkwYzUQq', 'user'),
(4, 'Rami', 'Ram1@gmail.com', '$2b$10$6foLBI0FjXs2lzJbDvYMwebDbh3uCIQW1Q5bKxNOFAzfIKngE0mJy', 'retailer'),
(5, 'Rohan  Thapa', 'Rohan@gmail.com', '$2b$10$IPhXN5SG3LktjTDBl0NVIuQedeEZ/ySpfE2O.KDtK7VddYeu1DPCm', 'user'),
(7, 'admin', 'admin1@gmail.com', '$2b$10$/pOKoEtYGALBC.xaAV1IYetpiDB0LbT4Gl33t6fgkQ09tCIAX5BM2', 'user'),
(14, 'Renusha thapa', 'thaparenusha@gmail.com', '$2b$10$7i2WOwIkfCg2X0pSgfBqKexeD8Vxf0bzrOEYSKFYutO1hqzr7yVP6', 'user'),
(15, 'resma', 'renushathapa@gmail.com', '$2b$10$Kml0Jq7GR6uBdlmzUEeIOOk3f64Dm5a/XRVUHEOO7KPNiSXW.dpAu', 'retailer'),
(16, '.........', '123@123.com', '$2b$10$BOGy.EULaqfc1ME60C265eHo2.00R.BHe/TjqrhSMLRZkyZsS9nui', 'user'),
(17, 'adin', 'adin@gmail.com', '$2b$10$KsawRY6txuY8ZvQxRXAMG.snn0eI/7DKr/ccbdwpB/DVp1si9KGD.', 'retailer'),
(18, 'Roshan Thapa', 'rosan@gmail.com', '$2b$10$/PGX2bMqLbpQa0Kbo.ZF9uHuSRugyDVsFWl5aFIrILWMd0ef.Pycq', 'user'),
(20, 'rammma', 'raamm@gmail.com', '$2b$10$JhTaSOUTERG0IGfpPE1zAuhNfEstAhtpe6WSgIjmDRTY3qNMJ4XE2', 'retailer'),
(21, 'Rosii', 'Rosi12@gmail.com', '$2b$10$N3SQmjSA4aGXVkhgy03QueRg5TSKhkKrEjcvf.TUmH4QGxnmjgdgK', 'user'),
(22, 'iiiiiiii', 'i@gmail.com', '$2b$10$UH5bqz01QpdSo/d1rEV3SumnRstXhfgHZ5fXbyx9qwo4gvIYuzS6q', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
