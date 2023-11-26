
var showNotification = (type, message) => {
    new Noty({
      theme: "relax",
      text: message,
      type: type,
      layout: "topCenter",
      timeout: 3000,
    }).show();
  };

  
function showBody(ele, targetElementId) {
    $(".home-body").hide();
    $(`#${targetElementId}`).show();
    $(".heading").removeClass("active");
    $(ele).addClass("active");
}

function assignReviewersForm(ele,employee_id) {
    console.log('employee_id',employee_id)
    $.ajax({
      url: "/api/v1/admin/assign-reviewers-form",
      type: "post",
      data: {
        employee_id:employee_id
      },
      success: function (response) {
        $("#modal .modal-content").html(response);
      },
      error: function (err) {
        console.log(err);
        $(".modal").modal("hide");
      },
    });
  }



function assignReviewers(ele, event) {
    event.preventDefault();
    console.log('im in assignReviewers')
    let form = $(ele);
    let formData = form.serialize();
    $.ajax({
      url: form.attr("action"),
      type: form.attr("method"),
      data: formData,
      success: function (response) {
        console.log('response',response)
        $(".modal").modal("hide");
        showNotification("success", response.message);
      },
      error: function (err) {
        $(".modal").modal("hide");
        console.log(err);
        let status;
        if (err.status == 500) status = "error";
        else status = "warning";
        showNotification(status, err.responseJSON.message);
      },
    });
  }



function openFeedbackForm(ele, reviewId) {
    $.ajax({
      url: "/api/v1/review/feedback-form",
      type: "post",
      data: {
        reviewId: reviewId,
      },
      success: function (response) {
        $("#modal .modal-content").html(response);
      },
      error: function (err) {
        console.log(err);
        $(".modal").modal("hide");
      },
    });
}


function pendingReviewRow(employee,review) {
    return (dom = `<tr id="row-${employee.id}">
                    <td class="user-name">${employee.name}</td>
                    <td class="user-email">${employee.email}</td>
                    <td>
                      <i
                      class="fas fa-edit"
                      style="color: #1255ca"
                      data-bs-toggle="modal"
                      data-bs-target="#modal"
                      onclick="openFeedbackForm(this,'${review._id}')"
                      ></i>
                    </td>
                  </tr>`);
  }

function submittedReviewRow(employee,review) {
    console.log('review',review)
    return (dom = `<tr id="row-${employee.id}">
            <td class="user-name">${employee.name}</td>
            <td class="user-email">${employee.email}</td>
            <td>
                <i
                    class="fas fa-eye"
                    style="color: #038705"
                    data-bs-toggle="modal"
                    data-bs-target="#modal"
                    onclick="viewFeedback(this,'${review._id}')"
                ></i>
            </td>
            </tr>`);
  }



function updateFeedback(ele, event) {
    console.log('im in updateFeedback')
    event.preventDefault();
    let form = $(ele);
    let formData = form.serialize();
    $.ajax({
      url: form.attr("action"),
      type: form.attr("method"),
      data: formData,
      success: function (response) {
        $(".modal").modal("hide");
        console.log('response',response)
        showNotification("success", response.message);
        let employee = response.data.employee;
        let review = response.data.review
        if (response.data.previousStatus == "Pending" && response.data.reviewStatus == "Submitted") {
          $(`#pending-reviews-table tbody #row-${employee.id}`).remove();
          let dom = submittedReviewRow(employee,review);
          $(`#submitted-reviews-table tbody`).prepend(dom);
        } else if(response.data.previousStatus == "Submitted" && response.data.reviewStatus == "Pending"){
            $(`#submitted-reviews-table tbody #row-${employee.id}`).remove();
            let dom = pendingReviewRow(employee,review);
            $(`#pending-reviews-table tbody`).prepend(dom);
        }   
      },
      error: function (err) {
        $(".modal").modal("hide");
        console.log(err);
        let status;
        if (err.status == 500) status = "error";
        else status = "warning";
        showNotification(status, err.responseJSON.message);
      },
    });
}



function viewFeedback(ele, reviewId) {
    $.ajax({
      url: "/api/v1/review/view-feedback",
      type: "post",
      data: {
        reviewId: reviewId,
      },
      success: function (response) {
        $("#modal .modal-content").html(response);
      },
      error: function (err) {
        console.log(err);
        $(".modal").modal("hide");
      },
    });
}

function editUserForm(ele, user_id) {
    $.ajax({
      url: "/api/v1/admin/edit-user-form",
      type: "post",
      data: {
        user_id: user_id,
      },
      success: function (response) {
        console.log('response',response)
        $("#modal .modal-content").html(response);
      },
      error: function (err) {
        console.log(err);
        $(".modal").modal("hide");
      },
    });
  }

  function deleteUserForm(ele, user_id) {
    console.log('im in deleteUserForm')
    $.ajax({
      url: "/api/v1/admin/delete-user-form",
      type: "post",
      data: {
        user_id: user_id,
      },
      success: function (response) {
        console.log('response',response)
        $("#modal .modal-content").html(response);
      },
      error: function (err) {
        console.log(err);
        $(".modal").modal("hide");
      },
    });
  }



  function updateUser(ele, event) {
    event.preventDefault();
    let form = $(ele);
    let formData = form.serialize();
    // console.log(formData);
    // return;
    $.ajax({
      url: form.attr("action"),
      type: form.attr("method"),
      data: formData,
      success: function (response) {
        $(".modal").modal("hide");
        let user = response.data.user;
        $(`#row-${user._id} .user-name`).html(user.name);
        $(`#row-${user._id} .user-email`).html(user.email);
        $(`#row-${user._id} .user-role`).html(user.role);
        $("#userName").text(user.fullName)
        $("#userRole").text(user.email)
        $("#userEmail").text(user.role)
        showNotification("success", response.message);
      },
      error: function (err) {
        $(".modal").modal("hide");
        console.log(err);
        let status;
        if (err.status == 500) status = "error";
        else status = "warning";
        showNotification(status, err.responseJSON.message);
      },
    });
  }


//   function removeUser(ele, user_id) {
//     $.ajax({
//       url: "/api/v1/admin/delete-user",
//       type: "post",
//       data: {
//         user_id: user_id,
//       },
//       success: function (response) {
//         $(`#row-${user_id}`).remove();
//         showNotification("success", 'User deleted successfully');
//       },
//       error: function (err) {
//         console.log(err);
//         let status;
//         if (err.status == 500) status = "error";
//         else status = "warning";
//         showNotification(status, err.responseJSON.message);
//       },
//     });
//   }



  function addUserForm(ele) {
    $.ajax({
      url: "/api/v1/admin/add-user-form",
      type: "get",
      data: {},
      success: function (response) {
        $("#modal .modal-content").html(response);
      },
      error: function (err) {
        console.log(err);
        $(".modal").modal("hide");
      },
    });
  }


  function createUser(ele, event) {
    event.preventDefault();
    let form = $(ele);
    let formData = form.serialize();
    // console.log(formData);
    // return;
    $.ajax({
      url: form.attr("action"),
      type: form.attr("method"),
      data: formData,
      success: function (response) {
        $(".modal").modal("hide");
        let user = response.data.user;
        let dom = createNewUserRow(user);
        $('#all-users-table tbody').prepend(dom);
        showNotification("success", response.message);
      },
      error: function (err) {
        $(".modal").modal("hide");
        console.log(err);
        let status;
        if (err.status == 500) status = "error";
        else status = "warning";
        showNotification(status, err.responseJSON.message);
      },
    });
  }

  function createNewUserRow(user){
    console.log('im in createNewUserRow')
    console.log('user',user)
    let a;
    if (user.role === 'Employee') {
      a = `<a href='/api/v1/users/getUser/${user._id}'>${user.fullName}</a>`;
    } else {
      a = user.fullName;
    }
    return dom = `<tr id="row-${user._id}">
                    
                    <td class="user-name">
                    
                    ${a}
                    
                    </td>
                    <td class="user-email">${user.email}</td>
                    <td class="user-role">${user.role}</td>
                  </tr>`;
  }