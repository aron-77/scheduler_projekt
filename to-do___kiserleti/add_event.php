<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

$day = $_POST['day'];
$month = $_POST['month'];
$year = $_POST['year'];
$title = $_POST['title'];
$time = $_POST['time'];

$stmt = $conn->prepare("INSERT INTO events (day, month, year, title, time) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("iiiss", $day, $month, $year, $title, $time);

if ($stmt->execute()) {
    echo json_encode(array('success' => true, 'message' => 'Event added successfully'));
} else {
    echo json_encode(array('success' => false, 'message' => 'Error: ' . $stmt->error));
}

$stmt->close();
$conn->close();
?>