<?php
session_start();
header('Content-Type: application/json');
require_once 'db_connect.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(array('success' => false, 'message' => 'Not logged in'));
    exit;
}

$user_id = $_SESSION['user_id'];
$day = $_POST['day'];
$month = $_POST['month'];
$year = $_POST['year'];
$title = $_POST['title'];
$time = $_POST['time'];
$category = $_POST['category'];

$stmt = $conn->prepare("INSERT INTO events (day, month, year, title, time, category) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("iiisss", $day, $month, $year, $title, $time, $category);

if ($stmt->execute()) {
    $event_id = $conn->insert_id;
    $stmt2 = $conn->prepare("INSERT INTO user_events (user_id, event_id) VALUES (?, ?)");
    $stmt2->bind_param("ii", $user_id, $event_id);
    if ($stmt2->execute()) {
        echo json_encode(array('success' => true, 'message' => 'Esemény sikeresen hozzáadva'));
    } else {
        echo json_encode(array('success' => false, 'message' => 'Error: ' . $stmt2->error));
    }
    $stmt2->close();
} else {
    echo json_encode(array('success' => false, 'message' => 'Error: ' . $stmt->error));
}

$stmt->close();
$conn->close();
?>