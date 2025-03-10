-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 10. 13:08
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
-- Tábla szerkezet ehhez a táblához `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `time` varchar(20) NOT NULL,
  `completed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `events`
--

INSERT INTO `events` (`id`, `day`, `month`, `year`, `title`, `time`, `completed`) VALUES
(1, 5, 3, 2025, 'fasz', '3:12 DU - 4:45 DU', 1),
(2, 6, 3, 2025, 'Helloka', '12:55 DU - 12:58 DU', 0),
(3, 5, 3, 2025, 'Tina', '12:45 DU - 10:55 DU', 1),
(4, 5, 3, 2025, 'AAA', '12:11 DU - 12:55 DU', 1),
(5, 5, 3, 2025, 'Tinaaaa', '12:12 DU - 2:44 DU', 1),
(6, 5, 3, 2025, 'sxddx', '12:11 DU - 12:55 DU', 0),
(7, 5, 3, 2025, 'ssssssssssssss', '12:12 DU - 12:55 DU', 0),
(8, 5, 3, 2025, 'holaaaaaaaaaaaaaaaa', '12:11 DU - 12:55 DU', 0),
(9, 6, 3, 2025, 'kiscica', '12:25 DU - 12:55 DU', 0),
(10, 5, 3, 2025, 'helloka', '12:55 DU - 12:58 DU', 0),
(11, 5, 3, 2025, 'aa', '12:55 DU - 1:00 DU', 0),
(12, 5, 3, 2025, 'hola', '11:22 DE - 11:55 DE', 0),
(13, 5, 3, 2025, 'hah', '12:12 DU - 12:15 DU', 0),
(14, 10, 3, 2025, 'kicc', '12:12 DU - 12:55 DU', 1),
(15, 10, 3, 2025, 'kissssssssssssss', '12:55 DU - 12:58 DU', 1),
(16, 10, 3, 2025, 'jghhhhhhhhh', '12:55 DU - 12:59 DU', 1),
(17, 10, 3, 2025, 'helooo', '2:55 DU - 2:58 DU', 0),
(18, 10, 3, 2025, 'ggggggggggggggg', '12:55 DU - 12:58 DU', 1),
(19, 10, 3, 2025, 'hhhhhhhhhhhh', '12:55 DU - 12:57 DU', 0),
(20, 10, 3, 2025, 'aaaaaaaa', '12:55 DU - 12:58 DU', 1),
(21, 10, 3, 2025, 'aaa1', '12:55 DU - 12:58 DU', 0),
(22, 10, 3, 2025, 'aaa2', '12:55 DU - 12:58 DU', 0),
(23, 10, 3, 2025, 'aaa3', '12:45 DU - 12:50 DU', 0),
(24, 10, 3, 2025, 'aaa4', '12:55 DU - 12:58 DU', 0),
(25, 10, 3, 2025, 'aaa5', '12:55 DU - 12:57 DU', 0),
(26, 10, 3, 2025, 'aaa5', '3:54 DU - 3:56 DU', 0),
(27, 10, 3, 2025, 'aaa7', '12:55 DU - 12:58 DU', 0),
(28, 10, 3, 2025, 'aaa8', '12:55 DU - 12:58 DU', 0),
(29, 10, 3, 2025, 'aaaaaaaaaaaa88888', '12:55 PM - 12:57 PM', 0),
(30, 11, 3, 2025, 'haliaa', '2:45 PM - 3:58 PM', 0),
(31, 12, 3, 2025, 'awwwq', '12:55 PM - 12:58 PM', 0),
(32, 13, 3, 2025, 'aaaa', '2:45 PM - 7:48 PM', 1),
(33, 14, 3, 2025, 'aaaaaaaaaaaaaaaaaaaaaaaa', '12:55 PM - 12:58 PM', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Indexek a kiírt táblákhoz
--

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
-- AUTO_INCREMENT a táblához `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `user_events`
--
ALTER TABLE `user_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

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
