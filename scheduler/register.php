<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

if ($conn->connect_error) {
    echo json_encode(array('success' => false, 'message' => 'Az adatbázis-csatlakozás meghiúsult: ' . $conn->connect_error));
    exit;
}

if (empty($_POST['username']) || empty($_POST['password'])) {
    echo json_encode(array('success' => false, 'message' => 'Felhasználónév és jelszó szükséges'));
    exit;
}

$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
if (!$stmt) {
    echo json_encode(array('success' => false, 'message' => 'SQL preparácció meghiúsult: ' . $conn->error));
    exit;
}

$stmt->bind_param("ss", $username, $password);

if ($stmt->execute()) {
    echo json_encode(array('success' => true, 'message' => 'Sikeres regisztráció'));
} else {
    echo json_encode(array('success' => false, 'message' => 'Error: ' . $stmt->error));
}

$stmt->close();
$conn->close();
?>