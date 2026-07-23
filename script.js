window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.visibility = 'hidden', 800);
        
        // --- ส่วนที่ใส่เสียง: สั่งให้เพลงเล่นวนซ้ำหลังโหลดหน้าเว็บครบ 5 วินาที ---
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic) {
            bgMusic.play().catch(e => console.log("Autoplay blocked:", e));
        }
    }, 5000); 
});

const card = document.getElementById('card');
function handleMove(e) {
    if (window.innerWidth <= 768) return; 

    let xAxis, yAxis;
    if(e.type === 'touchmove') {
        xAxis = (window.innerWidth / 2 - e.touches[0].pageX) / 40;
        yAxis = (window.innerHeight / 2 - e.touches[0].pageY) / 40;
    } else {
        xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        yAxis = (window.innerHeight / 2 - e.pageY) / 50;
    }
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
}
function resetMove() { card.style.transform = `rotateY(0deg) rotateX(0deg)`; }

document.addEventListener('mousemove', handleMove);
document.addEventListener('mouseleave', resetMove);
document.addEventListener('touchmove', handleMove);
document.addEventListener('touchend', resetMove);

const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const actionZone = document.getElementById('action-zone');
const envContainer = document.getElementById('env-container');
const envelope = document.getElementById('envelope');

let noClickCount = 0;
const noMessages = ["ไม่ให้อภัย!", "แน่ใจเหรอ 🤔", "คิดดูดีๆ น้า", "ใจร้ายจังง่า"];

btnNo.addEventListener('click', (e) => {
    e.preventDefault();
    noClickCount++;
    
    if (noClickCount < 5) {
        btnNo.innerText = noMessages[noClickCount - 1];
    } else {
        card.style.display = 'none';
        document.getElementById('spam-overlay').style.display = 'block';
    }
});

const spamTexts = [
    "เค้าขอโทษน้าา 🥺", "ดีกันนะคะคนเก่ง", "รักหนูที่สุดเลยนะ", 
    "ไม่โกรธเค้าน้าา", "ยอมแล้วจ้าา ปิดไม่ได้หรอก 😝", "ให้อภัยเค้าเถอะนะ 💖"
];

const triggerBtn = document.getElementById('trigger-spam-btn');
const spamOverlay = document.getElementById('spam-overlay');

triggerBtn.addEventListener('click', () => {
    document.getElementById('initial-spam').style.display = 'none';
    
    for(let i = 0; i < 40; i++) {
        setTimeout(() => {
            let msgBox = document.createElement('div');
            msgBox.className = 'spam-msg glass-card';
            
            let randomX = Math.floor(Math.random() * 50) + 10; 
            let randomY = Math.floor(Math.random() * 50) + 10;
            
            msgBox.style.left = randomX + 'vw';
            msgBox.style.top = randomY + 'vh';
            msgBox.style.animation = 'popRandom 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            
            msgBox.innerHTML = `
                <button class="close-x" onclick="this.parentElement.style.display='none'">✖</button>
                <div class="spam-content">
                    <p style="font-weight: 500; font-size: 14px; margin-top: 10px;">
                        ${spamTexts[Math.floor(Math.random() * spamTexts.length)]}
                    </p>
                </div>
            `;
            spamOverlay.appendChild(msgBox);
        }, i * 150); 
    }

    setTimeout(() => {
        let surrenderBtn = document.createElement('button');
        surrenderBtn.className = 'surrender-btn';
        surrenderBtn.innerText = 'ยอมแล้ว! ให้อภัยก็ได้ 🤍';
        surrenderBtn.onclick = acceptApology;
        spamOverlay.appendChild(surrenderBtn);
    }, 6500); 
});

function acceptApology() {
    document.getElementById('spam-overlay').style.display = 'none';
    card.style.display = 'flex';
    actionZone.style.display = 'none'; 
    envContainer.style.display = 'block'; 
    
    setTimeout(() => {
        envContainer.style.animation = 'fadeInSlide 0.6s forwards';
        
        setTimeout(() => { 
            envContainer.classList.add('open'); 
            card.classList.add('clear-bg');
        }, 300);
    }, 50);
}

btnYes.addEventListener('click', acceptApology);

// --- ระบบเปิดการ์ดรูปภาพ ---
const photoCardOverlay = document.getElementById('photo-card-overlay');
const cardImage = document.getElementById('card-image');
const typewriterText = document.getElementById('typewriter-text');

let currentActiveCard = 1; 

const cardData = {
    1: {
        image: "img/1.jpg", 
        finalImage: "img/5.jpg", 
        text: "ง้อนะค้าบเค้ารู้ว่าเค้าทำให้เธอเสียใจ และไม่มีคำแก้ตัวไหนที่จะทำให้สิ่งที่เกิดขึ้นหายไปได้ เค้าเสียใจกับทุกคำพูดและทุกการกระทำที่ทำให้เธอต้องรู้สึกแย่ ขอโทษจากใจจริงนะค้าบบ เค้าไม่ได้ตั้งใจจะทำร้ายความรู้สึกของเธอเลย แต่เค้าก็รู้ว่าคำว่า ไม่ได้ตั้งใจ มันคงไม่พอสำหรับความเจ็บที่เธอได้รับ เค้าตั้งใจมาง้อนะค้าบบ 💖"
    },
    2: {
        image: "img/3.jpg", 
        finalImage: "img/5.jpg", 
        text: "ดีกันได้ไหมค้าบคนดี 🥺 เค้าคิดถึงรอยยิ้มของเธอที่สุดเลยนะ ช่วงที่เราไม่ได้คุยกัน เค้าได้ทบทวนตัวเองหลายอย่าง และเพิ่งรู้ว่าการมีเธออยู่ในชีวิตมันมีค่ามากขนาดไหน เค้าคิดถึงทุกช่วงเวลาที่เราเคยหัวเราะด้วยกัน คิดถึงเวลาที่เธอคอยเป็นกำลังใจให้ และคิดถึงการที่มีเธออยู่ข้าง ๆ ตลอด เค้าไม่อยากให้ความผิดพลาดครั้งนี้เป็นจุดจบของเราสองคน ✨"
    },
    3: {
        image: "img/4.jpg", 
        finalImage: "img/5.jpg", 
        text: "เค้ารักหนูนะ 💓 อย่าโกรธเค้าเลยน้าา เค้าไม่ได้ขอให้เธอหายโกรธทันที แค่อยากขอโอกาสอีกสักครั้งให้เค้าได้พิสูจน์ด้วยการกระทำว่าเค้าจะเปลี่ยนแปลงและดูแลความรู้สึกของเธอให้ดีกว่าเดิม เค้าจะไม่ทำให้โอกาสนั้นต้องเสียเปล่า เพราะเค้าไม่อยากเสียคนที่เค้ารักที่สุดไป กลับมาคืนดีกันเถอะนะคะคนสวย 🌸"
    }
};

let typingTimer = null;

function openCard(heartIndex) {
    currentActiveCard = heartIndex; 
    const data = cardData[heartIndex];
    cardImage.src = data.image; 
    typewriterText.innerText = ""; 
    
    photoCardOverlay.classList.add('show');
    startTypewriter(data.text);
}

function startTypewriter(message) {
    let i = 0;
    typewriterText.innerText = "";
    clearInterval(typingTimer);
    
    typingTimer = setInterval(() => {
        if (i < message.length) {
            typewriterText.innerText += message.charAt(i);
            i++;
        } else {
            clearInterval(typingTimer);
        }
    }, 45); 
}

function closePhotoCard() {
    photoCardOverlay.classList.remove('show');
    clearInterval(typingTimer);
}

const overlay = document.getElementById('overlay');
const finalCardImage = document.getElementById('final-card-image');
const finalResultText = document.getElementById('final-result-text');

function showFinalSuccess() {
    photoCardOverlay.classList.remove('show');
    
    const activeData = cardData[currentActiveCard];
    finalCardImage.src = activeData.finalImage;
    finalResultText.innerText = "เย้! ในที่สุดก็ดีกันแล้วนะ สัญญาว่าจะน่ารักแบบนี้ทุกวันเลย 💖";

    overlay.classList.add('show');
    document.removeEventListener('mousemove', handleMove);
    resetMove();
    createConfetti();
}

function createConfetti() {
    const container = document.getElementById('confetti-container');
    const hearts = ['💖', '💕', '💘', '✨'];
    for(let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('mini-heart');
            heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            container.appendChild(heart);
            setTimeout(() => { heart.remove(); }, 5000);
        }, i * 150); 
    }
}


