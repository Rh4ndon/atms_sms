<?php
include '../models/functions.php';

// Handle the incoming POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON payload from the request body
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // get all the sections in the database table sections use getAllRecords function
    $sections = getAllRecords('sections', 'ORDER BY grade, name');
    // Send a success response
    echo json_encode(['status' => 'success', 'sections' => $sections]);
}
