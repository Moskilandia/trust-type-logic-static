
function ordinalSuffix(n) {
  if (11 <= n % 100 && n % 100 <= 13) return n + "th";
  switch (n % 10) {
    case 1: return n + "st";
    case 2: return n + "nd";
    case 3: return n + "rd";
    default: return n + "th";
  }
}

const data = JSON.parse(sessionStorage.getItem("trustFormData") || "{}");
const today = new Date();
const day = today.getDate();
const month = today.toLocaleString("default", { month: "long" });
const year = today.getFullYear();
const dayWithSuffix = ordinalSuffix(day);

const trustText = `${data.clientName || ""} Revocable Living Trust\r\n` +
`Established on ${month} ${day}, ${year}\r\n\r\n` +

`Article I: Identification\r\n` +
`This Trust Agreement is made on this ${dayWithSuffix} day of ${month}, ${year}, by and between ${data.clientName || ""}, residing at ${data.address || ""}, hereinafter referred to as the Grantor.\r\n` +

`\r\nArticle II: Name of Trust\r\n` +
`This trust shall be known as the \"${data.last_name || ""} Revocable Living Trust.\"\r\n` +

`\r\nArticle III: Revocation and Amendment\r\n` +
`The Grantor reserves the right to revoke or amend this trust at any time during their lifetime.\r\n` +

`\r\nArticle IV: Trust Property\r\n` +
`The initial property placed into this trust includes:\r\n${data.assets || ""}\r\n` +

`\r\nArticle V: Distributions During Lifetime\r\n` +
`The Grantor shall have full access to and use of all trust property during their lifetime.\r\n` +

`\r\nArticle VI: Disposition Upon Death\r\n` +
`Upon the Grantor’s death, the Trustee shall distribute the trust property as follows:\r\n${data.beneficiaries || ""}\r\n` +

`\r\nArticle VII: Successor Trustee\r\n` +
`In the event that ${data.clientName || ""} is unable or unwilling to serve as Trustee, ${data.successor_trustee || ""} shall serve.\r\n` +

`\r\nArticle VIII: Powers of Trustee\r\n` +
`The Trustee shall have the power to:\r\n` +
`Buy, sell, lease, or mortgage trust assets\r\n` +
`Invest in real estate, securities, and mutual funds\r\n` +
`Make discretionary distributions for health, education, support, or maintenance (HEMS)\r\n` +

`\r\nArticle IX: Spendthrift Clause\r\n` +
`No beneficiary shall have the right to assign, transfer, or encumber their interest in the trust.\r\n` +

`\r\nArticle X: Governing Law\r\n` +
`This Trust shall be governed by the laws of the State of ${data.state || ""}.\r\n` +

`\r\nIN WITNESS WHEREOF, the Grantor has executed this Revocable Living Trust as of the date above.\r\n\r\n` +
`${data.clientName || ""}, Grantor & Trustee\r\n` +
`________________, Notary Public\r\n`;

const blob = new Blob([trustText], { type: "text/plain" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "TrustDocument.txt";
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
URL.revokeObjectURL(url);
