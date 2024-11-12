<?php
include '../models/functions.php';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['attendance_id'])) {
        $attendance_id = $_POST['attendance_id'];

        // Perform the delete operation
        if (deleteRecord('attendance', 'attendance_id = ' . $attendance_id)) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Failed to delete attendance record.',
                'debug' => 'Delete query failed.'
            ]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid request parameters.']);
    }
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'An unexpected error occurred.', 'debug' => $e->getMessage()]);
}
