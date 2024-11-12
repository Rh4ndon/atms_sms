<?php
include '../models/functions.php';

function convertToJpg($source, $destination)
{
    $image = imagecreatefromstring(file_get_contents($source));
    if ($image === false) {
        return false;
    }
    $success = imagejpeg($image, $destination);
    imagedestroy($image);
    return $success;
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username'], $_POST['firstName'], $_POST['lastName'], $_POST['password'])) {
        $username = $_POST['username'];
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $password = sha1(md5($_POST['password']));

        $data = [
            'username' => $username,
            'firstname' => $firstName,
            'lastname' => $lastName,
            'password' => $password
        ];

        // Update admin details in the database
        if (editRecord('admin', $data, 'admin_id = 1')) { // Assuming admin_id is 1
            $responseMessage = 'Admin details updated successfully.';

            // Handle profile picture upload
            if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] === UPLOAD_ERR_OK) {
                $avatarPath = '../view/img/avatar.jpg';
                if (convertToJpg($_FILES['avatar']['tmp_name'], $avatarPath)) {
                    $responseMessage .= ' Avatar updated successfully.';
                } else {
                    $responseMessage .= ' Failed to update avatar.';
                }
            }

            // Handle QR background image upload
            if (isset($_FILES['bg_image']) && $_FILES['bg_image']['error'] === UPLOAD_ERR_OK) {
                $bgImagePath = '../view/img/Bg.png';
                if (convertToJpg($_FILES['bg_image']['tmp_name'], $bgImagePath)) {
                    $responseMessage .= ' QR background updated successfully.';
                } else {
                    $responseMessage .= ' Failed to update QR background.';
                }
            }

            // Handle section image upload
            if (isset($_FILES['section']) && $_FILES['section']['error'] === UPLOAD_ERR_OK) {
                $sectionPath = '../view/img/section.jpeg';
                if (convertToJpg($_FILES['section']['tmp_name'], $sectionPath)) {
                    $responseMessage .= ' Section image updated successfully.';
                } else {
                    $responseMessage .= ' Failed to update section image.';
                }
            }

            echo json_encode(['status' => 'success', 'message' => $responseMessage]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Failed to update admin details.',
                'debug' => 'Update query failed.'
            ]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid request parameters.']);
    }
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'An unexpected error occurred.', 'debug' => $e->getMessage()]);
}
