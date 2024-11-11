<?php
include '../models/functions.php';

// Handle the incoming POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the other form data
    $data = [
        'first_name' => $_POST['first_name'],
        'last_name' => $_POST['last_name'],
        'parent' => $_POST['parent'],
        'parent_no' => $_POST['parent_no'],
        'gender' => $_POST['gender'],
        'section_id' => $_POST['section_id'],
        'status' => 'Active'
    ];

    // Make sure there's no duplicate record
    $record = getRecord('students', "first_name = '{$data['first_name']}' AND last_name = '{$data['last_name']}' AND section_id = '{$data['section_id']}'");
    if ($record) {
        echo json_encode(['status' => 'error', 'message' => 'Student already exists']);
        exit;
    }

    // Get the profile picture from the uploaded files
    if (isset($_FILES['profile']) && $_FILES['profile']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['profile']['tmp_name'];
        $fileName = $_FILES['profile']['name'];
        $fileSize = $_FILES['profile']['size'];
        $fileType = $_FILES['profile']['type'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));
        $newFileName = md5(time() . $fileName) . '.' . $fileExtension;

        // Directory in which the uploaded file will be moved
        $uploadFileDir = '../uploads/profile_pictures/';
        $destPath = $uploadFileDir . $newFileName;

        if (move_uploaded_file($fileTmpPath, $destPath)) {
            // File is successfully uploaded
            $data['profile'] = $newFileName;
        } else {
            echo json_encode(['status' => 'error', 'message' => 'There was an error moving the uploaded file']);
            exit;
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No file uploaded or there was an upload error']);
        exit;
    }

    // Insert the student record into the database table students
    $result = insertRecord('students', $data);
    if ($result) {
        // Send a success response
        echo json_encode(['status' => 'success', 'student_id' => $result]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'An error occurred while inserting the record']);
    }
}
