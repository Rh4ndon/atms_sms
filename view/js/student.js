  
      $(document).ready(function() {
        // Extract section_id and student_id from URL
        const urlParams = new URLSearchParams(window.location.search);
        const sectionId = urlParams.get('section_id');
        const studentId = urlParams.get('student_id');
      
        // Fetch student details and attendance records
        fetchStudentDetails(sectionId, studentId);
      
        function fetchStudentDetails(sectionId, studentId) {
          $.ajax({
            type: "GET",
            url: `../controllers/get-student-record.php?section_id=${sectionId}&student_id=${studentId}`,
            dataType: "json",
            success: function(response) {
              if (response.status === "success") {
                $('#section').text(`${response.section.grade} - ${response.section.name}`);
                $('#student').text(`${response.student.first_name} ${response.student.last_name} - ${studentId}`);
                $('#back').attr('href', `class.html?section_id=${sectionId}`);
      
                const attendanceRecords = response.attendance;
                const tbody = $('#studentTable tbody');
                tbody.empty();
      
                attendanceRecords.forEach(record => {
                  const time = new Date(`1970-01-01T${record.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  const date = new Date(record.date).toLocaleDateString();
      
                  tbody.append(`
                    <tr data-id="${record.attendance_id}">
                      <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${record.attendance_id}</strong></td>
                      <td>${time}</td>
                      <td><span class="badge bg-label-primary me-1">${record.remark}</span></td>
                      <td>${date}</td>
                      <td>
                        <a class="dropdown-item delete-record" href="javascript:void(0);"><i class="bx bx-trash me-1"></i> Delete</a>
                      </td>
                    </tr>
                  `);
                });
      
                // Attach delete event
                $('.delete-record').click(function() {
                  const recordId = $(this).closest('tr').data('id');
                  $('#deleteModal').data('recordId', recordId).modal('show');
                });
              } else {
                console.error("Error: ", response.debug);
                showToast('errorToast', response.message || 'Failed to retrieve student details or attendance records.');
              }
            },
            error: function(error) {
              console.error("An error occurred:", error);
              showToast('errorToast', 'An error occurred during the request.');
            }
          });
        }
      
        // Handle delete confirmation
        $('#confirmDelete').click(function() {
          const recordId = $('#deleteModal').data('recordId');
          $.ajax({
            type: "POST",
            url: `../controllers/delete-attendance.php`,
            data: { attendance_id: recordId },
            dataType: "json",
            success: function(response) {
              if (response.status === "success") {
                $(`tr[data-id="${recordId}"]`).remove();
                $('#deleteModal').modal('hide');
                showToast('successToast', 'Attendance record deleted successfully.');
              } else {
                console.error("Error: ", response.debug);
                showToast('errorToast', response.message || 'Failed to delete attendance record.');
              }
            },
            error: function(error) {
              console.error("An error occurred:", error);
              showToast('errorToast', 'An error occurred during deletion.');
            }
          });
        });

      
        function showToast(type, message) {
          $('#' + type + ' .toast-body').text(message);
          $('#' + type).toast('show');
        }
      });