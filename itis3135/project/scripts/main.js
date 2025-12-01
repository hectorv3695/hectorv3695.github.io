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

document.addEventListener("DOMContentLoaded", function () {
  var loadButton = document.getElementById("load-json-button");
  var accordion = document.getElementById("json-accordion");
  var container = document.getElementById("json-table-container");

  if (!loadButton || !accordion || !container) {
    return;
  }

  loadButton.addEventListener("click", function () {
    fetch("scripts/sample-data.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var html = "<table border='1' cellpadding='6'><tr>";

        Object.keys(data[0]).forEach(function (key) {
          html += "<th>" + key + "</th>";
        });
        html += "</tr>";

        data.forEach(function (row) {
          html += "<tr>";
          Object.values(row).forEach(function (value) {
            html += "<td>" + value + "</td>";
          });
          html += "</tr>";
        });

        html += "</table>";

        container.innerHTML = html;

        accordion.style.display = "block";

        if (window.jQuery && jQuery.fn.accordion) {
          jQuery("#json-accordion").accordion({
            heightStyle: "content",
            collapsible: true
          });
        }
      })
      .catch(function () {
        container.innerHTML = "<p>Could not load sample data.</p>";
        accordion.style.display = "block";
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var select = document.getElementById("plot-select");
  var output = document.getElementById("plot-output");
  var hint = document.getElementById("plot-hint");
  var title = document.getElementById("plot-title");
  var desc = document.getElementById("plot-description");
  var image = document.getElementById("plot-image");
  var code = document.getElementById("plot-code");

  if (!select || !output || !title || !desc || !image || !code) {
    return;
  }

  var plots = {
    "r-scatter": {
      title: "Scatter Plot (base R)",
      description: "This base R scatter plot uses plot() to show the relationship between two numeric vectors.",
      img: "images/r-scatter.png",
      code:
"x <- c(1, 2, 3, 4, 5)\n" +
"y <- c(3, 4, 6, 7, 9)\n\n" +
"plot(x, y,\n" +
"     main = 'Simple Scatter Plot',\n" +
"     xlab = 'X values',\n" +
"     ylab = 'Y values')"
    },
    "r-bar": {
      title: "Bar Chart (base R)",
      description: "A bar chart in base R uses barplot() and a numeric vector of heights.",
      img: "images/r-barchart.png",
      code:
"counts <- c(12, 18, 9, 15)\n" +
"names(counts) <- c('A', 'B', 'C', 'D')\n\n" +
"barplot(counts,\n" +
"        main = 'Bar Chart Example',\n" +
"        xlab = 'Group',\n" +
"        ylab = 'Count')"
    },
    "r-hist": {
      title: "Histogram (base R)",
      description: "A histogram in base R uses hist() to show the distribution of a numeric vector.",
      img: "images/r-histogram.png",
      code:
"temps <- c(58, 61, 63, 67, 70, 72, 75, 78, 80,\n" +
"           82, 84, 86, 88, 90, 93, 95)\n\n" +
"hist(temps,\n" +
"     main = 'Histogram of Temperature',\n" +
"     xlab = 'Temperature')"
    },
    "gg-scatter": {
      title: "Scatter Plot (ggplot2)",
      description: "This ggplot2 scatter plot uses the mtcars data set and maps weight to mpg with color by cylinders.",
      img: "images/gg2-scatter.png",
      code:
"library(ggplot2)\n\n" +
"ggplot(mtcars, aes(x = wt, y = mpg, color = factor(cyl))) +\n" +
"  geom_point(size = 3) +\n" +
"  labs(title = 'MPG vs Weight',\n" +
"       x = 'Weight (1000 lbs)',\n" +
"       y = 'Miles per gallon',\n" +
"       color = 'Cylinders')"
    },
    "gg-bar": {
      title: "Bar Chart (ggplot2)",
      description: "A grouped bar chart created with ggplot2 using a small summary data frame.",
      img: "images/gg2-barchart.png",
      code:
"library(ggplot2)\n\n" +
"df <- data.frame(\n" +
"  dose = c('0.5', '0.5', '1', '1', '2', '2'),\n" +
"  supp = c('OJ', 'VC', 'OJ', 'VC', 'OJ', 'VC'),\n" +
"  len  = c(13.2, 7.8, 22.4, 16.5, 26.4, 25.2)\n" +
")\n\n" +
"ggplot(df, aes(x = dose, y = len, fill = supp)) +\n" +
"  geom_col(position = 'dodge') +\n" +
"  labs(title = 'Tooth Growth by Dose and Supplement',\n" +
"       x = 'Dose',\n" +
"       y = 'Length',\n" +
"       fill = 'Supplement')"
    },
    "gg-hist": {
      title: "Histogram (ggplot2)",
      description: "A ggplot2 histogram of mpg from the mtcars data set, using a minimal theme.",
      img: "images/gg2-histogram.png",
      code:
"library(ggplot2)\n\n" +
"ggplot(mtcars, aes(x = mpg)) +\n" +
"  geom_histogram(binwidth = 3,\n" +
"                 fill = 'steelblue',\n" +
"                 color = 'white') +\n" +
"  labs(title = 'Distribution of MPG',\n" +
"       x = 'Miles per gallon',\n" +
"       y = 'Count') +\n" +
"  theme_minimal()"
    }
  };

  function clearOutput() {
    title.textContent = "";
    desc.textContent = "";
    code.textContent = "";
    image.style.display = "none";
  }

  select.addEventListener("change", function () {
    var key = select.value;

    if (!key) {
      hint.textContent = "Start by choosing a plot from the menu above.";
      clearOutput();
      return;
    }

    var info = plots[key];
    if (!info) {
      hint.textContent = "Plot not found.";
      clearOutput();
      return;
    }

    hint.textContent = "";
    title.textContent = info.title;
    desc.textContent = info.description;
    code.textContent = info.code;
    image.src = info.img;
    image.alt = info.title;
    image.style.display = "block";
  });
});
