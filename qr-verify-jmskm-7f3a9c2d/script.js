const params = new URLSearchParams(window.location.search);
const studentId = params.get("id");

const loadingText = document.getElementById("loadingText");

if (!studentId) {

    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";

    document.body.innerHTML = `
<div class="container">
    <div class="card" style="padding:40px;text-align:center;max-width:700px;margin:auto;">

        <img src="logo.png" style="width:90px;margin-bottom:15px;">

        <h2 style="margin-bottom:10px;color:#0d47a1;">
            Student Verification Portal
        </h2>

        <h3 style="margin-bottom:15px;">
            Welcome to the Official Digital Student Verification System
        </h3>

        <h2 style="margin-bottom:5px;">
            Jamia Mahmudia Sawtul<br>Koran Madrasa
        </h2>

        <p>
            Bhurulia, Kaliganj, Plassey<br>
            Nadia, West Bengal
        </p>

        <hr style="margin:25px 0;">

        <p style="font-size:16px;line-height:1.8;">
            This secure portal enables parents, institutions, employers,
            and other authorized persons to verify the authenticity of
            Student Identity Cards issued by the madrasa.
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
            <strong>Registration No.</strong> S/IL/54232<br>
            <strong>Mobile:</strong> 7501479636 / 9933767534
        </p>

        <p style="margin-top:25px;color:#777;font-size:13px;">
            © 2026 Jamia Mahmudia Sawtul Koran Madrasa<br>
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
`<strong>Request ID:</strong> ${requestId}<br><br>
Connecting to Secure Server...`;

// Remaining messages

const allMessages = [

    "Checking Official Records...",
    "Searching Student Database...",
    "Locating Student Record...",
    "Loading Student Information...",
    "Reading Student Profile...",
    "Verifying Student Details...",
    "Preparing Verification...",
    "Generating Verification Report...",
    "Loading Official Record...",
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
        `<strong>Request ID:</strong> ${requestId}<br><br>` +
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
    document.getElementById("father").textContent = student.father;
    document.getElementById("dob").textContent = formatDate(student.dob);
    document.getElementById("mobile").textContent = student.mobile;

    document.getElementById("address").innerHTML =
    `Vill. ${student.vill}<br>
     P.S. ${student.ps}<br>
     Dist. ${student.dist}`;

    document.title = student.name + " | Student Verification";

    const now = new Date();

    document.getElementById("verifyDate").innerHTML =
        "Verified on : " +
        now.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }) +
        "<br>" +
        now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
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

                <img src="logo.png" style="width:90px;margin-bottom:20px;">

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
