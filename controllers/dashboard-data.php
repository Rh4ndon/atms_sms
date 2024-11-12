<?php
include '../models/functions.php';

try {
    // Fetch total number of students
    $totalStudents = countAllRecords('students');

    // Fetch today's attendance records
    $todaysDate = date('Y-m-d');
    $todaysAttendance = countAllRecords('attendance', "date = '$todaysDate'");

    // Fetch total number of attendance records
    $totalAttendanceRecords = countAllRecords('attendance');

    // Fetch attendance data for the chart
    $attendanceData = getAttendanceData(); // Implement this function to fetch dates and values for the chart

    echo json_encode([
        'status' => 'success',
        'totalStudents' => $totalStudents,
        'todaysAttendance' => $todaysAttendance,
        'totalAttendanceRecords' => $totalAttendanceRecords,
        'attendanceData' => $attendanceData
    ]);
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'An unexpected error occurred.', 'debug' => $e->getMessage()]);
}
