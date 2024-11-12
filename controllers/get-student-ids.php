<?php
include '../models/functions.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['section_id'])) {
    $section_id = $_GET['section_id'];

    // Fetch student IDs based on section_id
    $students = getAllRecords('students', 'WHERE section_id = ' . $section_id);

    if ($students) {
        $student_ids = array_column($students, 'student_id');
        echo json_encode(['status' => 'success', 'student_ids' => $student_ids]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No students found for this section.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request or section_id not provided.']);
}
