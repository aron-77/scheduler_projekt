<?php
$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "scheduler_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the POST data
$user_id = $_POST['user_id'];
$task_id = $_POST['task_id'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO usertask (user_id, task_id) VALUES (?, ?)");
$stmt->bind_param("ii", $user_id, $task_id);

if ($stmt->execute()) {
    echo json_encode(["message" => "A feladat sikeresen mentve"]);
} else {
    echo json_encode(["message" => "Hiba a feladat mentése közben"]);
}

$stmt->close();
$conn->close();
?>