import { db, collection, getDocs } from './firebase.js';

const tbody = document.getElementById('submissions');

async function loadSubmissions() {
  const snapshot = await getDocs(collection(db, "trust_submissions"));
  let rows = [];
  snapshot.forEach(doc => {
    const d = doc.data();
    const row = `<tr class="border-t">
      <td class="p-2 border">${d.name || ''}</td>
      <td class="p-2 border">${d.email || ''}</td>
      <td class="p-2 border">${d.trust_type || ''}</td>
      <td class="p-2 border">${d.message || ''}</td>
      <td class="p-2 border">${d.submitted_at?.toDate().toLocaleString() || ''}</td>
    </tr>`;
    rows.push(row);
  });
  tbody.innerHTML = rows.length ? rows.join('') : '<tr><td colspan="5" class="p-4 text-center text-gray-500">No submissions found.</td></tr>';
}

function escapeCSV(value) {
  return `"${(value || '').replace(/"/g, '""')}"`;
}

window.exportToCSV = async function () {
  const snapshot = await getDocs(collection(db, "trust_submissions"));
  const rows = [["Name", "Email", "Trust Type", "Message", "Submitted At"]];
  snapshot.forEach(doc => {
    const d = doc.data();
    rows.push([
      d.name, d.email, d.trust_type, d.message,
      d.submitted_at?.toDate().toLocaleString() || ''
    ]);
  });
  const csvContent = rows.map(r => r.map(escapeCSV).join(',')).join('\n');
  const blob = new Blob([csvContent], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "trust_submissions.csv";
  a.click();
};

loadSubmissions();
