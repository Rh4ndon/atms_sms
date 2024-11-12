
  //Delete Student
  $(document).ready(function() {
    $(document).on('click', '.confirm-delete-btn', function() {
        var studentId = $(this).data('student-id');
        var sectionId = $(this).data('section-id');
        var modal = $(this).closest('.modal');

        $.ajax({
            type: "POST",
            url: "../controllers/delete-student.php",
            data: { student_id: studentId, section_id: sectionId },
            dataType: "json",
            success: function(response) {
                if (response.status === "success") {
                    showToast('successToast', "Student deleted successfully!");
                    modal.modal('hide'); // Hide the modal after success
                    loadStudents(); // Reload the students list or any necessary parts of the page
                } else {
                    showToast('errorToast', response.message);
                }
            },
            error: function(error) {
                console.error("An error occurred:", error);
                showToast('errorToast', "An error occurred during deletion.");
            }
        });
    });
});


//Edit Student
$(document).ready(function() {
  $(document).on('submit', '.editStudentForm', function(event) {
    event.preventDefault();
    var formId = $(this).attr('id');
    var studentId = formId.split('-')[1];
    var formData = new FormData(this);
    
    $.ajax({
      type: "POST",
      url: "../controllers/update-student.php",
      data: formData,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function(response) {
      
        if (response.status === "success") {
          showToast('successToast', "Student updated successfully!");
          $('#editModal-' + studentId).modal('hide'); // Hide the modal after success
          loadStudents(); // Reload the students list or any necessary parts of the page
        } else {
          showToast('errorToast', response.message);
        }
      },
      error: function(error) {
        console.error("An error occurred:", error);
        showToast('errorToast', "An error occurred during submission.");
      }
    });
  });
});


document.getElementById('printQr').addEventListener('click', function() {
  // Get section_id from URL
  const section_id = getSectionIdFromURL();

  // Make AJAX request to get student IDs
  $.ajax({
      url: '../controllers/get-student-ids.php',
      type: 'GET',
      data: { section_id: section_id },
      success: function(response) {
          if (response.status === 'success') {
              // Process the student IDs
              let studentIds = response.student_ids;
              let bgImagePath = '../view/img/Bg.png'; // Path to the background image

              // Generate QR codes for each student ID
              studentIds.forEach(function(student_id) {
                  // Create a new div element to hold the QR code
                  let qrDiv = document.createElement('div');
                  qrDiv.id = 'qrcode-' + student_id;
                  qrDiv.style.display = 'none';
                  document.body.appendChild(qrDiv);

                  // Generate the QR code
                  new QRCode(qrDiv, {
                      text: student_id,
                      width: 256, // Increased size of QR code
                      height: 256,
                      colorDark: "#000000", // QR code color
                      colorLight: "#ffffff", // QR code background
                      correctLevel: QRCode.CorrectLevel.H
                  });

                  // Wait for the QR code to be generated
                  setTimeout(function() {
                      let qrCanvas = qrDiv.querySelector('canvas');
                      let qrImageUrl = qrCanvas.toDataURL('image/png');

                      // Create a canvas to blend the QR code with the background image
                      let canvas = document.createElement('canvas');
                      let ctx = canvas.getContext('2d');
                      let bgImage = new Image();
                      let qrImage = new Image();

                      bgImage.src = bgImagePath;
                      qrImage.src = qrImageUrl;

                      bgImage.onload = function() {
                          // Set the canvas size to match the QR code size
                          canvas.width = qrImage.width;
                          canvas.height = qrImage.height;

                          // Calculate the position to center the background on the QR code
                          let bgX = (canvas.width - bgImage.width) / 2;
                          let bgY = (canvas.height - bgImage.height) / 2;

                          // Draw the QR code
                          ctx.drawImage(qrImage, 0, 0, canvas.width, canvas.height);

                          // Set the global alpha for transparency and draw the background image
                          ctx.globalAlpha = 0.4; // Adjust transparency level as needed
                          ctx.drawImage(bgImage, bgX, bgY, bgImage.width, bgImage.height);
                          ctx.globalAlpha = 1.0; // Reset the global alpha

                          // Convert the final image to a PNG and download it
                          let finalImageUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
                          let downloadLink = document.createElement('a');
                          downloadLink.href = finalImageUrl;
                          downloadLink.download = student_id + '.png';
                          document.body.appendChild(downloadLink);
                          downloadLink.click();
                          document.body.removeChild(downloadLink);
                      };
                  }, 500);
              });

              // Show success toast
              showToast('successToast', 'QR codes have been generated and downloaded.');
          } else {
              // Show error toast
              showToast('errorToast', 'Error fetching student IDs: ' + response.message);
          }
      }
  });
});






// Function to get section_id from URL
function getSectionIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('section_id');
  
 
}

function getSectionDetails() {
  $.ajax({
      type: "GET",
      url: "../controllers/get-section-details.php",
      data: { section_id: getSectionIdFromURL() },
      dataType: "json",
      success: function(response) {
          if (response.status === "success") {
              $("#class").text(`${response.grade} - ${response.name}`);
          } else {
              console.error("Error response:", response);
              showToast('errorToast', response.message);
          }
      },
      error: function(error) {
          console.error("An error occurred:", error);
          showToast('errorToast', "An error occurred while fetching section details.");
      }
  });
}


// Load students on page load
function loadStudents() {
  var sectionId = getSectionIdFromURL();
  if (sectionId) {
      $.ajax({
          type: "GET",
          url: "../controllers/get-students.php",
          data: { section_id: sectionId },
          dataType: "json",
          success: function(response) {
            if (response.status === "success") {
              // Clear existing student list
              $("#studentList").empty();
            
              const sections = response.sections; // Make sure sections is defined
            
              // Loop through each student and append to the student list
              response.students.forEach(function(student) {
                const sectionOptions = sections.map(section =>
                  section.section_id !== student.section_id
                    ? `<option value="${section.section_id}">${section.grade} - ${section.name}</option>`
                    : ''
                ).join('');
            
                const studentHtml = `
                  <div class="col-md-3 col-lg-3 mb-2">
                    <div class="card h-100">
                      <img class="img-thumbnail rounded-circle h-50 w-50 mx-auto mt-3 d-block" src="../uploads/profile_pictures/${student.profile}" alt="Profile Picture" />
                      <div class="card-body">
                        <h6 class="card-title">${student.last_name}, ${student.first_name}</h6>
                        <p class="card-text">ID: ${student.student_id}</p>
                        <p class="card-text">Gender: ${student.gender}</p>
                        <p class="card-text">Parent: ${student.parent}</p>
                        <p class="card-text">Parent Cp#: ${student.parent_no}</p>
                        <a href="student.html?section_id=${student.section_id}&student_id=${student.student_id}" class="btn btn-outline-primary">Open</a>
                        <a href="javascript:void(0);" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#editModal-${student.student_id}">
                          Edit
                        </a>
            
                        <!-- Edit Modal -->
                        <div class="modal fade" id="editModal-${student.student_id}" tabindex="-1" aria-labelledby="editModalLabel-${student.student_id}" aria-hidden="true">
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="editModalLabel-${student.student_id}">Edit Student</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                <form id="editStudentForm-${student.student_id}" class="editStudentForm" enctype="multipart/form-data" method="POST">
                                  <input type="hidden" name="student_id" value="${student.student_id}" />
                                  <div class="mb-3">
                                    <label for="profile" class="form-label">Profile Picture</label>
                                    <input type="file" class="form-control" id="profile" name="profile" />
                                  </div>
                                  <div class="mb-3">
                                    <label for="first_name" class="form-label">First Name</label>
                                    <input type="text" class="form-control" id="first_name" name="first_name" value="${student.first_name}" />
                                  </div>
                                  <div class="mb-3">
                                    <label for="last_name" class="form-label">Last Name</label>
                                    <input type="text" class="form-control" id="last_name" name="last_name" value="${student.last_name}" />
                                  </div>
                                  <div class="mb-3">
                                    <label for="gender" class="form-label">Gender</label>
                                    <select class="form-select" id="gender" name="gender">
                                      <option value="Male" ${student.gender === 'Male' ? 'selected' : ''}>Male</option>
                                      <option value="Female" ${student.gender === 'Female' ? 'selected' : ''}>Female</option>
                                    </select>
                                  </div>
                                  <div class="mb-3">
                                    <label for="parent" class="form-label">Parent</label>
                                    <input type="text" class="form-control" id="parent" name="parent" value="${student.parent}" />
                                  </div>
                                  <div class="mb-3">
                                    <label for="parent_no" class="form-label">Parent Contact Number</label>
                                    <input type="text" class="form-control" id="parent_no" name="parent_no" value="${student.parent_no}" />
                                  </div>
                                  <div class="mb-3">
                                    <label for="section_id" class="form-label">Section</label>
                                    <select class="form-control" id="section_id" name="section_id">
                                      <option value="${student.section_id}">${student.grade} - ${student.section_name}</option>
                                      ${sectionOptions}
                                    </select>
                                  </div>
                                  <input type="hidden" name="student_id" value="${student.student_id}" />
                                </form>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary" form="editStudentForm-${student.student_id}">Save changes</button>
                              </div>
                            </div>
                          </div>
                        </div>
            
                        <a href="javascript:void(0);" class="btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal-${student.student_id}">
                          <i class='bx bx-trash'></i>
                        </a>
            
                        <!-- Delete Confirmation Modal -->
                        <div class="modal fade" id="deleteModal-${student.student_id}" tabindex="-1" aria-labelledby="deleteModalLabel-${student.student_id}" aria-hidden="true">
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="deleteModalLabel-${student.student_id}">Confirm Delete</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                Are you sure you want to delete this student (${student.last_name}, ${student.first_name})?
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger confirm-delete-btn" data-student-id="${student.student_id}" data-section-id="${student.section_id}">Delete</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
                $("#studentList").append(studentHtml);
              });
            } else {
                  console.error("Error response:", response);
                  showToast('errorToast', response.message);
              }
          },
          error: function(error) {
              console.error("An error occurred:", error);
              showToast('errorToast', "An error occurred while loading students.");
          }
      });
  } else {
      showToast('errorToast', "Section ID is missing from the URL.");
  }
}


// Function to show toast notifications
function showToast(toastId, message) {
  var toastElement = document.getElementById(toastId);
  toastElement.querySelector('.toast-body').textContent = message;
  var toast = new bootstrap.Toast(toastElement);
  toast.show();
}

$(document).ready(function () {
  // Load students on page load
  loadStudents();

  getSectionDetails();

  // Function to get section_id from URL
  function getSectionIdFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('section_id');
  }

  // Handle form submission for adding a new student
  $("#addStudentForm").submit(function(event) {
      event.preventDefault();

      // Create a FormData object to handle file upload
      var formData = new FormData(this);

      // Append section_id to the formData
      var sectionId = getSectionIdFromURL();
      if (sectionId) {
          formData.append("section_id", sectionId);
      }

      $.ajax({
          type: "POST",
          url: "../controllers/register-student.php",
          data: formData,
          contentType: false,
          processData: false,
          dataType: "json",
          success: function(response) {
              if (response.status === "success") {
                  showToast('successToast', "Student added successfully!");
                  loadStudents(); // Reload students after adding a new one
              } else {
                  showToast('errorToast', response.message);
              }
          },
          error: function(error) {
              console.error("An error occurred:", error);
              showToast('errorToast', "An error occurred during submission.");
          }
      });
  });



    $('.editStudentForm').submit(function(event) {
      event.preventDefault();
      var formId = $(this).attr('id');
      var studentId = formId.split('-')[1];
      var formData = $(this).serialize();
  
      $.ajax({
        type: "POST",
        url: "../controllers/update-student.php",
        data: formData,
        dataType: "json",
        success: function(response) {
          if (response.status === "success") {
            showToast('successToast', "Student updated successfully!");
            // Reload the students list or any necessary parts of the page
            loadStudents();
          } else {
            showToast('errorToast', response.message);
          }
        },
        error: function(error) {
          console.error("An error occurred:", error);
          showToast('errorToast', "An error occurred during submission.");
        }
      });
    });

  
});


