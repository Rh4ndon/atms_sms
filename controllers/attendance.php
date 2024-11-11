<?php
include '../models/functions.php';

if (isset($_POST['student_id'])) {
    $student_id = $_POST['student_id'];
    $record = getRecord($table, $student_id);
    header('Content-Type: application/json');
    if ($record) {
        $_SESSION['student_id'] = $student_id;
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid student ID']);
    }
}
