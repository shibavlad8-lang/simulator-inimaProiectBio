const heart = document.getElementById("heart");
const bpmSlider = document.getElementById("bpm");
const bpmValue = document.getElementById("bpmValue");
const phaseText = document.getElementById("phaseText");
const warning = document.getElementById("warning");
const canvas = document.getElementById("ecgCanvas");
const ctx = canvas.getContext("2d");

let bpm = 72;
let phase = true;
let x = 0;
let arrhythmia = false;

// =====================
// UPDATE INIMĂ
// =====================
function updateHeartSpeed() {
    let duration = 60 / bpm;
    heart.style.animationDuration = duration + "s";
}

// =====================
// SISTOLĂ / DIASTOLĂ
// =====================
function updatePhaseText() {
    if (phase) {
        phaseText.textContent = "Sistolă – Inima pompează sânge";
    } else {
        phaseText.textContent = "Diastolă – Inima se umple cu sânge";
    }
    phase = !phase;
}

// =====================
// AVERTIZĂRI
// =====================
function updateWarning() {
    if (bpm > 160) {
        warning.textContent = "⚠ Puls extrem de ridicat! Risc cardiovascular.";
        heart.style.backgroundColor = "darkred";
    } 
    else if (bpm > 100) {
        warning.textContent = "Puls crescut – activitate intensă.";
        heart.style.backgroundColor = "orangered";
    } 
    else if (bpm < 50) {
        warning.textContent = "⚠ Puls scăzut – posibilă bradicardie.";
        heart.style.backgroundColor = "purple";
    }
    else {
        warning.textContent = "Puls normal.";
        heart.style.backgroundColor = "red";
    }
}

// =====================
// SLIDER
// =====================
bpmSlider.addEventListener("input", function() {
    bpm = parseInt(this.value);
    bpmValue.textContent = bpm;
    arrhythmia = false;
    updateHeartSpeed();
    updateWarning();
});

// =====================
// MODURI
// =====================
function setMode(value) {
    arrhythmia = false;
    bpm = value;
    bpmSlider.value = value;
    bpmValue.textContent = value;
    updateHeartSpeed();
    updateWarning();
}

function stressMode() {
    arrhythmia = false;
    let interval = setInterval(() => {
        bpm += 5;
        if (bpm >= 140) clearInterval(interval);
        bpmSlider.value = bpm;
        bpmValue.textContent = bpm;
        updateHeartSpeed();
        updateWarning();
    }, 200);
}

function relaxMode() {
    arrhythmia = false;
    let interval = setInterval(() => {
        bpm -= 5;
        if (bpm <= 70) clearInterval(interval);
        bpmSlider.value = bpm;
        bpmValue.textContent = bpm;
        updateHeartSpeed();
        updateWarning();
    }, 200);
}

function arrhythmiaMode() {
    arrhythmia = true;
    warning.textContent = "⚡ Aritmie simulată – bătăi neregulate.";
}

// =====================
// ECG
// =====================
function drawECG() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, 75);

    for (let i = 0; i < canvas.width; i++) {
        let amplitude = 20;

        if (arrhythmia && Math.random() < 0.02) {
            amplitude = 60;
        }

        let y = 75 + Math.sin((i + x) * 0.05) * amplitude;
        ctx.lineTo(i, y);
    }

    ctx.strokeStyle = "lime";
    ctx.stroke();

    x += bpm / 10;
}

// =====================
// STATISTICI
// =====================
function showStats() {
    let age = parseInt(document.getElementById("ageInput").value);

    if (!age || age < 1) {
        alert("Introdu o vârstă validă.");
        return;
    }

    let maxPulse = 220 - age;
    let beatsDay = bpm * 60 * 24;

    alert(
        "Puls maxim teoretic: " + maxPulse + " BPM\n" +
        "Bătăi pe zi: " + beatsDay.toLocaleString()
    );
}

// =====================
setInterval(updatePhaseText, 500);
setInterval(drawECG, 50);

updateHeartSpeed();
updateWarning();