<?php
include '../models/functions.php';

if (isset($_POST['section_id'])) {
    $section_id = $_POST['section_id'];

    // Fetch all students associated with the section
    $students = getAllRecords('students', 'WHERE section_id = ' . $section_id);

    // Iterate over each student to delete their profile picture and the student record
    foreach ($students as $student) {
        $profilePicture = $student['profile'];

        // Delete the profile picture file from the folder
        $profilePicturePath = '../uploads/profile_pictures/' . $profilePicture;
        if (file_exists($profilePicturePath)) {
            unlink($profilePicturePath);
        }

        // Delete the student record
        deleteRecord('students', 'student_id = ' . $student['student_id']);
    }

    // Delete the section record from the database
    $result = deleteRecord('sections', 'section_id = ' . $section_id);
    if ($result) {
        // Send a success response
        echo json_encode(['status' => 'success']);
    } else {
        // Send an error response
        echo json_encode(['status' => 'error', 'message' => 'An error occurred while deleting the section']);
    }
} else {
    // Send an error response for invalid request
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
}
