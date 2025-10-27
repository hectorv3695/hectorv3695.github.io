(function () {
  var form = document.getElementById("introForm");
  var formView = document.getElementById("formView");
  var resultView = document.getElementById("resultView");
  var resultHtml = document.getElementById("resultHtml");
  var addCourseBtn = document.getElementById("addCourseBtn");
  var coursesDiv = document.getElementById("courses");
  var clearBtn = document.getElementById("clearBtn");
  var resetBtn = document.getElementById("resetBtn");
  var startOverBtn = document.getElementById("startOverBtn");

  var defaultCourses = [
    { dept: "ITIS", num: "3135", name: "Web App Development", reason: "Major requirement." },
    { dept: "ITSC", num: "3146", name: "Operating Systems", reason: "Core class." }
  ];

  function makeCourseRow(c) {
    c = c || {};
    var div = document.createElement("div");
    div.className = "courseRow";
    div.innerHTML =
      '<input type="text" name="dept" placeholder="Dept" value="' + (c.dept || '') + '" required>' +
      '<input type="text" name="num" placeholder="Number" value="' + (c.num || '') + '" required>' +
      '<input type="text" name="name" placeholder="Name" value="' + (c.name || '') + '" required>' +
      '<input type="text" name="reason" placeholder="Reason" value="' + (c.reason || '') + '" required>' +
      '<button type="button" class="del">Delete</button>';

    div.querySelector(".del").addEventListener("click", function () {
      div.remove();
    });

    return div;
  }

  function seedCourses() {
    coursesDiv.innerHTML = "";
    for (var i = 0; i < defaultCourses.length; i++) {
      coursesDiv.appendChild(makeCourseRow(defaultCourses[i]));
    }
  }

  addCourseBtn.addEventListener("click", function () {
    coursesDiv.appendChild(makeCourseRow());
  });

  clearBtn.addEventListener("click", function () {
    var fields = form.querySelectorAll("input, textarea");
    for (var i = 0; i < fields.length; i++) {
      var el = fields[i];
      if (el.type !== "button" && el.type !== "submit" && el.type !== "reset" && el.type !== "file") {
        el.value = "";
      }
    }
  });

  resetBtn.addEventListener("click", function () {
    form.reset();
    seedCourses();
  });

  startOverBtn.addEventListener("click", function () {
    resultView.style.display = "none";
    formView.style.display = "block";
    form.reset();
    seedCourses();
    window.scrollTo(0, 0);
  });

  function F(name) {
    var el = form.elements[name];
    return el && el.value ? el.value.trim() : "";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (typeof form.checkValidity === "function" && !form.checkValidity()) {
      if (typeof form.reportValidity === "function") form.reportValidity();
      else alert("Please fill out all required fields.");
      return;
    }

    var first = F("firstName");
    var middle = F("middleName");
    var nick = F("nickName");
    var last = F("lastName");
    var ackStmt = F("ackStmt");
    var ackDate = F("ackDate");
    var adj = F("mascotAdj");
    var animal = F("mascotAnimal");
    var divider = F("divider") || "||";
    var picUrl = F("pictureUrl");
    var caption = F("pictureCaption");
    var statement = F("personalStatement");
    var bg1 = F("bgPersonal");
    var bg2 = F("bgProfessional");
    var bg3 = F("bgAcademic");
    var bg4 = F("bgSubject");
    var platform = F("platform");
    var funny = F("funny");
    var share = F("share");
    var quote = F("quote");
    var author = F("quoteAuthor");

    var links = [F("link1"), F("link2"), F("link3"), F("link4"), F("link5")];

    for (var i = 0; i < links.length; i++) {
      if (!links[i]) { alert("Please provide all 5 links."); return; }
      try { new URL(links[i]); } catch (err) { alert("One or more links are not valid URLs."); return; }
    }

    var courseRows = coursesDiv.children;
    if (!courseRows || courseRows.length === 0) {
      alert("Please add at least one course.");
      return;
    }
    var courses = [];
    for (var c = 0; c < courseRows.length; c++) {
      var row = courseRows[c];
      var dept = row.querySelector("[name='dept']").value.trim();
      var num  = row.querySelector("[name='num']").value.trim();
      var name = row.querySelector("[name='name']").value.trim();
      var reason = row.querySelector("[name='reason']").value.trim();
      courses.push({ dept: dept, num: num, name: name, reason: reason });
    }

    var fileInput = form.elements["pictureFile"];
    var picSrc = picUrl;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      picSrc = URL.createObjectURL(fileInput.files[0]);
    }

    var fullName = (first + " " + (middle ? middle + " " : "") + last).replace(/\s+/g, " ").trim();
    var displayName = nick ? (fullName + " (" + nick + ")") : fullName;

    var courseHtml = "";
    for (var k = 0; k < courses.length; k++) {
      courseHtml += "<li><strong>" + courses[k].dept + " " + courses[k].num + " - " + courses[k].name + ":</strong> " + courses[k].reason + "</li>";
    }

    var linkHtml = "";
    for (var j = 0; j < links.length; j++) {
      linkHtml += '<li><a href="' + links[j] + '" target="_blank" rel="noopener">' + links[j] + "</a></li>";
    }

    resultHtml.innerHTML =
      "<p><strong>" + displayName + "</strong> " + divider + " <strong>ITIS 3135</strong></p>" +
      "<p><strong>Mascot:</strong> " + adj + " " + animal + "</p>" +
      '<figure><img src="' + picSrc + '" alt="' + displayName + '" width="240"><figcaption>' + caption + "</figcaption></figure>" +
      "<p>" + statement + "</p>" +
      "<ul>" +
        "<li><strong>Personal Background:</strong> " + bg1 + "</li>" +
        "<li><strong>Professional Background:</strong> " + bg2 + "</li>" +
        "<li><strong>Academic Background:</strong> " + bg3 + "</li>" +
        "<li><strong>Background in this Subject:</strong> " + bg4 + "</li>" +
        "<li><strong>Primary Computer Platform:</strong> " + platform + "</li>" +
        "<li><strong>Funny Thing:</strong> " + (funny || "-") + "</li>" +
        "<li><strong>Something to Share:</strong> " + (share || "-") + "</li>" +
      "</ul>" +
      "<h3>Courses I'm Taking</h3>" +
      "<ul>" + courseHtml + "</ul>" +
      "<h3>Quote</h3>" +
      "<blockquote><p>" + quote + "</p><p>- " + author + "</p></blockquote>" +
      "<h3>Links</h3>" +
      "<ul>" + linkHtml + "</ul>" +
      "<p><em>" + ackStmt + "</em> (" + ackDate + ")</p>";

    formView.style.display = "none";
    resultView.style.display = "block";
    window.scrollTo(0, 0);
  });

  seedCourses();
})();
