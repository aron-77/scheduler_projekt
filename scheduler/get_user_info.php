<?php
session_start();

if (!isset($_SESSION['loggedIn']) || !$_SESSION['loggedIn']) {
    echo json_encode(['error' => 'Felhasználó nincs bejelentkezve']);
    exit;
}

if (isset($_SESSION['username'])) {
    $userInfo = [
        'username' => $_SESSION['username'],
    ];
    echo json_encode($userInfo);
} else {
    echo json_encode(['error' => 'Felhasználónév nem található']);
}
?>