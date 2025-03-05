<?php
require_once 'db_connect.php';

$id = $_POST['id'];
$completed = $_POST['completed'];

$sql = "UPDATE events SET completed = $completed WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo "Event updated successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
