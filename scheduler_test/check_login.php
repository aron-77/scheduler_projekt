<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    echo json_encode(array('loggedIn' => true));
} else {
    echo json_encode(array('loggedIn' => false));
}
?>