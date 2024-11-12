<?php
include '../models/functions.php';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['section_id'], $_GET['student_id'])) {
        $section_id = $_GET['section_id'];
        $student_id = $_GET['student_id'];

        // Debug output
        error_log("Section ID: " . $section_id);
        error_log("Student ID: " . $student_id);

        // Fetch student details
        $student = getRecordMultiTable(
            'students',
            'sections',
            'students.section_id = sections.section_id',
            'students.student_id = ' . $student_id
        );

        // Debug output
        error_log("Student Data: " . json_encode($student));

        // Fetch attendance records
        $attendance = getAllRecords('attendance', 'WHERE student_id = ' . $student_id);

        // Debug output
        error_log("Attendance Data: " . json_encode($attendance));

        if ($student && $attendance) {
            echo json_encode([
                'status' => 'success',
                'section' => $student, // Assuming the section data is included within student details
                'student' => $student,
                'attendance' => $attendance
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Failed to retrieve student details or attendance records.',
                'debug' => [
                    'student' => $student,
                    'attendance' => $attendance
                ]
            ]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid request parameters.']);
    }
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'An unexpected error occurred.', 'debug' => $e->getMessage()]);
}
