document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("generateJSONBtn");
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
    const courseBlocks = coursesContainer ? Array.from(coursesContainer.children).filter((c) => c.tagName === "DIV") : [];
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

      if (courseObj.department || courseObj.number || courseObj.name || courseObj.reason) {
        courses.push(courseObj);
      }
    });

    if (!courses.length) {
      courses.push({
        department: "EXAMPLE",
        number: "101",
        name: "Example Name",
        reason: "Example Reason"
      });
    }

    const links = [];
    if (link1) links.push({ name: "LinkedIn", href: link1 });
    if (link2) links.push({ name: "GitHub", href: link2 });
    if (link3) links.push({ name: "Charlotte Webpage", href: link3 });
    if (link4) links.push({ name: "GitHub Pages", href: link4 });
    if (link5) links.push({ name: "freeCodeCamp", href: link5 });

    const jsonObj = {
      firstName: firstName,
      preferredName: nickName || firstName,
      middleInitial: middleName ? middleName.charAt(0) : "",
      lastName: lastName,
      divider: divider,
      mascotAdjective: mascotAdj,
      mascotAnimal: mascotAnimal,
      image: image,
      imageCaption: imageCaption,
      personalStatement: personalStatement,
      personalBackground: personalBackground,
      professionalBackground: professionalBackground,
      academicBackground: academicBackground,
      subjectBackground: subjectBackground,
      primaryComputer: primaryComputer,
      courses: courses,
      links: links
    };

    const jsonText = JSON.stringify(jsonObj, null, 2);

    const mainHeading = document.querySelector("main.intro-form > h2");
    if (mainHeading) mainHeading.textContent = "Introduction JSON";

    const formView = document.getElementById("formView");
    const resultView = document.getElementById("resultView");
    const resultHtml = document.getElementById("resultHtml");

    if (formView && resultView && resultHtml) {
      formView.style.display = "none";
      resultView.style.display = "block";
      resultHtml.innerHTML = `
        <section>
          <pre><code class="language-json">${jsonText.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
        </section>
      `;
    }

    if (window.hljs) hljs.highlightAll();
  });
});
