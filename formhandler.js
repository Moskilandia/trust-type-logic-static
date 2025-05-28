
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("trustForm");
  const downloadBtn = document.getElementById("downloadBtn");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const formEntries = Object.fromEntries(formData.entries());

    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();

    const fullName = `${formEntries["first_name"] || "[First Name]"} ${formEntries["last_name"] || "[Last Name]"}`;
    const lastName = formEntries["last_name"] || "[Last Name]";

    const docContent = `
SAMPLE REVOCABLE LIVING TRUST (Excerpt)
${fullName} Revocable Living Trust
Established on ${formattedDate}

Article I: Identification
This Trust Agreement is made on this ${day} of ${month}, ${year}, by and between ${fullName}, residing at ${formEntries["address"] || "[Address]"}, hereinafter referred to as “Grantor” and “Trustee.”

Article II: Name of Trust
This trust shall be known as the "${lastName} Revocable Living Trust."

Article III: Revocation and Amendment
The Grantor reserves the right to revoke or amend this trust at any time during their lifetime.

Article IV: Trust Property
The initial property placed into this trust includes:

${formEntries["assets"] || "[List assets with titles, values, and descriptions]"}

Article V: Distributions During Lifetime
The Grantor shall have full access to and use of all trust property during their lifetime.

Article VI: Disposition Upon Death
Upon the Grantor’s death, the Trustee shall distribute the trust property as follows:

${formEntries["beneficiaries"] || "[Name of Beneficiary]: [Percent or itemized property]"}

Article VII: Successor Trustee
In the event that ${formEntries["first_name"] || "[Client]"} is unable or unwilling to serve as Trustee, ${formEntries["successor_trustee"] || "[Successor Trustee Name]"} shall serve.

Article VIII: Powers of Trustee
The Trustee shall have the power to:
- Buy, sell, lease, or mortgage trust assets
- Invest in real estate, securities, and mutual funds
- Make discretionary distributions for health, education, support, or maintenance (HEMS)

Article IX: Spendthrift Clause
No beneficiary shall have the right to assign, transfer, or encumber their interest in the trust.

Article X: Governing Law
This Trust shall be governed by the laws of the State of ${formEntries["state"] || "[Your State]"}.

IN WITNESS WHEREOF, the Grantor has executed this Revocable Living Trust as of the date above.

${fullName}, Grantor & Trustee

[Witness Name], Notary Public
`;

    const pdfBlob = new Blob([docContent], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "MoskiTrust_Living_Trust.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      form.requestSubmit();
    });
  }
});
