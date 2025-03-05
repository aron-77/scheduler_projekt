<?php
header('Content-Type: application/json');
require_once ('db_connect.php');

$sql = "SELECT * FROM events";
$result = $conn->query($sql);

$events = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row['completed'] = (bool) $row['completed']; // Konvertáljuk a completed mezőt boolean-ra
        $events[] = $row;
    }
}

echo json_encode($events);

$conn->close();
?>