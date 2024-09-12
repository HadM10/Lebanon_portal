document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Gather form data
    const formData = new FormData(loginForm);

    // Create an XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "login.php", true);
    xhr.setRequestHeader("Accept", "application/json");

    // Handle the response
    xhr.onload = function () {
      console.log("Response received:", xhr.responseText); // Log response text

      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.status === "success") {
            // Redirect based on user role
            const userRole = response.user_role;
            if (userRole === "ansar") {
              window.location.href = "admin/index.php";
            } else if (userRole === "lebanon") {
              window.location.href = "lebanon-admin/index.php";
            }
          } else {
            loginMessage.textContent = response.message;
          }
        } catch (e) {
          console.error("Error parsing JSON:", e);
          loginMessage.textContent = "Failed to parse server response.";
        }
      } else {
        loginMessage.textContent =
          "An error occurred while processing your request.";
      }
    };

    xhr.send(formData);
  });
});
