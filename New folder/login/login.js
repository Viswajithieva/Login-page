 const email = document.getElementById("email");
    const password = document.getElementById("password");
    const loginBtn = document.getElementById("loginBtn");
    const errorMsg = document.getElementById("errorMsg");

    function validateInputs() {
      if (email.value.trim() !== "" && password.value.trim() !== "") {
        loginBtn.disabled = false;
      } else {
        loginBtn.disabled = true;
      }
    }

    email.addEventListener("input", validateInputs);
    password.addEventListener("input", validateInputs);

    loginBtn.addEventListener("click", () => {
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!email.value.match(emailPattern) || password.value.trim() === "") {
        errorMsg.style.display = "block";
      } else {
        errorMsg.style.display = "none";
        alert("Login Successful! Redirecting to dashboard...");
         window.location.href = "../user/user.html";
      }
    });