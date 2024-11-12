$(document).ready(function() {
  // Set admin name from user session
  const userSession = JSON.parse(localStorage.getItem('userSession'));
  if (userSession) {
    document.getElementById('name').innerText = `${userSession.first_name} ${userSession.last_name}`;
  } else {
    console.error('No user session found in localStorage.');
  }

  // Append the modal to the body
  $('body').append(`
    <div class="modal fade" id="settingsModal" tabindex="-1" aria-labelledby="settingsModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="settingsModalLabel">Edit Admin Account</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="adminSettingsForm" enctype="multipart/form-data">
              <div class="mb-3">
                <label for="avatar" class="form-label">Profile Picture (optional)</label>
                <input type="file" class="form-control" id="avatar" name="avatar">
              </div>
              <div class="mb-3">
                <label for="bgImage" class="form-label">QR Background Image (optional)</label>
                <input type="file" class="form-control" id="bgImage" name="bg_image">
              </div>
              <div class="mb-3">
                <label for="section" class="form-label">Section Image (optional)</label>
                <input type="file" class="form-control" id="section" name="section">
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" name="username" required>
              </div>
              <div class="mb-3">
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="firstName" name="firstName" required>
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="lastName" name="lastName" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" required>
              </div>
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `);

  // Settings Button Click Event
  $('#settingsButton').click(function(event) {
    event.preventDefault(); // Prevent default behavior of the link
    // Fetch admin details
    fetchAdminDetails();
  });

  function fetchAdminDetails() {
    $.ajax({
      type: "GET",
      url: "../controllers/get-admin-details.php",
      dataType: "json",
      success: function(response) {
        if (response.status === "success") {
          $('#username').val(response.admin.username);
          $('#firstName').val(response.admin.firstname);
          $('#lastName').val(response.admin.lastname);
          $('#settingsModal').modal('show'); // Show the modal
        } else {
          console.error("Error: ", response.debug);
          showToast('errorToast', response.message || 'Failed to retrieve admin details.');
        }
      },
      error: function(error) {
        console.error("An error occurred:", error);
        showToast('errorToast', 'An error occurred during the request.');
      }
    });
  }

  $('#adminSettingsForm').submit(function(event) {
    event.preventDefault();
    let formData = new FormData(this);

    $.ajax({
      type: "POST",
      url: "../controllers/update-admin-details.php",
      data: formData,
      processData: false, // Important
      contentType: false, // Important
      dataType: "json",
      success: function(response) {
        if (response.status === "success") {
          // Update localStorage with new admin details
          const updatedUserSession = {
            ...userSession, // Keep other user session data
            first_name: $('#firstName').val(),
            last_name: $('#lastName').val(),
            username: $('#username').val()
          };
          localStorage.setItem('userSession', JSON.stringify(updatedUserSession));
          document.getElementById('name').innerText = `${updatedUserSession.first_name} ${updatedUserSession.last_name}`;

          // Reload modal details to reflect the latest data
          fetchAdminDetails();

          $('#settingsModal').modal('hide');
          showToast('successToast', response.message);
        } else {
          console.error("Error: ", response.debug);
          showToast('errorToast', response.message || 'Failed to update admin details.');
        }
      },
      error: function(error) {
        console.error("An error occurred:", error);
        showToast('errorToast', 'An error occurred during the update.');
      }
    });
  });

  function showToast(type, message) {
    $('#' + type + ' .toast-body').text(message);
    $('#' + type).toast('show');
  }
});
