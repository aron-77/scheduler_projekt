<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "scheduler";

//kapcsolat létrehozása
$conn = mysqli_connect($servername, $username, $password, $dbname);

//ha nem jött létre a kapcsolat
if (!$conn) {
    die("A kapcsolat nem jött létre: ".mysqli_connect_error());