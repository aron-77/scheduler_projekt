<?php
require_once 'db_connect.php';

$id = $_POST['id'];

$sql = "DELETE FROM events WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo "Event deleted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
