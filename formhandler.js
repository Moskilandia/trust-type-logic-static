
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const trustForm = document.getElementById("trustForm");
  const downloadBtn = document.getElementById("downloadBtn");

  // Show trust form only after login
  if (loginForm && trustForm) {
    trustForm.style.display = "none";

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const loginData = new FormData(loginForm);
      const loginEntries = Object.fromEntries(loginData.entries());
      sessionStorage.setItem("clientName", loginEntries.name);
      sessionStorage.setItem("clientEmail", loginEntries.email);

      loginForm.style.display = "none";
      trustForm.style.display = "block";
    });
  }

  trustForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(trustForm);
    const formEntries = Object.fromEntries(formData.entries());
    formEntries["clientName"] = sessionStorage.getItem("clientName") || "";
    formEntries["clientEmail"] = sessionStorage.getItem("clientEmail") || "";
    sessionStorage.setItem("trustFormData", JSON.stringify(formEntries));

    window.location.href = "https://buy.stripe.com/28EaEWanc3v03n96de7AI01";
  });

  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      trustForm.requestSubmit();
    });
  }
});
