<?php
include '../models/functions.php';

// Handle the incoming GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['section_id'])) {
    $section_id = $_GET['section_id'];

    // Get the section details from the database table sections using getAllRecords function
    $section_details = getAllRecords('sections', 'WHERE section_id = ' . $section_id);

    // Since getAllRecords returns an array, we need to extract the first (and only) record
    if (!empty($section_details)) {
        $section = $section_details[0];
        // Send a success response with section details
        echo json_encode(['status' => 'success', 'name' => $section['name'], 'grade' => $section['grade']]);
    } else {
        // Send an error response if no section is found
        echo json_encode(['status' => 'error', 'message' => 'Section not found']);
    }
} else {
    // Send an error response for invalid request
    echo json_encode(['status' => 'error', 'message' => 'Invalid request or section_id not provided']);
}
