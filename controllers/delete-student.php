<?php
include '../models/functions.php';

if (isset($_POST['student_id']) && isset($_POST['section_id'])) {
    $student_id = $_POST['student_id'];
    $section_id = $_POST['section_id'];

    // Fetch the student record to get the profile picture filename
    $student = getRecord('students', 'student_id = ' . $student_id);
    if ($student) {
        $profilePicture = $student['profile'];

        // Delete the profile picture file from the folder
        $profilePicturePath = '../uploads/profile_pictures/' . $profilePicture;
        if (file_exists($profilePicturePath)) {
            unlink($profilePicturePath);
        }

        // Delete the student record from the database
        deleteRecord('students', 'student_id = ' . $student_id);

        // Send a success response
        echo json_encode(['status' => 'success']);
    } else {
        // Student record not found, send an error response
        echo json_encode(['status' => 'error', 'message' => 'Student not found']);
    }
} else {
    // Invalid request, send an error response
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
}
