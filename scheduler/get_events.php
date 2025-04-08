<?php
session_start();
header('Content-Type: application/json');
require_once 'db_connect.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(array('success' => false, 'message' => 'Nincs bejelentkezve'));
    exit;
}

$user_id = $_SESSION['user_id'];
$category_filter = isset($_GET['category']) ? $_GET['category'] : null;

$sql = "SELECT events.* FROM events 
        JOIN user_events ON events.id = user_events.event_id
        WHERE user_events.user_id = ?";

if ($category_filter) {
    $sql .= " AND events.category = ?";
}

$stmt = $conn->prepare($sql);

if ($category_filter) {
    $stmt->bind_param("is", $user_id, $category_filter);
} else {
    $stmt->bind_param("i", $user_id);
}

$stmt->execute();
$result = $stmt->get_result();

$events = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row['completed'] = (bool) $row['completed'];
        $events[] = $row;
    }
}

echo json_encode($events);

$stmt->close();
$conn->close();
?>