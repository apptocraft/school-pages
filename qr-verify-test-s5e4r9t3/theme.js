// ==========================================================
// Theme Manager
// ==========================================================

const themes = [
    "amber.css",
    "burgundy.css",
    "charcoal.css",
    "chocolate.css",
    "coffee.css",
    "coral.css",
    "crimson.css",
    "emerald.css",
    "forest.css",
    "gold.css",
    "indigo.css",
    "lavender.css",
    "lime.css",
    "midnight.css",
    "mint.css",
    "ocean.css",
    "olive.css",
    "rose.css",
    "ruby.css",
    "sapphire.css",
    "sky.css",
    "slate.css",
    "sunset.css",
    "teal.css",
    "violet.css"
];

// Find theme stylesheet
const themeLink = document.querySelector('link[href="theme.css"]');

let currentTheme = "";

// ==========================================================
// Create Floating Button
// ==========================================================

const btn = document.createElement("button");

btn.style.cssText = `
position:fixed;
bottom:20px;
right:20px;
padding:12px 18px;
border:none;
border-radius:12px;
background:#000;
color:#fff;
font-family:Poppins,sans-serif;
cursor:pointer;
box-shadow:0 6px 16px rgba(0,0,0,.25);
z-index:999999;
transition:.2s;
text-align:left;
line-height:1.3;
`;

btn.onmouseenter = () => btn.style.transform = "scale(1.05)";
btn.onmouseleave = () => btn.style.transform = "scale(1)";

// ==========================================================
// Theme Function
// ==========================================================

function randomTheme() {

    let theme;

    do {
        theme = themes[Math.floor(Math.random() * themes.length)];
    } while (theme === currentTheme);

    currentTheme = theme;

    themeLink.href = "themes/" + theme;

    const themeName = theme.replace(".css", "");

    btn.innerHTML = `
        <div style="font-size:14px;font-weight:600;">Change 🎨</div>
        <div style="font-size:12px;font-weight:400;opacity:.9;">${themeName}</div>
    `;
}

// Button click changes theme
btn.onclick = randomTheme;

// ==========================================================
// Initialize
// ==========================================================

window.addEventListener("DOMContentLoaded", () => {

    document.body.appendChild(btn);

    // Random theme after button exists
    randomTheme();

});