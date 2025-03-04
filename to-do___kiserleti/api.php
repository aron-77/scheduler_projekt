<?php
// Adatbázis kapcsolat
$servername = "localhost";
$username = "felhasznalo"; // Módosítsd a felhasználónevedre
$password = "jelszo"; // Módosítsd a jelszavadra
$dbname = "feladatkezelo";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Kapcsolódási hiba: " . $conn->connect_error);
}

// REST API kezelése
$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

header('Content-Type: application/json');

switch ($method) {
    case 'GET':
        // Összes feladat lekérdezése
        $sql = "SELECT * FROM feladatok";
        $result = $conn->query($sql);

        $feladatok = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $feladatok[] = $row;
            }
        }
        echo json_encode($feladatok);
        break;

    case 'POST':
        // Új feladat hozzáadása
        $data = json_decode(file_get_contents('php://input'), true);

        $feladat_nev = $data['feladat_nev'];
        $feladat_kezdete = $data['feladat_kezdete'];
        $feladat_vege = $data['feladat_vege'];
        $datum = $data['datum'];
        $elvegezve = $data['elvegezve'] ?? false; // Alapértelmezett: false

        $sql = "INSERT INTO feladatok (feladat_nev, feladat_kezdete, feladat_vege, datum, elvegezve) VALUES ('$feladat_nev', '$feladat_kezdete', '$feladat_vege', '$datum', '$elvegezve')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['message' => 'Feladat hozzáadva']);
        } else {
            echo json_encode(['error' => $conn->error]);
        }
        break;

    case 'PUT':
        // Feladat frissítése (elvegezve állapot módosítása)
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];
        $elvegezve = $data['elvegezve'];

        $sql = "UPDATE feladatok SET elvegezve = '$elvegezve' WHERE id = '$id'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['message' => 'Feladat frissítve']);
        } else {
            echo json_encode(['error' => $conn->error]);
        }
        break;

    case 'DELETE':
        // Feladat törlése
        $id = $_GET['id'];

        $sql = "DELETE FROM feladatok WHERE id = '$id'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['message' => 'Feladat törölve']);
        } else {
            echo json_encode(['error' => $conn->error]);
        }
        break;

    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(['error' => 'Nem támogatott metódus']);
        break;
}

$conn->close();
?>