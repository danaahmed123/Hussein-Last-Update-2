// Description: JavaScript file for the desk page.
document.addEventListener('DOMContentLoaded', function () {
  const penTest = document.getElementById("pen-test");
  const subOptions = document.getElementById("sub-options");
  const redTeaming = document.getElementById("redTeaming");
  const soc = document.getElementById("soc");
  const malwareAnalysis = document.getElementById("malware-analysis");

  let selectedPath = '';
  let selectedSubPath = '';

  function clearSelection() {
    soc.classList.remove('selected');
    malwareAnalysis.classList.remove('selected');
    penTest.classList.remove('selected');
    redTeaming.classList.remove('selected');
  }

  penTest.addEventListener("click", () => {
    clearSelection();
    penTest.classList.add('selected');
    subOptions.classList.toggle("hidden");
    redTeaming.classList.toggle("md:mt-0");
    redTeaming.classList.toggle("mt-28");
    selectedPath = 'pen-test';
  });

  soc.addEventListener("click", () => {
    clearSelection();
    soc.classList.add('selected');
    selectedPath = 'soc';
    selectedSubPath = '';
  });

  malwareAnalysis.addEventListener("click", () => {
    clearSelection();
    malwareAnalysis.classList.add('selected');
    selectedPath = 'malware-analysis';
    selectedSubPath = '';
  });

  redTeaming.addEventListener("click", () => {
    clearSelection();
    redTeaming.classList.add('selected');
    selectedPath = 'redTeaming';
    selectedSubPath = '';
  });

  // إضافة مستمع للأحداث لكل خيار فرعي في "Penetration Testing"
  const subOptionButtons = subOptions.querySelectorAll('button');
  subOptionButtons.forEach(button => {
    button.addEventListener('click', () => {
      selectedSubPath = button.textContent.trim().toLowerCase().replace(' ', '-');
    });
  });

  // Close sub-options when clicking outside
  document.addEventListener("click", (event) => {
    if (!penTest.contains(event.target)) {
      subOptions.classList.add("hidden");
    }
  });

  // تفعيل زر "Submit"
  const submitButton = document.querySelector('#submit-button');
  submitButton.addEventListener('click', () => {
    let targetUrl = '../new/interview.html'; // صفحة المقابلة العامة
    if (selectedPath) {
      targetUrl += `?path=${selectedPath}`;
      if (selectedPath === 'pen-test' && selectedSubPath) {
        targetUrl += `&subPath=${selectedSubPath}`;
      }
    } else {
      alert('Please select a path.');
      return;
    }
    window.location.href = targetUrl;
  });
});
