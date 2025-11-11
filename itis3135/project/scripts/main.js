function checkVarQuiz() {
  const choice = document.querySelector('input[name="varq"]:checked');
  const out = document.getElementById("var-quiz-result");
  if (!out) return;

  if (!choice) {
    out.textContent = "Please pick an answer.";
    return;
  }

  if (choice.value === "b") {
    out.textContent = "Correct. R uses <- to assign a value.";
  } else {
    out.textContent = "That is not the usual R assignment. Try again.";
  }
}

function vectorCount() {
  const input = document.getElementById("vector-input");
  const out = document.getElementById("vector-result");
  if (!input || !out) return;

  const raw = input.value;
  if (!raw.trim()) {
    out.textContent = "Type some numbers first.";
    return;
  }

  const parts = raw
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  out.textContent = "You entered " + parts.length + " values.";
}

function loadSampleData() {
  const container = document.getElementById("data-container");
  if (!container) return;

  container.innerHTML = `
    <table border="1" cellpadding="6">
      <tr><th>Name</th><th>Score</th></tr>
      <tr><td>Ben</td><td>92</td></tr>
      <tr><td>Sample User</td><td>88</td></tr>
    </table>
  `;
}
