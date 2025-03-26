<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['loggedIn']) || !$_SESSION['loggedIn']) {
    echo json_encode(['error' => 'User not logged in']);
    exit;
}

// Assuming the user's information is stored in the session
if (isset($_SESSION['username'])) {
    $userInfo = [
        'username' => $_SESSION['username'], // Adjust based on your session variable
        // Add other user information if needed
    ];
    echo json_encode($userInfo);
} else {
    echo json_encode(['error' => 'Username not found']);
}
?>