// Display Name (Title Case)
const schoolTitleCase = CONFIG.school.name
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());

const params = new URLSearchParams(window.location.search);
const studentId = params.get("id");
const loadingText = document.getElementById("loadingText");

// Loading Screen
document.getElementById("loadingSchoolLogo").src = CONFIG.school.logo;
document.getElementById("loadingSchoolName").textContent = CONFIG.school.name;

const loadingTagline = document.getElementById("loadingSchoolTagline");

if (CONFIG.school.tagline !== "") {
    loadingTagline.textContent = CONFIG.school.tagline;
} else {
    loadingTagline.style.display = "none";
}


// Main Header | School Details
document.getElementById("schoolLogo").src = CONFIG.school.logo;
document.getElementById("schoolName").textContent = CONFIG.school.name;

const schoolTagline = document.getElementById("schoolTagline");

if (CONFIG.school.tagline !== "") {
    schoolTagline.textContent = `(${CONFIG.school.tagline})`;
} else {
    schoolTagline.style.display = "none";
}

document.getElementById("schoolAddress").innerHTML =
    CONFIG.school.address.replace(/\n/g, "<br>");

const schoolInfo = document.getElementById("schoolInfo");

schoolInfo.innerHTML = "";

CONFIG.school.info.forEach(item => {

    schoolInfo.innerHTML += `
        <div class="school-info-item">
            <strong>${item.label} :</strong>
            <span>${item.value}</span>
        </div>
    `;

});

// Main Header | Verification Successful
document.getElementById("verificationTitle").textContent =
    CONFIG.verification.title;

document.getElementById("verificationMessage").innerHTML =
    CONFIG.verification.message.replace(
        "{school}",
        `<strong>${schoolTitleCase}</strong>`
    );

// Footer
document.getElementById("footerText").textContent =
    CONFIG.footer.text;

document.getElementById("footerTitle").textContent =
    CONFIG.footer.title.replace(
        "{school}",
        schoolTitleCase
    );

if (!studentId) {

    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";

    document.body.innerHTML = `
<div class="container">
    <div class="card" style="padding:40px;text-align:center;max-width:700px;margin:auto;">

        <img src="${CONFIG.school.logo}" style="width:90px;margin-bottom:15px;">

        <h2 style="margin-bottom:10px;color:#0d47a1;">
            Student Verification Portal
        </h2>

        <h3 style="margin-bottom:15px;">
            Welcome to the Official Digital Student Verification System
        </h3>

        <h2 style="margin-bottom:5px;">
            ${CONFIG.school.name}
        </h2>

        <p>
            ${CONFIG.school.address.replace(/\n/g,"<br>")}
        </p>

        <hr style="margin:25px 0;">

        <p style="font-size:16px;line-height:1.8;">
            This secure portal enables parents, institutions, employers,
            and other authorized persons to verify the authenticity of
            Student Identity Cards issued by the institution.
        </p>

        <div style="margin:25px 0;padding:18px;background:#eef6ff;border-radius:8px;font-weight:600;">
            📷 Please scan the QR Code printed on the Student ID Card to continue.
        </div>

        <p style="line-height:2;">
            ✔ Official School Records<br>
            ✔ Secure Digital Verification<br>
            ✔ Instant Online Verification
        </p>

        <hr style="margin:25px 0;">

        <p>
    ${CONFIG.school.info.map(item => `
        <strong>${item.label}:</strong> ${item.value}
    `).join("<br>")}
        </p>

        <p style="margin-top:25px;color:#777;font-size:13px;">
            © ${new Date().getFullYear()} ${schoolTitleCase}<br>
            All Rights Reserved
        </p>

    </div>
</div>
    `;

    throw new Error("No Student ID");

}

// -------------------------------------
// Professional Random Verification Flow
// -------------------------------------

function random(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

// Request ID

function generateReference() {

    const chars = "ABCDEF0123456789";

    let ref = "";

    for (let group = 0; group < 3; group++) {

        if (group > 0) ref += "-";

        for (let i = 0; i < 4; i++) {

            ref += chars.charAt(
                Math.floor(Math.random() * chars.length)
                );

        }

    }

    return ref;

}

const requestId = generateReference();

// First message always fixed

loadingText.innerHTML =
`<span class="request-id">Request ID: ${requestId}</span><br><br>
Connecting to Secure Server...`;

// Remaining messages

const allMessages = [

    "Checking Records...",
    "Searching Database...",
    "Locating Student...",
    "Loading Details...",
    "Reading Profile...",
    "Verifying Data...",
    "Preparing Report...",
    "Generating Report...",
    "Loading Record...",
    "Verification in Progress..."

];

// Shuffle

const shuffled = [...allMessages].sort(() => Math.random()-0.5);

// Random number of messages

const count = random(2,5);

const messages = shuffled.slice(0,count);

let totalDelay = random(200,500);

for(let i=0;i<messages.length;i++){

    const wait = random(150,700);

    totalDelay += wait;

    setTimeout(()=>{

        loadingText.innerHTML =
    `<span class="request-id">Request ID: ${requestId}</span><br><br>` +
    messages[i];

},totalDelay);

}

// Random finish delay

totalDelay += random(200,500);

fetch(`students/${studentId}.json`, {
    cache: "no-store"
})

.then(response => {

    if (!response.ok) {
        throw new Error("Student record not found");
    }

    return response.json();

})

.then(student => {

    document.getElementById("name").textContent = student.name;
    document.getElementById("class").textContent = student.class;

    const detailsContainer = document.getElementById("studentDetails");

    detailsContainer.innerHTML = "";

    CONFIG.student.fields
        .filter(field => field.key !== "name" && field.key !== "class")
        .forEach(field => {

            let value = student[field.key] || "";

            if (field.key === "dob") {
                value = formatDate(value);
            }

            if (field.key === "address") {

                if (student.address) {

                    value = student.address;

                } else {

                    const address = [];

                    if (student.vill)
                        address.push(`Vill. ${student.vill}`);

                    if (student.po)
                        address.push(`P.O. ${student.po}`);

                    if (student.ps)
                        address.push(`P.S. ${student.ps}`);

                    if (student.dist)
                        address.push(`Dist. ${student.dist}`);

                    if (student.state)
                        address.push(`State ${student.state}`);

                    if (student.pin)
                        address.push(`PIN ${student.pin}`);

                    value = address.join("<br>");

                }

            }

            if (!value) return;

            detailsContainer.innerHTML += `
                <div class="item">
                    <div class="icon">${field.icon || ""}</div>
                    <div>
                        <label>${field.label}</label>
                        <p>${value}</p>
                    </div>
                </div>
            `;
        });


    document.title = student.name + " | Student Verification";

    const now = new Date();

    document.getElementById("verifyDate").textContent =
        "Verified on: " +
        now.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }) +
        ", " +
        now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        });

    setTimeout(function(){

        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("main-content").style.display = "block";

    }, totalDelay);

})

.catch(error => {

    console.error(error);

    setTimeout(() => {

        document.getElementById("loading-screen").style.display = "none";

        document.body.innerHTML = `
        <div class="container">
            <div class="card" style="padding:40px;text-align:center;max-width:700px;margin:auto;">

                <img src="${CONFIG.school.logo}" style="width:90px;margin-bottom:20px;">

                <h2 style="color:#d32f2f;">
                    Student Record Not Found
                </h2>

                <p>
                    The QR Code or Student ID is invalid.
                </p>

                <p style="color:#666;">
                    Please scan the original QR Code printed on the Student ID Card.
                </p>

            </div>
        </div>
        `;

    }, totalDelay);   // same time as success

});

function formatDate(dateString){

    const parts = dateString.split("-");

    if(parts.length!==3){
        return dateString;
    }

    const months=[
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    return `${parts[0]} ${months[parseInt(parts[1])-1]} ${parts[2]}`;

}