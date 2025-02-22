let currentQuestionIndex = 0;
let questions = [];

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const path = urlParams.get('path');
  const subPath = urlParams.get('subPath');
////////////////////////
  // تحديد الأسئلة بناءً على المسار المحدد
  switch (path) {
    case 'soc':
      questions = [
        { text: "What is SOC?", audio: "audio/phishing.mp3" },
        { text: "Explain the role of a SOC analyst.", audio: "audio/soc2.mp3" }
      ];
      break;
    case 'malware-analysis':
      questions = [
        { text: "What is malware analysis?", audio: "audio/malware1.mp3" },
        { text: "Describe the process of analyzing malware.", audio: "audio/malware2.mp3" }
      ];
      break;
    case 'pen-test':
      if (subPath === 'web') {
        questions = [
          { text: "What is web penetration testing?", audio: "audio/pen-test-web1.mp3" },
          { text: "Explain the OWASP Top 10.", audio: "audio/pen-test-web2.mp3" }
        ];
      } else if (subPath === 'mobile-application') {
        questions = [
          { text: "What is mobile application penetration testing?", audio: "audio/phishing.mp3" },
          { text: "Describe the steps of  mobile application.", audio: "audio/pen-test-network2.mp3" }
        ];
      } else if (subPath === 'network') {
        questions = [
          { text: "What is network penetration testing?", audio: "audio/pen-test-network1.mp3" },
          { text: "Describe the steps of a network penetration test.", audio: "audio/pen-test-network2.mp3" }
        ];
      }
      break;
    case 'redTeaming':
      questions = [
        { text: "What is red teaming?", audio: "audio/red-teaming1.mp3" },
        { text: "Explain the difference between red teaming and penetration testing.", audio: "audio/red-teaming2.mp3" }
      ];
      break;
    default:
      questions = [
        { text: "Default question?", audio: "audio/default1.mp3" },
        { text: "Explain the default process.", audio: "audio/default2.mp3" }
      ];
      break;
  }

  // عرض الأسئلة
  displayQuestions(questions);
  startCountdown();
});

function displayQuestions(questions) {
  const questionContainer = document.getElementById('question-container');
  questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
      <h3>${index + 1}. ${question.text}</h3>
      <audio controls>
        <source src="${question.audio}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    `;
    questionContainer.appendChild(questionElement);
  });
}

let mediaRecorder;
let recordedChunks = [];
let stream; // متغير لتخزين التدفق (stream)

// بدء العداد التنازلي لمدة 15 دقيقة
let countdownTime = 15 * 60; // 15 دقيقة بالثواني

function startCountdown() {
  const countdownElement = document.getElementById('countdown');
  const countdownInterval = setInterval(() => {
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;
    countdownElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    countdownTime--;

    if (countdownTime < 0) {
      clearInterval(countdownInterval);
      alert('Time is up!');
      window.location.href = '../wait/wait.html'; // إعادة التوجيه إلى صفحة التحقق
    }
  }, 1000);
}

async function startListening() {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    const audio = new Audio(question.audio);

    audio.oncanplaythrough = () => {
      audio.play();
      document.getElementById('question-text').innerText = question.text;
    };

    audio.onerror = (e) => {
      console.error('Error playing audio:', e);
      alert('Failed to play audio. Please check the audio file path.');
    };

    currentQuestionIndex++;
  }
}

async function startRecording() {
  if (!stream) {
    try {
      // طلب الوصول إلى الفيديو والصوت
    stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, frameRate: 30 }, // تأكد من تحديد دقة مناسبة
        audio: true
      });

    // إنشاء عنصر الفيديو وإضافته إلى الصفحة
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      videoElement.play();
    videoElement.autoplay = true;
    videoElement.playsInline = true; // خاص بالأجهزة المحمولة
    document.getElementById('video-container').innerHTML = ""; // حذف المحتوى السابق
    ////
      document.getElementById('video-container').appendChild(videoElement);
    } catch (error) {
      console.error('Error accessing media devices.', error);
      alert('Failed to access media devices. Please check your permissions.');
      return;
    }
  }

  if (mediaRecorder && mediaRecorder.state === 'recording') {
    console.warn('Recording is already in progress.');
    return;
  }

  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };
  mediaRecorder.start();
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
}

async function sendAnswers() {
  stopRecording();

  const blob = new Blob(recordedChunks, { type: 'video/webm' });
  const url = URL.createObjectURL(blob);
  localStorage.setItem('recordedVideo', url);

  // تعليق الجزء الخاص بإرسال البيانات إلى الخادم
  /*
  const formData = new FormData();
  formData.append('video', blob);

  const response = await fetch('/api/submit-answers', {
    method: 'POST',
    body: formData
  });

  if (response.ok) {
    window.location.href = 'verification.html';
  } else {
    alert('Failed to submit answers. Please try again.');
  }
  */

 // alert('Recording saved to localStorage.');
  window.location.href = '../wait/wait.html'; // إعادة التوجيه إلى صفحة التحقق
}