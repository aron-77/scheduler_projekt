<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Sanitize the input
$id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
$completed = filter_input(INPUT_POST, 'completed', FILTER_SANITIZE_NUMBER_INT);

if (empty($id) || !isset($completed)) {
    echo json_encode(['success' => false, 'message' => 'Event ID and/or completed status are required']);
    exit;
}

$stmt = $conn->prepare("UPDATE events SET completed = ? WHERE id = ?");
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
    exit;
}
$stmt->bind_param("ii", $completed, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Event updated successfully']);
    exit;
} else {
    echo json_encode(['success' => false, 'message' => 'Error updating event: ' . $stmt->error]);
    exit;
}

$stmt->close();
$conn->close();
?>