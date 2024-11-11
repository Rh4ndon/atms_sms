<?php
include '../models/functions.php';

// Handle the incoming POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $section_id = $_POST['section_id'];
    $data = [
        'grade' => $_POST['grade'],
        'name' => $_POST['name']
    ];

    // Update the section record in the database
    $result = editRecord('sections', $data, 'section_id = ' . $section_id);
    if ($result) {
        // Send a success response
        echo json_encode(['status' => 'success']);
    } else {
        // Send an error response
        echo json_encode(['status' => 'error', 'message' => 'An error occurred while updating the record']);
    }
} else {
    // Send an error response for invalid request
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
}
