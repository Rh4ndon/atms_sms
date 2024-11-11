<?php
include '../models/functions.php';

// Handle the incoming POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $student_id = $_POST['student_id'];

    // Get the form data
    $data = [
        'first_name' => $_POST['first_name'],
        'last_name' => $_POST['last_name'],
        'gender' => $_POST['gender'],
        'parent' => $_POST['parent'],
        'parent_no' => $_POST['parent_no'],
        'section_id' => $_POST['section_id']
    ];

    // Check if a new profile picture is uploaded
    if (isset($_FILES['profile']) && $_FILES['profile']['error'] === UPLOAD_ERR_OK) {
        // Fetch the old profile picture to delete it later
        $student = getRecord('students', 'student_id = ' . $student_id);
        if ($student) {
            $oldProfilePicture = $student['profile'];
            $oldProfilePicturePath = '../uploads/profile_pictures/' . $oldProfilePicture;

            // Handle the new profile picture upload
            $fileTmpPath = $_FILES['profile']['tmp_name'];
            $fileName = $_FILES['profile']['name'];
            $fileNameCmps = explode(".", $fileName);
            $fileExtension = strtolower(end($fileNameCmps));
            $newFileName = md5(time() . $fileName) . '.' . $fileExtension;

            $uploadFileDir = '../uploads/profile_pictures/';
            $destPath = $uploadFileDir . $newFileName;

            if (move_uploaded_file($fileTmpPath, $destPath)) {
                $data['profile'] = $newFileName;

                // Delete the old profile picture if it exists
                if (file_exists($oldProfilePicturePath)) {
                    unlink($oldProfilePicturePath);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'There was an error moving the uploaded file']);
                exit;
            }
        }
    }

    // Update the student record in the database
    $result = editRecord('students', $data, 'student_id = ' . $student_id);

    // Debugging statements
    if ($result) {
        error_log("Update successful for student ID: " . $student_id);
        echo json_encode(['status' => 'success']);
    } else {
        error_log("Update failed for student ID: " . $student_id);
        echo json_encode(['status' => 'error', 'message' => 'An error occurred while updating the record']);
    }
}
