(function () {
  const form = document.getElementById("introForm");
  const formView = document.getElementById("formView");
  const resultView = document.getElementById("resultView");
  const resultHtml = document.getElementById("resultHtml");
  const addCourseBtn = document.getElementById("addCourseBtn");
  const coursesDiv = document.getElementById("courses");
  const clearBtn = document.getElementById("clearBtn");
  const resetBtn = document.getElementById("resetBtn");
  const startOverBtn = document.getElementById("startOverBtn");

  const defaultCourses = [
    { dept: "ITIS", num: "3135", name: "Web App Development", reason: "Major requirement." },
    { dept: "ITSC", num: "3146", name: "Operating Systems", reason: "Core class." }
  ];

  function makeCourseRow(c = {}) {
    const div = document.createElement("div");
    div.className = "courseRow";
    div.innerHTML = `
      <input type="text" name="dept" placeholder="Dept" value="${c.dept || ""}" required>
      <input type="text" name="num" placeholder="Number" value="${c.num || ""}" required>
      <input type="text" name="name" placeholder="Name" value="${c.name || ""}" required>
      <input type="text" name="reason" placeholder="Reason" value="${c.reason || ""}" required>
      <button type="button" class="del">Delete</button>
    `;
    div.querySelector(".del").addEventListener("click", () => div.remove());
    return div;
  }

  function seedCourses() {
    coursesDiv.innerHTML = "";
    defaultCourses.forEach(c => coursesDiv.appendChild(makeCourseRow(c)));
  }

  addCourseBtn.addEventListener("click", () => {
    coursesDiv.appendChild(makeCourseRow());
  });

  clearBtn.addEventListener("click", () => {
    form.querySelectorAll("input, textarea").forEach(el => {
      if (el.type !== "button" && el.type !== "submit" && el.type !== "reset" && el.type !== "file") el.value = "";
    });
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    seedCourses();
  });

  startOverBtn.addEventListener("click", () => {
    resultView.style.display = "none";
    formView.style.display = "block";
    form.reset();
    seedCourses();
    window.scrollTo(0, 0);
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const missing = form.querySelector("[required]:invalid");
    if (missing) {
      alert("Please fill out all required fields.");
      return;
    }

    const F = n => form.elements[n]?.value.trim() || "";
    const first = F("firstName"), middle = F("middleName"), nick = F("nickName"), last = F("lastName");
    const fullName = [first, middle, last].filter(Boolean).join(" ");
    const displayName = nick ? `${fullName} (${nick})` : fullName;
    const ackStmt = F("ackStmt"), ackDate = F("ackDate");
    const adj = F("mascotAdj"), animal = F("mascotAnimal"), divider = F("divider");
    const picUrl = F("pictureUrl"), caption = F("pictureCaption");
    const statement = F("personalStatement"), bg1 = F("bgPersonal"), bg2 = F("bgProfessional"),
      bg3 = F("bgAcademic"), bg4 = F("bgSubject"), platform = F("platform"), funny = F("funny"),
      share = F("share"), quote = F("quote"), author = F("quoteAuthor");
    const links = [F("link1"), F("link2"), F("link3"), F("link4"), F("link5")];
    const courses = Array.from(coursesDiv.children).map(div => ({
      dept: div.querySelector("[name='dept']").value,
      num: div.querySelector("[name='num']").value,
      name: div.querySelector("[name='name']").value,
      reason: div.querySelector("[name='reason']").value
    }));

    const fileInput = form.elements["pictureFile"];
    let picSrc = picUrl;
    if (fileInput.files[0]) picSrc = URL.createObjectURL(fileInput.files[0]);

    const courseHtml = courses.map(c => `<li><strong>${c.dept} ${c.num} - ${c.name}:</strong> ${c.reason}</li>`).join("");
    const linkHtml = links.map(l => `<li><a href="${l}" target="_blank">${l}</a></li>`).join("");

    resultHtml.innerHTML = `
      <h2>Introduction Form</h2>
      <figure><img src="${picSrc}" alt="${displayName}" width="240"><figcaption>${caption}</figcaption></figure>
      <p>${statement}</p>
      <ul>
        <li><strong>Personal Background:</strong> ${bg1}</li>
        <li><strong>Professional Background:</strong> ${bg2}</li>
        <li><strong>Academic Background:</strong> ${bg3}</li>
        <li><strong>Background in this Subject:</strong> ${bg4}</li>
        <li><strong>Primary Computer Platform:</strong> ${platform}</li>
        <li><strong>Funny Thing:</strong> ${funny || "—"}</li>
        <li><strong>Something to Share:</strong> ${share || "—"}</li>
      </ul>
      <h3>Courses I'm Taking</h3>
      <ul>${courseHtml}</ul>
      <blockquote>"${quote}"<footer>— ${author}</footer></blockquote>
      <ul>${linkHtml}</ul>
      <p><em>${ackStmt}</em> (${ackDate})</p>
      <p><strong>${adj} ${animal}</strong> ${divider} <strong>${displayName}</strong></p>
    `;

    formView.style.display = "none";
    resultView.style.display = "block";
    window.scrollTo(0, 0);
  });

  seedCourses();
})();
