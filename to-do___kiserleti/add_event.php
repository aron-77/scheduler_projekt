<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

$day = $_POST['day'];
$month = $_POST['month'];
$year = $_POST['year'];
$title = $_POST['title'];
$time = $_POST['time'];

$sql = "INSERT INTO events (day, month, year, title, time) VALUES ($day, $month, $year, '$title', '$time')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array('success' => true, 'message' => 'Event added successfully'));
} else {
    echo json_encode(array('success' => false, 'message' => 'Error: ' . $sql . '<br>' . $conn->error));
}

$conn->close();
?>