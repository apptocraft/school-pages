const params = new URLSearchParams(window.location.search);

const studentId = params.get("id");

if (!studentId) {

    document.body.innerHTML = `
    <div class="container">
        <div class="card" style="padding:40px;text-align:center;">
            <h2 style="color:#c62828;">Invalid Request</h2>
            <p>No Student ID found.</p>
        </div>
    </div>
    `;

    throw new Error("No Student ID");

}

fetch("students.json")

.then(response => {

    if (!response.ok) {
        throw new Error("Unable to load students.json");
    }

    return response.json();

})

.then(data => {

    const student = data.find(s => s.id === studentId);

    if (!student) {

        document.body.innerHTML = `
        <div class="container">
            <div class="card" style="padding:40px;text-align:center;">
                <h2 style="color:#c62828;">Student Not Found</h2>
                <p>The QR Code is invalid or the student record does not exist.</p>
            </div>
        </div>
        `;

        return;

    }

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

})

.catch(error => {

    console.error(error);

    document.body.innerHTML = `
    <div class="container">
        <div class="card" style="padding:40px;text-align:center;">
            <h2 style="color:#c62828;">Unable to Load Student Data</h2>

            <p>
            Please try again later.
            </p>
        </div>
    </div>
    `;

});

function formatDate(dateString){

    const parts = dateString.split("-");

    if(parts.length !== 3){

        return dateString;

    }

    const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    return `${parts[0]} ${months[parseInt(parts[1])-1]} ${parts[2]}`;

}