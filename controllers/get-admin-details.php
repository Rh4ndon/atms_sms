<?php
include '../models/functions.php';

try {
    // Fetch admin details
    $admin = getRecord('admin', 'admin_id = 1'); // Assuming there's only one admin or you have the admin_id

    if ($admin) {
        echo json_encode([
            'status' => 'success',
            'admin' => $admin
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to retrieve admin details.']);
    }
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'An unexpected error occurred.', 'debug' => $e->getMessage()]);
}
