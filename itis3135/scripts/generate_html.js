document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("generateHTMLBtn");
  if (!btn) return;

  btn.addEventListener("click", function () {
    const getVal = (name) => {
      const el = document.querySelector(`[name="${name}"]`);
      return el ? el.value.trim() : "";
    };

    const firstName = getVal("firstName");
    const middleName = getVal("middleName");
    const nickName = getVal("nickName");
    const lastName = getVal("lastName");
    const mascotAdj = getVal("mascotAdj");
    const mascotAnimal = getVal("mascotAnimal");
    const divider = getVal("divider") || "~";
    const image = getVal("pictureUrl");
    const imageCaption = getVal("pictureCaption");
    const personalStatement = getVal("personalStatement");
    const personalBackground = getVal("bgPersonal");
    const professionalBackground = getVal("bgProfessional");
    const academicBackground = getVal("bgAcademic");
    const subjectBackground = getVal("bgSubject");
    const primaryComputer = getVal("platform");

    const link1 = getVal("link1");
    const link2 = getVal("link2");
    const link3 = getVal("link3");
    const link4 = getVal("link4");
    const link5 = getVal("link5");

    const coursesContainer = document.getElementById("courses");
    const courseBlocks = coursesContainer
      ? Array.from(coursesContainer.children).filter((c) => c.tagName === "DIV")
      : [];
    const courses = [];

    courseBlocks.forEach((block) => {
      const dept = block.querySelector('input[name*="dept"], input[name*="Dept"], input[name*="department"]');
      const number = block.querySelector('input[name*="num"], input[name*="Num"], input[name*="number"]');
      const name = block.querySelector('input[name*="name"], input[name*="Name"]');
      const reason = block.querySelector('input[name*="reason"], textarea[name*="reason"], textarea[name*="Reason"]');

      const courseObj = {
        department: dept ? dept.value.trim() : "",
        number: number ? number.value.trim() : "",
        name: name ? name.value.trim() : "",
        reason: reason ? reason.value.trim() : ""
      };
      if (courseObj.department || courseObj.number || courseObj.name || courseObj.reason)
        courses.push(courseObj);
    });

    if (!courses.length) {
      courses.push({
        department: "EXAMPLE",
        number: "101",
        name: "Example Name",
        reason: "Example Reason"
      });
    }

    let htmlOutput = `
<h2>Introduction HTML</h2>
<h3>${firstName} ${middleName ? middleName.charAt(0) + ". " : ""}"${nickName}" ${lastName} ${divider} ${mascotAdj} ${mascotAnimal}</h3>
<figure>
  <img src="${image}" alt="Headshot of ${firstName} ${lastName}">
  <figcaption>${imageCaption}</figcaption>
</figure>
<ul>
  <li><strong>Personal Statement:</strong> ${personalStatement}</li>
  <li><strong>Personal Background:</strong> ${personalBackground}</li>
  <li><strong>Professional Background:</strong> ${professionalBackground}</li>
  <li><strong>Academic Background:</strong> ${academicBackground}</li>
  <li><strong>Background in this Subject:</strong> ${subjectBackground}</li>
  <li><strong>Primary Computer:</strong> ${primaryComputer}</li>
</ul>
<h4>Courses</h4>
<ul>
`;

    courses.forEach((course) => {
      htmlOutput += `
  <li>${course.department} ${course.number}: ${course.name} — ${course.reason}</li>
`;
    });

    htmlOutput += `</ul>
<h4>Links</h4>
<ul>
  <li><a href="${link1}">${link1}</a></li>
  <li><a href="${link2}">${link2}</a></li>
  <li><a href="${link3}">${link3}</a></li>
  <li><a href="${link4}">${link4}</a></li>
  <li><a href="${link5}">${link5}</a></li>
</ul>
`;

    const mainHeading = document.querySelector("main.intro-form > h2");
    if (mainHeading) mainHeading.textContent = "Introduction HTML";

    const formView = document.getElementById("formView");
    const resultView = document.getElementById("resultView");
    const resultHtml = document.getElementById("resultHtml");

    if (formView && resultView && resultHtml) {
      formView.style.display = "none";
      resultView.style.display = "block";
      resultHtml.innerHTML = `
        <section>
          <pre><code class="language-html">${htmlOutput
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</code></pre>
        </section>
      `;
    }

    if (window.hljs) hljs.highlightAll();
  });
});
