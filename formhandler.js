
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("trustForm");
  const downloadBtn = document.getElementById("downloadBtn");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(form);
    const formEntries = Object.fromEntries(formData.entries());

    // Generate a complete trust document with notary, witnesses, and legal disclaimer
    const docContent = `
MoskiTrust - Living Trust Document

This Living Trust is made on ${new Date().toLocaleDateString()} by ${formEntries["first_name"] || "[First Name]"} ${formEntries["last_name"] || "[Last Name]"}, residing at ${formEntries["address"] || "[Address]"}.

1. Trust Name: ${formEntries["trust_name"] || "[Trust Name]"}
2. Trustee: ${formEntries["trustee_name"] || "[Trustee Name]"}
3. Successor Trustee: ${formEntries["successor_trustee"] || "[Successor Trustee]"}
4. Beneficiaries: ${formEntries["beneficiaries"] || "[Beneficiaries]"}
5. Assets to be included: ${formEntries["assets"] || "[Assets]"}

Additional Instructions:
${formEntries["instructions"] || "[Instructions]"}

Notary Acknowledgment:
State of ____________  )
County of __________ )
On this ____ day of ___________, 20___, before me, a Notary Public, personally appeared ___________________________, who proved to me on the basis of satisfactory evidence to be the person whose name is subscribed to this instrument, and acknowledged to me that they executed the same in their authorized capacity.

Signature of Notary: __________________________
Seal: [Notary Seal Here]

Witnesses:
1. ____________________________   Date: __________
2. ____________________________   Date: __________

Legal Disclaimer:
This document is provided by MoskiTrust for general informational purposes only. It is not a substitute for legal advice. Please consult a qualified estate planning attorney before executing or filing any legal documents.

Signature of Grantor: ____________________________
Date: ________________________________
`;

    // Create and download PDF using html2pdf
    const pdfBlob = new Blob([docContent], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "MoskiTrust_Living_Trust.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Optional redirect
    // window.location.href = "thankyou.html";
  });

  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      form.requestSubmit();
    });
  }
});
