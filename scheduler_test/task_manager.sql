-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 24. 12:00
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `task_manager`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `categories`
--

INSERT INTO `categories` (`id`, `user_id`, `name`) VALUES
(1, NULL, 'Iskolai'),
(2, NULL, 'Személyes'),
(3, NULL, 'Egyéb');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `time` varchar(20) NOT NULL,
  `completed` tinyint(1) DEFAULT 0,
  `category` varchar(50) DEFAULT 'Egyéb'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `events`
--

INSERT INTO `events` (`id`, `day`, `month`, `year`, `title`, `time`, `completed`, `category`) VALUES
(1, 5, 3, 2025, 'fasz', '3:12 DU - 4:45 DU', 1, 'Egyéb'),
(2, 6, 3, 2025, 'Helloka', '12:55 DU - 12:58 DU', 0, 'Egyéb'),
(3, 5, 3, 2025, 'Tina', '12:45 DU - 10:55 DU', 1, 'Egyéb'),
(4, 5, 3, 2025, 'AAA', '12:11 DU - 12:55 DU', 1, 'Egyéb'),
(5, 5, 3, 2025, 'Tinaaaa', '12:12 DU - 2:44 DU', 1, 'Egyéb'),
(6, 5, 3, 2025, 'sxddx', '12:11 DU - 12:55 DU', 0, 'Egyéb'),
(7, 5, 3, 2025, 'ssssssssssssss', '12:12 DU - 12:55 DU', 0, 'Egyéb'),
(8, 5, 3, 2025, 'holaaaaaaaaaaaaaaaa', '12:11 DU - 12:55 DU', 0, 'Egyéb'),
(9, 6, 3, 2025, 'kiscica', '12:25 DU - 12:55 DU', 0, 'Egyéb'),
(10, 5, 3, 2025, 'helloka', '12:55 DU - 12:58 DU', 0, 'Egyéb'),
(11, 5, 3, 2025, 'aa', '12:55 DU - 1:00 DU', 0, 'Egyéb'),
(12, 5, 3, 2025, 'hola', '11:22 DE - 11:55 DE', 0, 'Egyéb'),
(13, 5, 3, 2025, 'hah', '12:12 DU - 12:15 DU', 0, 'Egyéb'),
(14, 10, 3, 2025, 'kicc', '12:12 DU - 12:55 DU', 1, 'Egyéb'),
(15, 10, 3, 2025, 'kissssssssssssss', '12:55 DU - 12:58 DU', 1, 'Egyéb'),
(16, 10, 3, 2025, 'jghhhhhhhhh', '12:55 DU - 12:59 DU', 1, 'Egyéb'),
(17, 10, 3, 2025, 'helooo', '2:55 DU - 2:58 DU', 0, 'Egyéb'),
(18, 10, 3, 2025, 'ggggggggggggggg', '12:55 DU - 12:58 DU', 1, 'Egyéb'),
(19, 10, 3, 2025, 'hhhhhhhhhhhh', '12:55 DU - 12:57 DU', 0, 'Egyéb'),
(20, 10, 3, 2025, 'aaaaaaaa', '12:55 DU - 12:58 DU', 1, 'Egyéb'),
(21, 10, 3, 2025, 'aaa1', '12:55 DU - 12:58 DU', 0, 'Egyéb'),
(22, 10, 3, 2025, 'aaa2', '12:55 DU - 12:58 DU', 0, 'Egyéb'),
(23, 10, 3, 2025, 'aaa3', '12:45 DU - 12:50 DU', 0, 'Egyéb'),
(24, 10, 3, 2025, 'aaa4', '12:55 DU - 12:58 DU', 0, 'Egyéb'),
(25, 10, 3, 2025, 'aaa5', '12:55 DU - 12:57 DU', 0, 'Egyéb'),
(26, 10, 3, 2025, 'aaa5', '3:54 DU - 3:56 DU', 0, 'Egyéb'),
(27, 10, 3, 2025, 'aaa7', '12:55 DU - 12:58 DU', 0, 'Egyéb'),
(28, 10, 3, 2025, 'aaa8', '12:55 DU - 12:58 DU', 0, 'Egyéb'),
(29, 10, 3, 2025, 'aaaaaaaaaaaa88888', '12:55 PM - 12:57 PM', 0, 'Egyéb'),
(30, 11, 3, 2025, 'haliaa', '2:45 PM - 3:58 PM', 0, 'Egyéb'),
(31, 12, 3, 2025, 'awwwq', '12:55 PM - 12:58 PM', 0, 'Egyéb'),
(32, 13, 3, 2025, 'aaaa', '2:45 PM - 7:48 PM', 1, 'Egyéb'),
(33, 14, 3, 2025, 'aaaaaaaaaaaaaaaaaaaaaaaa', '12:55 PM - 12:58 PM', 1, 'Egyéb'),
(37, 14, 3, 2025, 'biologia hazi feladat', '14:47 - 21:55', 1, 'Egyéb'),
(38, 14, 3, 2025, 'kiscicakk', '05:55 - 14:55', 0, NULL),
(39, 14, 3, 2025, 'sziszak mindenutt 2', '14:55 - 19:58', 0, NULL),
(40, 14, 3, 2025, 'viragok', '14:44 - 18:55', 0, NULL),
(43, 17, 3, 2025, 'Felmosni', '14:55 - 15:5', 0, 'Személyes'),
(44, 17, 3, 2025, 'matek hf', '12:55 - 13:55', 0, 'Iskolai'),
(47, 17, 3, 2025, 'sziszak mindenutta', '14:55 - 15:54', 1, 'Iskolai'),
(48, 17, 3, 2025, 'sziszak mindenutt', '14:55 - 15:54', 1, ''),
(50, 19, 3, 2025, 'sziszak mindenutt', '14:55 - 15:54', 1, 'Iskolai'),
(51, 23, 3, 2025, 'yayy', '14:44 - 15:55', 1, 'Iskolai'),
(52, 23, 3, 2025, 'hii', '12:55 - 13:55', 1, 'Iskolai'),
(53, 23, 3, 2025, 'aaa', '15:55 - 18:55', 1, 'Iskolai'),
(54, 23, 3, 2025, 'bbbb', '14:55 - 16:55', 1, 'Iskolai'),
(55, 23, 3, 2025, 'haha', '12:55 - 13:55', 0, 'Iskolai'),
(56, 23, 3, 2025, 'kiscica222', '14:55 - 15:44', 0, 'Személyes'),
(57, 23, 3, 2025, 'kkkkkkk', '14:44 - 14:55', 1, 'Iskolai'),
(58, 23, 3, 2025, 'aaa2222', '11:11 - 11:11', 0, 'Iskolai'),
(59, 23, 3, 2025, 'qqq1111', '11:44 - 15:55', 0, ''),
(60, 23, 3, 2025, '111', '11:11 - 11:11', 0, 'Személyes');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'admin', '$2y$10$aNVTl/UBANHL0U4nVRC3u.hVO/mfTd2Fn2VgASZNZpf5eFS88y5IC'),
(2, 'kiscica', '$2y$10$CZhTqf6JqxwX0cIPHl8Ycu2yx8x6qaJ0xDXYl3zU.ee9zNk.QYuGu');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_events`
--

CREATE TABLE `user_events` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user_events`
--

INSERT INTO `user_events` (`id`, `user_id`, `event_id`) VALUES
(4, 2, 37),
(5, 2, 38),
(6, 2, 39),
(7, 2, 40),
(10, 2, 43),
(11, 2, 44),
(14, 1, 47),
(15, 1, 48),
(17, 1, 50),
(18, 1, 51),
(19, 1, 52),
(20, 1, 53),
(21, 1, 54),
(22, 1, 55),
(23, 1, 56),
(24, 1, 57),
(25, 1, 58),
(26, 1, 59),
(27, 1, 60);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- A tábla indexei `user_events`
--
ALTER TABLE `user_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `event_id` (`event_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `user_events`
--
ALTER TABLE `user_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `user_events`
--
ALTER TABLE `user_events`
  ADD CONSTRAINT `user_events_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_events_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
