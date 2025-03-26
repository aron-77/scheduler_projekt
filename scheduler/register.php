<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

// Check if the database connection is successful
if ($conn->connect_error) {
    echo json_encode(array('success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error));
    exit;
}

// Validate input data
if (empty($_POST['username']) || empty($_POST['password'])) {
    echo json_encode(array('success' => false, 'message' => 'Username and password are required'));
    exit;
}

$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password

$stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
if (!$stmt) {
    echo json_encode(array('success' => false, 'message' => 'SQL preparation failed: ' . $conn->error));
    exit;
}

$stmt->bind_param("ss", $username, $password);

if ($stmt->execute()) {
    echo json_encode(array('success' => true, 'message' => 'Registration successful'));
} else {
    echo json_encode(array('success' => false, 'message' => 'Error: ' . $stmt->error));
}

$stmt->close();
$conn->close();
?>