<?php
session_start();
header('Content-Type: application/json');
require_once 'db_connect.php';

$username = $_POST['username'];
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($user_id, $hashed_password);
    $stmt->fetch();

    if (password_verify($password, $hashed_password)) {
        $_SESSION['user_id'] = $user_id;
        echo json_encode(array('success' => true, 'message' => 'Sikeres bejelentkezés'));
    } else {
        echo json_encode(array('success' => false, 'message' => 'Helytelen jelszó'));
    }
} else {
    echo json_encode(array('success' => false, 'message' => 'Felhasználó nem található'));  
}

$stmt->close();
$conn->close();
?>