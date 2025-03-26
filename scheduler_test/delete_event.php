<?php
// delete_event.php

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "task_manager";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // Send error response in JSON format
    http_response_code(500); // Internal Server Error
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Check if the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Only DELETE is supported.']);
    exit;
}

// Get the event ID from the query string
$eventId = $_GET['id'] ?? null;

if (is_null($eventId)) {
    // Handle missing event ID
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => 'Event ID is missing.']);
    exit;
}

// Sanitize the event ID to prevent SQL injection
$eventId = $conn->real_escape_string($eventId);

try {
    // Start a transaction
    $conn->begin_transaction();

    // Delete related entries in user_events table
    $stmt = $conn->prepare("DELETE FROM user_events WHERE event_id = ?");
    $stmt->bind_param("i", $eventId);
    $stmt->execute();
    $stmt->close();

    // Prepare and execute the DELETE statement
    $stmt = $conn->prepare("DELETE FROM events WHERE id = ?");
    $stmt->bind_param("i", $eventId);
    $stmt->execute();

    // Check if any rows were affected (if the event existed)
    if ($stmt->affected_rows > 0) {
        // Commit the transaction
        $conn->commit();
        echo json_encode(['success' => true, 'message' => 'Event deleted successfully.']);
    } else {
        http_response_code(404); // Not Found
        echo json_encode(['success' => false, 'message' => 'Event not found.']);
    }
    $stmt->close();
} catch (Exception $e) {
    // Rollback the transaction in case of error
    $conn->rollback();
    http_response_code(500); // Internal Server Error
    echo json_encode(['success' => false, 'message' => 'Error deleting event: ' . $e->getMessage()]);
} finally {
    $conn->close();
}
?>