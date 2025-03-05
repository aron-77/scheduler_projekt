<?php
require_once 'db_connect.php';

$day = $_POST['day'];
$month = $_POST['month'];
$year = $_POST['year'];
$title = $_POST['title'];
$time = $_POST['time'];

$sql = "INSERT INTO events (day, month, year, title, time) VALUES ($day, $month, $year, '$title', '$time')";

if ($conn->query($sql) === TRUE) {
    echo "Event added successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>