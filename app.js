// Logic for handling form + submission
import { db, collection, addDoc, serverTimestamp } from "./firebase.js";

const questions = [
  { id: "control", text: "Do you want to retain the ability to revoke the trust?" },
  { id: "asset_protection", text: "Are you concerned about lawsuits or creditors?" },
  { id: "estate_tax", text: "Will your estate exceed the federal estate tax exemption?" },
  { id: "medicaid", text: "Do you plan to apply for Medicaid within 5 years?" },
  { id: "gifting", text: "Do you want to give away assets permanently?" },
  { id: "control_goals", text: "Are your goals avoiding probate and maintaining control?" }
];

let step = 0;
const answers = {};

function renderQuestion() {
  const app = document.getElementById("app");
  if (step < questions.length) {
    const q = questions[step];
    app.innerHTML = `
      <p class="text-lg mb-4">${q.text}</p>
      <div class="flex space-x-4">
        <button onclick="handleAnswer('yes')" class="px-4 py-2 bg-green-600 text-white rounded">Yes</button>
        <button onclick="handleAnswer('no')" class="px-4 py-2 bg-red-600 text-white rounded">No</button>
      </div>
    `;
  } else {
    showResult();
  }
}

function handleAnswer(value) {
  answers[questions[step].id] = value;
  step++;
  renderQuestion();
}

function determineTrustType() {
  const { control, asset_protection, estate_tax, medicaid, gifting, control_goals } = answers;
  if (asset_protection === 'yes' || estate_tax === 'yes' || medicaid === 'yes' || gifting === 'yes') {
    return "Irrevocable Trust";
  }
  if (control === 'yes' && control_goals === 'yes') {
    return "Revocable Living Trust";
  }
  return "Further clarification needed – speak with a trust advisor.";
}

function showResult() {
  document.getElementById("app").innerHTML = "";
  const resultDiv = document.getElementById("result");
  const recommendation = determineTrustType();
  document.getElementById("recommendation").textContent = recommendation;
  document.getElementById("trust_type_field").value = recommendation;
  resultDiv.classList.remove("hidden");
}

window.handleAnswer = handleAnswer;

window.downloadSummary = () => {
  const blob = new Blob([
    `Trust Recommendation Summary\n\n` +
    questions.map(q => `${q.text}\nAnswer: ${answers[q.id] || 'N/A'}\n\n`).join('') +
    `Recommended Trust Type: ${determineTrustType()}`
  ], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'Trust_Recommendation.txt';
  a.click();
  URL.revokeObjectURL(a.href);
};

window.submitWithFirebase = async (e) => {
  e.preventDefault();
  const form = e.target;
  const payload = {
    name: form.name.value,
    email: form.email.value,
    trust_type: form.trust_type.value,
    message: form.message.value,
    timestamp: serverTimestamp()
  };
  try {
    await addDoc(collection(db, "submissions"), payload);
    window.location.href = "thank-you.html";
  } catch (err) {
    alert("Error submitting: " + err.message);
  }
};

renderQuestion();
