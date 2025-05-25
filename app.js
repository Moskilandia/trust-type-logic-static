const questions = [
  { id: "control", text: "Do you want to retain the ability to change, revoke, or cancel the trust at any time?" },
  { id: "asset_protection", text: "Are you concerned about lawsuits, creditors, or divorce potentially affecting your assets?" },
  { id: "estate_tax", text: "Is your estate projected to exceed the federal estate tax exemption (~$13.61M)?" },
  { id: "medicaid", text: "Do you plan to apply for Medicaid/Medi-Cal long-term care within 5 years?" },
  { id: "gifting", text: "Do you want to give away assets permanently to reduce your taxable estate?" },
  { id: "control_goals", text: "Are your main goals avoiding probate, maintaining privacy, and retaining control over your assets?" }
];

let step = 0;
const answers = {};
const app = document.getElementById("app");
const resultBox = document.getElementById("result");
const recommendation = document.getElementById("recommendation");

function renderQuestion() {
  app.innerHTML = `
    <p class="text-lg">${questions[step].text}</p>
    <div class="space-x-4">
      <button onclick="handleAnswer('yes')" class="px-4 py-2 bg-green-600 text-white rounded">Yes</button>
      <button onclick="handleAnswer('no')" class="px-4 py-2 bg-red-600 text-white rounded">No</button>
    </div>
  `;
}

function handleAnswer(value) {
  answers[questions[step].id] = value;
  step++;
  if (step < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  app.classList.add("hidden");
  resultBox.classList.remove("hidden");

  const { control, asset_protection, estate_tax, medicaid, gifting, control_goals } = answers;
  let result;

  if (asset_protection === "yes" || estate_tax === "yes" || medicaid === "yes" || gifting === "yes") {
    result = "Irrevocable Trust";
  } else if (control === "yes" && control_goals === "yes") {
    result = "Revocable Living Trust";
  } else {
    result = "Further clarification needed – consider speaking with a trust advisor.";
  }

  recommendation.textContent = result;
}

function downloadSummary() {
  const summary = questions.map(q => `${q.text}\nAnswer: ${answers[q.id] || "N/A"}\n\n`).join("") +
    `Recommended Trust Type: ${recommendation.textContent}`;
  const blob = new Blob([summary], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "Trust_Type_Recommendation.txt";
  a.click();
}
