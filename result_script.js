let marks_display = JSON.parse(localStorage.getItem('marks_display'));
        alert("Due to the relative grading system in our college, it is not possible to predict the exact GRADE as it depends on the highest mark achieved by a student. The possible marks are displayed below.")
        
        if (marks_display) {
            document.querySelector(".div4").innerHTML = marks_display[0];
            document.querySelector(".div6").innerHTML = marks_display[1];
            document.querySelector(".div8").innerHTML = marks_display[2];
            document.querySelector(".div10").innerHTML = marks_display[3];
            document.querySelector(".div12").innerHTML = marks_display[4];
            document.querySelector(".div14").innerHTML = marks_display[5];
            document.querySelector(".div16").innerHTML = marks_display[6];
        }
document.querySelector(".sub_head").innerHTML="INTERNAL MARKS : "+marks_display[7];
function return_page(){
    window.location.href = "index.html";
}