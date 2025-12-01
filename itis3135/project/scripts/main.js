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

document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".install-step");
  const status = document.getElementById("checklist-status");

  if (!steps.length || !status) return;

  function updateChecklist() {
    const checked = [...steps].filter((step) => step.checked).length;

    if (checked === 0) {
      status.textContent = "No steps completed yet.";
    } else if (checked < steps.length) {
      status.textContent = `You've completed ${checked} of ${steps.length} steps.`;
    } else {
      status.textContent = "✔ All steps completed! You're ready to start using R.";
    }
  }

  steps.forEach((step) => {
    step.addEventListener("change", updateChecklist);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const quizButton = document.getElementById("var-quiz-button");
  const summary = document.getElementById("var-quiz-summary");

  if (quizButton) {
    quizButton.addEventListener("click", function () {

      const answers = {
        q1: "b",
        q2: "c",
        q3: "c"
      };

      let correctCount = 0;

      Object.keys(answers).forEach(function (q) {
        const choice = document.querySelector('input[name="' + q + '"]:checked');
        const result = document.getElementById(q + "-result");

        if (!choice) {
          result.textContent = "Please select an answer.";
          return;
        }

        if (choice.value === answers[q]) {
          result.textContent = "Correct!";
          correctCount = correctCount + 1;
        } else {
          result.textContent = "Incorrect, try reviewing the section.";
        }
      });

      summary.textContent = "You got " + correctCount + " out of 3 correct.";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var typeButton = document.getElementById("type-quiz-button");
  var summary = document.getElementById("type-quiz-summary");

  if (typeButton) {
    typeButton.addEventListener("click", function () {

      var answers = {
        t1: "numeric",   
        t2: "character", 
        t3: "logical"    
      };

      var correctCount = 0;

      for (var key in answers) {
        if (!answers.hasOwnProperty(key)) {
          continue;
        }

        var select = document.querySelector('select[name="' + key + '"]');
        var result = document.getElementById(key + "-result");

        if (!select || !result) {
          continue;
        }

        if (!select.value) {
          result.textContent = "Please choose an answer.";
        } else if (select.value === answers[key]) {
          result.textContent = "Correct!";
          correctCount = correctCount + 1;
        } else {
          result.textContent = "Incorrect. Review the list of common types above.";
        }
      }

      if (summary) {
        summary.textContent = "You got " + correctCount + " out of 3 correct.";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var mathDisplay = document.getElementById("vector-math-display");
  var multInput = document.getElementById("vector-mult-input");
  var multButton = document.getElementById("vector-mult-button");
  var multResult = document.getElementById("vector-mult-result");

  var appendDisplay = document.getElementById("vector-append-display");
  var appendInput = document.getElementById("vector-input");
  var appendButton = document.getElementById("vector-add-button");
  var appendMessage = document.getElementById("vector-message");

  if (!mathDisplay && !appendDisplay) {
    return;
  }

  if (mathDisplay && multInput && multButton && multResult) {
    var mathVector = [10, 20, 30];

    function renderMathVector() {
      mathDisplay.textContent = "c(" + mathVector.join(", ") + ")";
    }

    multButton.addEventListener("click", function () {
      var rawFactor = multInput.value;

      if (!rawFactor || !rawFactor.trim()) {
        multResult.textContent = "Please enter a number to multiply by.";
        return;
      }

      var factor = Number(rawFactor);

      if (isNaN(factor)) {
        multResult.textContent = "Please enter a valid number, like 2 or 0.5.";
        return;
      }

      var scaled = [];
      var i;
      for (i = 0; i < mathVector.length; i = i + 1) {
        scaled.push(mathVector[i] * factor);
      }

      multResult.textContent =
        "Result: c(" +
        scaled.join(", ") + ")";
    });

    renderMathVector();
  }

  if (appendDisplay && appendInput && appendButton && appendMessage) {
    var appendVector = [5, 15, 25, 35];

    function renderAppendVector() {
      appendDisplay.textContent = "c(" + appendVector.join(", ") + ")";
    }

    appendButton.addEventListener("click", function () {
      var raw = appendInput.value;

      if (!raw || !raw.trim()) {
        appendMessage.textContent = "Please type a number to append.";
        return;
      }

      var num = Number(raw);

      if (isNaN(num)) {
        appendMessage.textContent = "Please enter a numeric value, like 50.";
        return;
      }

      appendVector.push(num);
      renderAppendVector();
      appendMessage.textContent = "Appended " + num + " to the append vector.";
      appendInput.value = "";
    });

    renderAppendVector();
  }
});
