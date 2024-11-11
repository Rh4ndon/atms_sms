<?php
include '../models/functions.php';

// Handle the incoming POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON payload from the request body
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Validate the input data
    if (isset($data['name']) && isset($data['grade'])) {
        //Make sure that there are no same section name
        $record = getRecord('sections', "name = '$data[name]'");
        if ($record) {
            echo json_encode(['status' => 'error', 'message' => 'Section already exists']);
            exit;
        } else {

            $name = $data['name'];
            $grade = $data['grade'];

            // Insert the record into the database
            $insertData = [
                'name' => $name,
                'grade' => $grade
            ];

            if (insertRecord('sections', $insertData)) {
                // Send a success response
                echo json_encode(['status' => 'success']);
            } else {
                // Send an error response
                echo json_encode(['status' => 'error', 'message' => 'Failed to insert record']);
            }
        }
    } else {
        // Send an error response for missing data
        echo json_encode(['status' => 'error', 'message' => 'Invalid input data']);
    }
} else {
    // Send an error response for invalid request method
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
