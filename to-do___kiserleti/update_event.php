<?php
header('Content-Type: application/json');
require_once ('db_connect.php');

$id = $_POST['id'];
$completed = $_POST['completed'];

$sql = "UPDATE events SET completed = $completed WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array('success' => true, 'message' => 'Event updated successfully'));
} else {
    echo json_encode(array('success' => false, 'message' => 'Error: ' . $sql . '<br>' . $conn->error));
}

$conn->close();
?>