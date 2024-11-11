<?php
include '../models/functions.php';

if (isset($_GET['student_id']) && isset($_GET['section_id'])) {
    $student_id = $_GET['student_id'];
    $section_id = $_GET['section_id'];

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

        // Redirect to the class page
        header('Location: ../admin/class.html?section_id=' . $section_id);
        exit;
    } else {
        // Student record not found, redirect with an error message
        header('Location: ../admin/class.html?section_id=' . $section_id . '&error=Student not found');
        exit;
    }
}
