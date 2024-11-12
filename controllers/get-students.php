<?php
include '../models/functions.php';

// Handle the incoming GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['section_id'])) {
    $section_id = $_GET['section_id'];

    // Get the current section details
    $current_section = getRecord('sections', 'section_id = ' . $section_id);

    if ($current_section) {
        // Get all the students in the current section
        $students = getAllRecords('students', 'WHERE section_id = ' . $section_id . ' ORDER BY last_name');

        // Include the current section details in each student record
        foreach ($students as &$student) {
            $student['section_name'] = $current_section['name'];
            $student['grade'] = $current_section['grade'];
        }

        // Get all sections details
        $sections = getAllRecords('sections', 'ORDER BY grade, name');

        // Send a success response
        echo json_encode([
            'status' => 'success',
            'students' => $students,
            'current_section' => $current_section,
            'sections' => $sections
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Current section not found']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request or section_id not provided']);
}
