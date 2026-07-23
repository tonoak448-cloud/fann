window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.visibility = 'hidden', 800);
    }, 5000); 
});

const card = document.getElementById('card');
function handleMove(e) {
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
            
            let randomX = Math.floor(Math.random() * 60) + 10; 
            let randomY = Math.floor(Math.random() * 60) + 10;
            
            msgBox.style.left = randomX + 'vw';
            msgBox.style.top = randomY + 'vh';
            msgBox.style.animation = 'popRandom 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            
            msgBox.innerHTML = `
                <button class="close-x" onclick="this.parentElement.style.display='none'">✖</button>
                <div class="spam-content">
                    <p style="font-weight: 500; font-size: 16px; margin-top: 10px;">
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
    card.style.display = 'none'; 
    envContainer.style.display = 'block'; 
    
    setTimeout(() => {
        envContainer.style.animation = 'fadeInSlide 0.6s forwards';
        
        setTimeout(() => { 
            envContainer.classList.add('open'); 
        }, 300);
    }, 50);
}

btnYes.addEventListener('click', acceptApology);

const overlay = document.getElementById('overlay');
const resultText = document.getElementById('result-text');

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

function showResult(choice) {
    resultText.innerText = `หนูเลือก: "${choice}"`;
    overlay.classList.add('show');
    document.removeEventListener('mousemove', handleMove);
    resetMove();
    createConfetti();
}