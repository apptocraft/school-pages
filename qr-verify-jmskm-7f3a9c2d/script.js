const params = new URLSearchParams(window.location.search);
const studentId = params.get("id");

const loadingText = document.getElementById("loadingText");

if (!studentId) {

    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";

    document.body.innerHTML = `
    <div class="container">
        <div class="card" style="padding:40px;text-align:center;">
            <h2 style="color:#c62828;">Student Verification Portal</h2>
            <p>Please scan the QR Code printed on the Student ID Card.</p>
        </div>
    </div>
    `;

    throw new Error("No Student ID");

}

setTimeout(() => {
    loadingText.innerHTML = "Connecting to Secure Server...";
}, 300);

setTimeout(() => {
    loadingText.innerHTML = "Retrieving Student Record...";
}, 1200);

setTimeout(() => {
    loadingText.innerHTML = "Validating Digital Identity...";
}, 2200);

setTimeout(() => {
    loadingText.innerHTML = "✔ Verification Successful";
}, 3200);

fetch(`students/${studentId}.json`)

.then(response => {

    if (!response.ok) {
        throw new Error("Student not found");
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

    },3500);

})

.catch(error => {

    console.error(error);

    alert("Student Not Found");

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