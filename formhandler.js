
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const trustForm = document.getElementById("trustForm");
  const dashboard = document.getElementById("dashboard");
  const downloadBtn = document.getElementById("downloadBtn");
  const viewDashboardBtn = document.getElementById("viewDashboardBtn");
  const editBtn = document.getElementById("editInfoBtn");
  const deleteBtn = document.getElementById("deleteSessionBtn");
  const redownloadBtn = document.getElementById("redownloadBtn");
  const successMessage = document.getElementById("successMessage");

  if (loginForm && trustForm) {
    trustForm.style.display = "none";
    dashboard.style.display = "none";
    if (successMessage) successMessage.style.display = "none";

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const loginData = new FormData(loginForm);
      const loginEntries = Object.fromEntries(loginData.entries());
      sessionStorage.setItem("clientName", loginEntries.name);
      sessionStorage.setItem("clientEmail", loginEntries.email);

      loginForm.style.display = "none";
      trustForm.style.display = "block";
      if (successMessage) {
        successMessage.textContent = `Welcome ${loginEntries.name}, please complete your trust form.`;
        successMessage.style.display = "block";
      }
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

  if (viewDashboardBtn) {
    viewDashboardBtn.addEventListener("click", function () {
      loginForm.style.display = "none";
      trustForm.style.display = "none";
      dashboard.style.display = "block";

      const clientName = sessionStorage.getItem("clientName") || "Guest";
      const trustData = JSON.parse(sessionStorage.getItem("trustFormData") || '{}');

      document.getElementById("dashboardName").textContent = clientName;
      document.getElementById("dashboardSummary").textContent = JSON.stringify(trustData, null, 2);
    });
  }

  if (editBtn) {
    editBtn.addEventListener("click", function () {
      dashboard.style.display = "none";
      trustForm.style.display = "block";
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener("click", function () {
      sessionStorage.clear();
      alert("Session data cleared.");
      location.reload();
    });
  }

  if (redownloadBtn) {
    redownloadBtn.addEventListener("click", function () {
      window.location.href = "access.html";
    });
  }
});
