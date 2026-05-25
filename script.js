console.log("💖 CuteOS v2.0 Initialized...");



// --- 1. Dynamic Background ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.onresize = resize;
resize();



class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 0.5 + 0.2;
        this.char = Math.random() > 0.5 ? '💖' : '✨';
        this.size = Math.random() * 15 + 10;
    }
    update() {
        this.y -= this.speed;
        if(this.y < -20) { this.y = canvas.height + 20; this.x = Math.random() * canvas.width; }
    }
    draw() {
        ctx.font = `${this.size}px Arial`;
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.fillText(this.char, this.x, this.y);
    }
}



for(let i=0; i<30; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
animate();



// --- 2. Draggable Logic ---
function makeDraggable(el) {
    let pos1=0, pos2=0, pos3=0, pos4=0;
    const header = el.querySelector('.title-bar');
    header.onmousedown = dragMouseDown;
    header.ontouchstart = dragMouseDown;



    function dragMouseDown(e) {
        e = e || window.event;
        let clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        let clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        pos3 = clientX;
        pos4 = clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDrag;
        el.style.zIndex = 100;
    }



    function elementDrag(e) {
        e = e || window.event;
        let clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        let clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        pos1 = pos3 - clientX;
        pos2 = pos4 - clientY;
        pos3 = clientX;
        pos4 = clientY;
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
        el.style.transform = "translate(0,0)";
    }



    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}
makeDraggable(document.getElementById('main-window'));
makeDraggable(document.getElementById('widget-music'));



// --- 3. Interaction Logic ---
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const teaseBubble = document.getElementById('tease-bubble');
const bubbleText = document.getElementById('bubble-text');
const hugOverlay = document.getElementById('hug-overlay');
const mainWindow = document.getElementById('main-window');



// Texts to cycle through for the "NO" button
const rejectionTexts = [
    "Click Again", 
    "Really?", 
    "Are you sure?", 
    "Think Again", 
    "Last Chance!", 
    "Pls Say Yes 🥺", 
    "Wrong Button!"
];
let rejectionIndex = 0;



// NO Button Logic - THE LOOP
btnNo.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // 1. Change Text
    const text = rejectionTexts[rejectionIndex % rejectionTexts.length];
    btnNo.innerText = text;
    rejectionIndex++;



    // 2. Shake Button
    btnNo.classList.remove('shake-anim');
    void btnNo.offsetWidth; // Trigger reflow
    btnNo.classList.add('shake-anim');



    // 3. Show Bubble Tip
    bubbleText.innerText = "Click the other one! 👉";
    teaseBubble.classList.remove('hidden');
    
    // 4. Change Color slightly to indicate urgency
    btnNo.style.backgroundColor = "#ff" + Math.floor(Math.random()*99) + "b2";
    
    console.log(`⛔ Rejection Attempt #${rejectionIndex}: Blocked.`);
});



// YES Button Logic - SUCCESS
btnYes.addEventListener('click', () => {
    console.log("💖 Success! Sending Hug...");
    
    // 1. Hide the Main Window with animation
    mainWindow.style.transition = "transform 0.5s ease-in, opacity 0.5s ease-in";
    mainWindow.style.transform = "translate(-50%, -50%) scale(0.1) rotate(10deg)";
    mainWindow.style.opacity = "0";



    // 2. Show Overlay with your image
    setTimeout(() => {
        hugOverlay.classList.add('active');
        fireConfetti();
    }, 500);
});



// --- 4. Confetti Cannon ---
function fireConfetti() {
    const colors = ['#ff7eb3', '#7afcff', '#ffe66d', '#ffffff'];
    for(let i=0; i<150; i++) {
        const el = document.createElement('div');
        el.style.position = 'fixed';
        el.style.left = '50%';
        el.style.top = '50%';
        el.style.width = '8px'; 
        el.style.height = '8px';
        el.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
        el.style.zIndex = 9999;
        document.body.appendChild(el);



        const angle = Math.random() * Math.PI * 2;
        const dist = 100 + Math.random() * 300;
        const size = Math.random() * 10 + 5;
        
        el.animate([
            { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px) rotate(${Math.random()*360}deg)`, opacity: 0 }
        ], { duration: 1500, easing: 'cubic-bezier(0, .9, .57, 1)' }).onfinish = () => el.remove();
    }
}

// --- 5. Interactive Click Effects ---
const avatarImages = ['avatar_happy.png', 'avatar_heart.png', 'avatar_shy.png'];
document.addEventListener('click', (e) => {
    // Ignore clicks on buttons, windows, and characters
    if (e.target.closest('button') || e.target.closest('.retro-window') || e.target.closest('.char-container') || e.target.closest('#hug-overlay')) return;
    
    const el = document.createElement('img');
    el.src = avatarImages[Math.floor(Math.random() * avatarImages.length)];
    el.style.position = 'fixed';
    el.style.left = (e.clientX - 25) + 'px';
    el.style.top = (e.clientY - 25) + 'px';
    el.style.width = '40px';
    el.style.height = '40px';
    el.style.pointerEvents = 'none';
    el.style.zIndex = 9999;
    document.body.appendChild(el);
    
    el.animate([
        { transform: 'translateY(0) scale(0.5)', opacity: 1 },
        { transform: 'translateY(-100px) scale(1.2)', opacity: 0 }
    ], { duration: 1000, easing: 'ease-out' }).onfinish = () => el.remove();
});

// Character Interactions
document.querySelectorAll('.char-container').forEach(char => {
    char.addEventListener('click', () => {
        char.classList.add('jump-anim');
        setTimeout(() => char.classList.remove('jump-anim'), 500);
    });
});

// --- 6. Flirty Text Cycler ---
const flirtyLines = [
    "> Are you a keyboard? Because you're exactly my type. ⌨️",
    "> I must be lagging, because my heart just skipped a beat. 💓",
    "> Do you believe in love at first click? 🖱️",
    "> Will you be the CSS to my HTML? 🎨",
    "> You must be a loop, because I can't stop thinking about you. 🔁",
    "> Are you an API? Because I want to connect with you. 🔗"
];
let flirtyIndex = 0;
const flirtyEl = document.getElementById('flirty-text');

function typeLine(line, callback) {
    let i = 0;
    flirtyEl.innerText = "> ";
    const interval = setInterval(() => {
        flirtyEl.innerText += line.charAt(i);
        i++;
        if (i >= line.length) {
            clearInterval(interval);
            setTimeout(callback, 3000); // Wait 3 seconds before next line
        }
    }, 50); // Typing speed
}

function cycleFlirtyText() {
    const line = flirtyLines[flirtyIndex].replace("> ", "");
    typeLine(line, () => {
        flirtyIndex = (flirtyIndex + 1) % flirtyLines.length;
        cycleFlirtyText();
    });
}
if(flirtyEl) setTimeout(cycleFlirtyText, 2000); // Start after 2 seconds

// --- 7. Speech Bubbles & Automated Avatar Rain ---
const bubbleBoy = document.getElementById('bubble-boy');
const bubbleGirl = document.getElementById('bubble-girl');
const boyLines = ["You're cute!", "I love you!", "Notice me 🥺"];
const girlLines = ["No, you! 💖", "Aww!", "Hehe 🥰"];

setInterval(() => {
    // Randomly show bubbles
    if (Math.random() > 0.5) {
        if(bubbleBoy) {
            bubbleBoy.innerText = boyLines[Math.floor(Math.random() * boyLines.length)];
            bubbleBoy.classList.remove('hidden');
            bubbleBoy.classList.add('pop-in');
            setTimeout(() => {
                bubbleBoy.classList.add('hidden');
                bubbleBoy.classList.remove('pop-in');
            }, 3000);
        }
    } else {
        if(bubbleGirl) {
            bubbleGirl.innerText = girlLines[Math.floor(Math.random() * girlLines.length)];
            bubbleGirl.classList.remove('hidden');
            bubbleGirl.classList.add('pop-in');
            setTimeout(() => {
                bubbleGirl.classList.add('hidden');
                bubbleGirl.classList.remove('pop-in');
            }, 3000);
        }
    }
}, 5000);

// Automated Avatar Rain
setInterval(() => {
    const el = document.createElement('img');
    el.src = avatarImages[Math.floor(Math.random() * avatarImages.length)];
    el.style.position = 'fixed';
    el.style.left = (Math.random() * window.innerWidth) + 'px';
    el.style.top = window.innerHeight + 'px'; // Start from bottom
    el.style.width = (Math.random() * 20 + 20) + 'px'; // random size
    el.style.height = el.style.width;
    el.style.pointerEvents = 'none';
    el.style.zIndex = 0; // Behind main window
    document.body.appendChild(el);
    
    el.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 0.5 },
        { transform: `translateY(-${window.innerHeight + 100}px) rotate(${Math.random()*360}deg)`, opacity: 0 }
    ], { duration: Math.random() * 3000 + 4000, easing: 'linear' }).onfinish = () => el.remove();
}, 800); // Spawn a new avatar every 800ms
