function main() { // main fucntion 
    let m1_mark = Number(document.getElementById("m1_mark").value);
    let m2_mark = Number(document.getElementById("m2_mark").value);
    let m3_mark = Number(document.getElementById("m3_mark").value);
    console.log("hi")
    if(exception_condition_checker(m1_mark,m2_mark,m3_mark)){
        alert("Wrong input try again !!!");//displays wrong input
        return;
    }
    let internal_mark=internal_mark_calculation(m1_mark,m2_mark,m3_mark);
    internal_mark=extra_criteria(internal_mark)
    let external_mark=external_mark_calculation(internal_mark);
    display_result(internal_mark,external_mark);//displaying the output
    
};
function exception_condition_checker(m1_mark,m2_mark,m3_mark){ // checks for double clicks or some eror inputs
    if ((skill_done.checked && skill_not_done.checked) || 
        (extra_done.checked && extra_not_done.checked) || 
        (m1_mark > 100 || m2_mark > 100 || m3_mark > 100)) {
        alert("Wrong input try again !!!");
        return;
    }

    let internal_mark = Math.floor((((m1_mark * 1.5) + (m2_mark * 1.5)) * 0.075) + ((m3_mark * 1.5) * 0.15));
    if(internal_mark>=30){
        internal_mark=30;
    }
    if (m1_mark + m2_mark + m3_mark >= 120) {
        internal_mark += 5;
    }
    if (skill_done.checked) {
        internal_mark += 2.5;
    }
    if (extra_done.checked) {
        internal_mark += 2.5;
    }
    let external_mark = 91;
    if (internal_mark >= 23) {
        external_mark = 45;
    } else {
        external_mark = external_mark - (internal_mark * 2);
    }
    return external_mark;
}
function display_result(internal_mark,external_mark){
    alert("YOU MUST SCORE " + external_mark + " IN EXTERNAL EXAM TO PASS OUT OF 100\nINTERNAL MARK : " + internal_mark + " OUT OF 40");
    
    const internal_display = document.getElementById("internal_publish");
    const external_display = document.getElementById("external_publish");
    
    internal_display.classList.add("internal_mark_publisher");
    external_display.classList.add("external_mark_publisher");
    
    internal_display.innerHTML = "Internal Mark: " + internal_mark;
    external_display.innerHTML = "External Mark: " + external_mark + " (To pass)";
}