 //Delete Section
 $(document).ready(function() {
    $(document).on('click', '.confirm-delete-section-btn', function() {
      var sectionId = $(this).data('section-id');
      var modal = $(this).closest('.modal');
  
      $.ajax({
        type: "POST",
        url: "../controllers/delete-section.php",
        data: { section_id: sectionId },
        dataType: "json",
        success: function(response) {
          if (response.status === "success") {
            showToast('successToast', "Section deleted successfully!");
            modal.modal('hide'); // Hide the modal after success
            // Optionally, you can reload sections or update the relevant part of the page here
            loadSections();
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
  
  //Edit Section
  $(document).ready(function() {
    $(document).on('submit', '.editSectionForm', function(event) {
      event.preventDefault();
      var formId = $(this).attr('id');
      var sectionId = formId.split('-')[1];
      var formData = $(this).serialize();
  
      $.ajax({
        type: "POST",
        url: "../controllers/edit-section.php",
        data: formData,
        dataType: "json",
        success: function(response) {
          if (response.status === "success") {
            showToast('successToast', "Section updated successfully!");
            $('#editSectionModal-' + sectionId).modal('hide'); // Hide the modal after success
            // Optionally, you can reload sections or update the relevant part of the page here
            loadSections();
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
  
  // Function to load sections
  function loadSections() {
    $.ajax({
      type: "POST",
      url: "../controllers/get-section.php",
      dataType: "json",
      success: function (response) {
        if (response.status === "success") {
          var sectionsHtml = '';
          var previousGrade = '';
          response.sections.forEach(function (section) {
            // Add hr if grade is different from previous grade
            if (section.grade !== previousGrade) {
              sectionsHtml += `
                <hr />
                <h5>${section.grade}</h5>
              `;
              previousGrade = section.grade;
            }
            sectionsHtml += `
              <div class="col-md-6 col-lg-4 mb-3">
                <div class="card h-100">
                  <img class="card-img-top" src="../view/img/section.jpeg" alt="Card image cap" />
                  <div class="card-body">
                    <h5 class="card-title">${section.grade} - ${section.name}</h5>
                    <a href="class.html?section_id=${section.section_id}" class="btn btn-outline-primary">Open</a>
                    <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editSectionModal-${section.section_id}">Edit</button>
                    <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteSectionModal-${section.section_id}">Delete</button>
                  </div>
                </div>

                <!-- Edit Section Modal -->
                <div class="modal fade" id="editSectionModal-${section.section_id}" tabindex="-1" aria-labelledby="editSectionModalLabel-${section.section_id}" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="editSectionModalLabel-${section.section_id}">Edit Section</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <form id="editSectionForm-${section.section_id}" class="editSectionForm">
                          <div class="mb-3">
                            <label for="grade-${section.section_id}" class="form-label">Grade</label>
                            <input type="text" class="form-control" id="grade-${section.section_id}" name="grade" value="${section.grade}" />
                          </div>
                          <div class="mb-3">
                            <label for="name-${section.section_id}" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name-${section.section_id}" name="name" value="${section.name}" />
                          </div>
                          <input type="hidden" name="section_id" value="${section.section_id}" />
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" form="editSectionForm-${section.section_id}">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Delete Confirmation Modal -->
                <div class="modal fade" id="deleteSectionModal-${section.section_id}" tabindex="-1" aria-labelledby="deleteSectionModalLabel-${section.section_id}" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="deleteSectionModalLabel-${section.section_id}">Confirm Delete</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        Are you sure you want to delete this section (${section.grade} - ${section.name})?
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger confirm-delete-section-btn" data-section-id="${section.section_id}">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            `;
          });
          $('#sectionsContainer').html(sectionsHtml);
        } else {
          console.error(response.message);
        }
      },
      error: function (error) {
        console.error("An error occurred:", error);
      }
    });
  }

  // Function to show toast notifications
  function showToast(toastId, message) {
    var toastElement = document.getElementById(toastId);
    toastElement.querySelector('.toast-body').textContent = message;
    var toast = new bootstrap.Toast(toastElement);
    toast.show();
  }

  $(document).ready(function () {
    // Load sections on page load
    loadSections();

    // Handle form submission for adding a new section
    $("#addSectionForm").submit(function(event) {
      event.preventDefault();
      var name = $("#nameInput").val();
      var grade = $("#gradeInput").val();
      var data = { name: name, grade: grade };

      $.ajax({
        type: "POST",
        url: "../controllers/register-section.php",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function(response) {
          if (response.status === "success") {
            showToast('successToast', "Section added successfully!");
            loadSections(); // Reload sections after adding a new one
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

  