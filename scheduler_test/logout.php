<?php
session_start();
session_destroy();
header('Content-Type: application/json');
echo json_encode(array('success' => true, 'message' => 'Sikeres kijelentkezés'));
?>