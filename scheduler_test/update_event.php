<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

$id = $_POST['id'];
$completed = $_POST['completed'];

$stmt = $conn->prepare("UPDATE events SET completed = ? WHERE id = ?");
$stmt->bind_param("ii", $completed, $id);

if ($stmt->execute()) {
    echo json_encode(array('success' => true, 'message' => 'Event updated successfully'));
} else {
    echo json_encode(array('success' => false, 'message' => 'Error: ' . $stmt->error));
}

$stmt->close();
$conn->close();
?>