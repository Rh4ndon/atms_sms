<?php
include '../models/functions.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Set the time zone to Manila
    date_default_timezone_set('Asia/Manila');

    $student_id = $_POST['student_id'];

    // Fetch student info for verification
    $student = getRecordMultiTable(
        'students',
        'sections',
        'students.section_id = sections.section_id',
        'students.student_id = ' . $student_id
    );

    if (!$student) {
        echo json_encode(['status' => 'warning', 'message' => 'Student not found in the database. Please check the ID and try again.']);
        exit;
    }

    // Avoid duplicate records within 15 seconds
    $current_time = new DateTime();
    $last_record = getLastAttendanceRecord($student_id);

    if ($last_record) {
        $last_record_datetime = new DateTime($last_record['date'] . ' ' . $last_record['time']);
        $seconds_difference = $current_time->getTimestamp() - $last_record_datetime->getTimestamp();

        // Check the time difference
        if ($seconds_difference < 20) {
            echo json_encode(['status' => 'warning', 'message' => 'Attendance has already been recorded. Please wait 20 seconds before trying again.']);
            exit;
        }
    }

    // Record the attendance
    $date = date('Y-m-d');
    $time = date('H:i:s');
    $remark = isTimeIn($student_id, $date) ? 'time-out' : 'time-in';

    $data = [
        'student_id' => $student_id,
        'date' => $date,
        'time' => $time,
        'remark' => $remark
    ];

    if (insertRecord('attendance', $data)) {
        // Send SMS notification
        $number = $student['parent_no'];
        $message = "Your child " . $student['first_name'] . " " . $student['last_name'] . " has " . $remark . " at " . $time;
        sendSMS($number, $message);

        echo json_encode(['status' => 'success', 'student' => $student]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to record attendance.']);
    }
}

function sendSMS($number, $message)
{
    $url = 'https://semaphore.co/api/v4/messages';
    $data = array(
        'apikey' => '7fecf9dbaf4acf5b35d55ae1f0b366fe',
        'number' => $number,
        'message' => $message,
        'sendername' => 'TMS'
    );

    $options = array(
        'http' => array(
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data),
        ),
    );
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    if ($result === FALSE) {
        error_log('Failed to send SMS.');
    }
}
