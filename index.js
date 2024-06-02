document.getElementById("calculate").onclick = function() {
    let m1_mark = parseFloat(document.getElementById("m1_mark").value);
    let m2_mark = parseFloat(document.getElementById("m2_mark").value);
    let m3_mark = parseFloat(document.getElementById("m3_mark").value);


    if ((skill_done.checked && skill_not_done.checked) || 
        (extra_done.checked && extra_not_done.checked) || 
        (m1_mark > 100 || m2_mark > 100 || m3_mark > 100)) {
        return true;
    }
}

function internal_mark_calculation(m1_mark,m2_mark,m3_mark){
    let internal_mark = Math.floor((((m1_mark * 1.5) + (m2_mark * 1.5)) * 0.075) + ((m3_mark * 1.5) * 0.15)); 
    if(internal_mark>=30){// one more condition checker to avoid errors
        internal_mark=30;
    }
    if (m1_mark + m2_mark + m3_mark >= 120) {
        internal_mark += 5;
    }
    return internal_mark;
}
function extra_criteria(internal_mark){ // checks for extra criteria
    if (skill_done.checked) {
        internal_mark += 2.5;
    }
    if (extra_done.checked) {
        internal_mark += 2.5;
    }
    return internal_mark
}
function external_mark_calculation(internal_mark){ //calcualtes the external mark
    let external_mark = 91;
    if (internal_mark >= 23) {
        external_mark = 45;
    } else {
        external_mark = external_mark - (internal_mark * 2);
    }

    alert("YOU MUST SCORE " + external_mark + " IN EXTERNAL EXAM TO PASS OUT OF 100\nINTERNAL MARK : "+internal_mark+" OUTOFF 40");
};
