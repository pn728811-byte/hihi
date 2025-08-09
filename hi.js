const canvasMatrix = document.getElementById('matrix');
const ctxMatrix = canvasMatrix.getContext('2d');
const canvasCountdown = document.getElementById('countdown');
const ctxCountdown = canvasCountdown.getContext('2d');

// Hàm resize để canvas vừa khít màn hình
function resizeCanvas() {
  canvasMatrix.width = window.innerWidth;
  canvasMatrix.height = window.innerHeight;
  canvasCountdown.width = window.innerWidth;
  canvasCountdown.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ---------- NỀN KÝ TỰ RƠI ----------
const katakana = 'アカサタナハマヤラワイキシチニヒミリウクスツヌフムユルエケセテネヘメレオコソトノホモヨロヴンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const chars = katakana.split('');
const fontSize = 18;
let columns = canvasMatrix.width / fontSize;
let drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctxMatrix.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctxMatrix.fillRect(0, 0, canvasMatrix.width, canvasMatrix.height);
  ctxMatrix.font = fontSize + 'px monospace';
  drops.forEach((y, x) => {
    ctxMatrix.fillStyle = Math.random() > 0.5 ? '#ff0000' : '#00bfff';
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctxMatrix.fillText(text, x * fontSize, y * fontSize);
    if (y * fontSize > canvasMatrix.height && Math.random() > 0.975) drops[x] = 0;
    drops[x]++;
  });
}
setInterval(drawMatrix, 33);

// ---------- HIỆN CHỮ TRƯỚC KHI ĐẾM NGƯỢC ----------
const preMessage = "Điều này dành cho Trà My.";
const preMessageElem = document.createElement("div");
preMessageElem.style.position = "fixed";
preMessageElem.style.top = "50%";
preMessageElem.style.left = "50%";
preMessageElem.style.transform = "translate(-50%, -50%)";
preMessageElem.style.color = "#ff4eb8";
preMessageElem.style.fontFamily = "monospace";
preMessageElem.style.fontSize = "28px";
preMessageElem.style.textAlign = "center";
preMessageElem.style.textShadow =
  "0 0 5px #ff4eb8, 0 0 10px #ff4eb8, 0 0 20px #ff4eb8, 0 0 30px #ff4eb8";
preMessageElem.style.zIndex = "30";
document.body.appendChild(preMessageElem);

async function showPreMessage() {
  preMessageElem.textContent = "";
  for (let i = 0; i < preMessage.length; i++) {
    preMessageElem.textContent += preMessage.charAt(i);
    await new Promise(r => setTimeout(r, 80)); // tốc độ gõ
  }
  await new Promise(r => setTimeout(r, 1000)); // chờ 1s
  preMessageElem.remove();
}

// ---------- COUNTDOWN ----------
const numbers = ['3', '2', '1'];
let currentIndex = 0;

function drawNumberAsChars(number) {
  ctxCountdown.clearRect(0, 0, canvasCountdown.width, canvasCountdown.height);
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = 300;
  tempCanvas.height = 300;
  tempCtx.fillStyle = '#fff';
  tempCtx.font = 'bold 250px monospace';
  tempCtx.textAlign = 'center';
  tempCtx.textBaseline = 'middle';
  tempCtx.fillText(number, tempCanvas.width / 2, tempCanvas.height / 2);

  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const particles = [];
  for (let y = 0; y < tempCanvas.height; y += 5) {
    for (let x = 0; x < tempCanvas.width; x += 5) {
      const index = (y * tempCanvas.width + x) * 4;
      if (imageData.data[index + 3] > 128) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        particles.push({ x, y, char });
      }
    }
  }
  particles.forEach(p => {
    ctxCountdown.fillStyle = '#ff4eb8';
    ctxCountdown.font = '16px monospace';
    ctxCountdown.fillText(
      p.char,
      canvasCountdown.width / 2 - tempCanvas.width / 2 + p.x,
      canvasCountdown.height / 2 - tempCanvas.height / 2 + p.y
    );
  });
}

// Chạy: hiện chữ → đếm ngược → câu hỏi
setTimeout(() => {
  showPreMessage().then(() => {
    const interval = setInterval(() => {
      drawNumberAsChars(numbers[currentIndex]);
      currentIndex++;
      if (currentIndex >= numbers.length) {
        clearInterval(interval);
        setTimeout(() => {
          ctxCountdown.clearRect(0, 0, canvasCountdown.width, canvasCountdown.height);
          startQuestionFlow();
        }, 1000);
      }
    }, 1000);
  });
}, 2000);

// ---------- PHẦN CÂU HỎI ----------
const positiveAnswers = [
  "Tôi biết mà hihi",
  "Tôi cũng thích bạn nhiều lắm ❤"
];
const negativeLoop = [
  "Chắc chắn chứ?",
  "Suy nghĩ kĩ chưa?",
  "Suy nghĩ lại đi...",
  "Năn nỉ mà...",
  "Hỏi lại nhé, bạn thích tôi không?",
  "Bạn thích tôi không?"
];
const finalText = `Em à, trong cuộc sống của anh, em như một viên ngọc quý mà nhân duyên đã ban tặng. Mỗi ngày trôi qua, anh càng nhận ra giá trị của em không chỉ nằm ở vẻ đẹp bên ngoài mà còn ở tâm hồn ấm áp và trái tim chân thành. Em là nguồn động lực giúp anh vượt qua những khó khăn, là người bạn đồng hành luôn sẵn sàng lắng nghe và chia sẻ. Những khoảnh khắc bên em, từ những tiếng cười đến những giây phút lặng im, đều trở thành những kỷ niệm quý giá mà anh sẽ trân trọng mãi mãi. Em không chỉ là người yêu, mà còn là ánh sáng dẫn đường trong cuộc sống của anh. Anh cảm thấy may mắn và biết ơn vì có em bên cạnh, và anh sẽ luôn nỗ lực để bảo vệ và gìn giữ viên ngọc quý này.`;

let questionState = 'askLike';
let positiveIndex = 0;
let negativeIndex = 0;

function startQuestionFlow() {
  questionState = 'askLike';
  positiveIndex = 0;
  negativeIndex = 0;
  updateQuestion("Bạn có thích tôi không?");
  showQuestionBox();
  document.getElementById('yesBtn').style.display = 'inline-block';
  document.getElementById('yesBtn').textContent = 'Có';
  document.getElementById('noBtn').style.display = 'inline-block';
  document.getElementById('thankBtn').style.display = 'none';
  document.getElementById('message').textContent = '';
}

function updateQuestion(text) {
  document.getElementById('question-text').textContent = text;
  document.getElementById('message').textContent = '';
}
function showQuestionBox() {
  document.getElementById('question-box').classList.remove('hidden');
}

async function typeWriter(text, element) {
  element.textContent = '';
  for (let i = 0; i < text.length; i++) {
    element.textContent += text.charAt(i);
    await new Promise(resolve => setTimeout(resolve, 50));
  }
}

document.getElementById('yesBtn').addEventListener('click', async () => {
  if (questionState === 'askLike' || questionState === 'negative') {
    questionState = 'positive';
    if (positiveIndex < positiveAnswers.length) {
      updateQuestion(positiveAnswers[positiveIndex]);
      positiveIndex++;
      if (positiveIndex === 1) document.getElementById('noBtn').style.display = 'none';
      document.getElementById('yesBtn').textContent = 'OK';
    }
  } else if (questionState === 'positive') {
    if (positiveIndex < positiveAnswers.length) {
      updateQuestion(positiveAnswers[positiveIndex]);
      positiveIndex++;
    } else {
      document.getElementById('yesBtn').style.display = 'none';
      document.getElementById('question-text').textContent = '';
      const messageElem = document.getElementById('message');
      await typeWriter(finalText, messageElem);
      document.getElementById('thankBtn').style.display = 'inline-block';
    }
  }
});

document.getElementById('noBtn').addEventListener('click', () => {
  if (negativeIndex >= negativeLoop.length) negativeIndex = 0;
  questionState = 'negative';
  updateQuestion(negativeLoop[negativeIndex]);
  negativeIndex++;
});

document.getElementById('thankBtn').addEventListener('click', () => {
  document.getElementById('thankBtn').style.display = 'none';
  document.getElementById('message').textContent = '';
  document.getElementById('question-text').textContent = '';
  document.getElementById('yesBtn').style.display = 'none';
  document.getElementById('noBtn').style.display = 'none';
  const questionBox = document.getElementById('question-box');
  questionBox.innerHTML = '<div style="color:#ff4eb8;font-size:32px;font-weight:bold;text-align:center;margin-top:100px;text-shadow:0 0 5px #ff4eb8,0 0 10px #ff4eb8,0 0 20px #ff4eb8,0 0 30px #ff4eb8;">Anh yêu em! 💖</div>';
  questionBox.classList.remove('hidden');
});

// Khóa xoay ngang nếu được
if (screen.orientation && screen.orientation.lock) {
  screen.orientation.lock("landscape").catch(e => console.log("Không thể khóa màn hình:", e));
}
