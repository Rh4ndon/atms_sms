$(document).ready(function() {
    fetchDashboardData();
  
    function fetchDashboardData() {
      $.ajax({
        type: "GET",
        url: "../controllers/dashboard-data.php",
        dataType: "json",
        success: function(response) {
          if (response.status === "success") {
            $('#totalStudents').text(response.totalStudents);
            $('#todaysAttendance').text(response.todaysAttendance);
            $('#totalAttendanceRecords').text(response.totalAttendanceRecords);
            renderAttendanceChart(response.attendanceData);
          } else {
            console.error("Error: ", response.debug);
            alert('Failed to retrieve dashboard data.');
          }
        },
        error: function(error) {
          console.error("An error occurred:", error);
          alert('An error occurred while fetching dashboard data.');
        }
      });
    }
  
    function renderAttendanceChart(data) {
      const ctx = document.getElementById('attendanceChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.dates,
          datasets: [{
            label: 'Attendance',
            data: data.values,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true
          }]
        },
        options: {
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  });
  