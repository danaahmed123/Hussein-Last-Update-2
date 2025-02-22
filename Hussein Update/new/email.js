document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('questions.json');
  const questions = await response.json();
  displayQuestions(questions);
});

function displayQuestions(questions) {
  const questionContainer = document.getElementById('question-container');
  questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
      <h3>${index + 1}. ${question.question}</h3>
      ${question.options.map(option => `
        <label>
          <input type="radio" name="question${index}" value="${option}">
          ${option}
        </label>
      `).join('')}
    `;
    questionContainer.appendChild(questionElement);
  });
}

async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const answers = {};
  formData.forEach((value, key) => {
    answers[key] = value;
  });

  const response = await fetch('/api/submit-answers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(answers)
  });

  if (response.ok) {
    window.location.href = '../end/end.html';
  } else {
  // alert('Failed to submit answers. Please try again.');
 // window.location.href = '../error/error.html';    // إعادة التوجيه إلى صفحة الخطأ)(للتجربه فقط)
window.location.href = '../end/end.html';
  }
}