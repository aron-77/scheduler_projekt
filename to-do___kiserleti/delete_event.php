<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

$id = $_POST['id'];

$stmt = $conn->prepare("DELETE FROM events WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(array('success' => true, 'message' => 'Event deleted successfully'));
} else {
    echo json_encode(array('success' => false, 'message' => 'Error: ' . $stmt->error));
}

$stmt->close();
$conn->close();
?>