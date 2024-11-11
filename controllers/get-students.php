<?php
include '../models/functions.php';

// Handle the incoming GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['section_id'])) {
    $section_id = $_GET['section_id'];

    // Get all the students in the database table students using getAllRecords function
    $students = getAllRecords('students', 'WHERE section_id = ' . $section_id . ' ORDER BY last_name');

    // Send a success response
    echo json_encode(['status' => 'success', 'students' => $students]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request or section_id not provided']);
}
