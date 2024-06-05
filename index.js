function main() { // main fucntion 
    let m1_mark = Number(document.getElementById("m1_mark").value);
    let m2_mark = Number(document.getElementById("m2_mark").value);
    let m3_mark = Number(document.getElementById("m3_mark").value);
    if(exception_condition_checker(m1_mark,m2_mark,m3_mark)){
        alert("Wrong input try again !!!");//displays wrong input
        return;
    }
    const bonus_mark=bonus_mark_checker()
    let internal_mark=internal_mark_calculation(m1_mark,m2_mark,m3_mark,bonus_mark);
    internal_mark=extra_criteria(internal_mark)
    let external_mark=external_mark_calculation(internal_mark);
    let first_15=first_15_calculator(m1_mark,m2_mark,bonus_mark);
    let second_15=second_15_calculator(m3_mark,bonus_mark);
    let extra_1=extra_1_calculator();
    let extra_2=extra_2_calculator(m1_mark,m2_mark,m3_mark);
    console.log(internal_mark)
    display_result(internal_mark,external_mark,first_15,second_15,extra_1,extra_2);//displaying result
};

function exception_condition_checker(m1_mark,m2_mark,m3_mark){ // checks for double clicks or some eror inputs
    if ((skill_done.checked && skill_not_done.checked) || 
        (extra_done.checked && extra_not_done.checked) || 
        (m1_mark > 100 || m2_mark > 100 || m3_mark > 100)||(with_bonus.checked && without_bonus.checked)) {
        return true;
    }
}


//calculation part

function bonus_mark_checker(){
    if(with_bonus.checked){
        return 1.5;
    }else{
        return 1;
    }
}

function internal_mark_calculation(m1_mark,m2_mark,m3_mark,bonus){
    let first_15_m=(((m1_mark * bonus) + (m2_mark * bonus)) * 0.075); //bug 1 restored
    let second_15_m=((m3_mark * bonus) * 0.15);
    if(first_15_m>=15){
        first_15_m=15;
    }
    if(second_15_m>=15){
        second_15_m=15;
    }
    let internal_mark=Math.round(first_15_m+second_15_m);// using math.round to round off value
    if(internal_mark>=30){// one more condition checker to avoid errors
        internal_mark=30;
    }
    if (m1_mark + m2_mark + m3_mark >= 100) {
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
    return internal_mark;
}

function external_mark_calculation(internal_mark){ //calcualtes the external mark
    let external_mark = 91;
    if (internal_mark >= 23) {
        external_mark = 45;
    } else {
        external_mark = external_mark - (internal_mark * 2);
    }
    return external_mark;
}


// displaying function

function first_15_calculator(m1_mark,m2_mark,bonus){
    let first_15_m=(((m1_mark * bonus) + (m2_mark * bonus)) * 0.075);
    if(first_15_m>=15){
        first_15_m=15;
    }
    return Math.round(first_15_m);
}

function second_15_calculator(m3_mark,bonus){
    let second_15_m=((m3_mark * bonus) * 0.15);
    if(second_15_m>=15){
        second_15_m=15;
    }
    return Math.round(second_15_m);
}

function extra_1_calculator(){
    res=0;
    if(skill_done.checked){
        res+=2.5;
    }
    if(extra_done.checked){
        res+=2.5;
    }
    return res;
}
function extra_2_calculator(m1_mark,m2_mark,m3_mark){
    if(m1_mark+m2_mark+m3_mark >=100){
        return 5;
    }else{
        return 0;
    }
}

//output function

function display_result(internal_mark, external_mark,first_15,second_15,extra_1,extra_2) { 
    alert("YOU MUST SCORE " + external_mark + " IN EXTERNAL EXAM TO PASS OUT OF 100\nINTERNAL MARK : " + internal_mark + " OUT OF 40");
    document.getElementById("result_container").classList.add("result_container");
    document.getElementById("res_divs").classList.add("res_divss");
    document.getElementById("first_15").innerHTML = "Model 1 & Model 2 : " + first_15 + " / 15";
    document.getElementById("second_15").innerHTML = "Model 3 : " + second_15 + " / 15";
    document.getElementById("extra_critea_1").innerHTML = "Skillrack & Certificate : " + extra_1 + " / 5";
    document.getElementById("extra_critea_2").innerHTML = "Above 100 : " + extra_2 + " / 5";
    document.getElementById("internal_publish").innerHTML = "Internal Mark : " + internal_mark + " / 40";
    document.getElementById("external_publish").innerHTML = "External Mark : " + external_mark + " (TO PASS)";
    document.getElementById("notice").innerHTML="*(There might be sight changes[+1 or -1] in internal mark as these values are not rounded off)";
    document.querySelector(".cr_1").innerHTML = "";
    document.querySelector(".cr_2").innerHTML = "";
    document.querySelector(".cr_3").innerHTML = "CREATED BY : ASHWIN SI 1ST YEAR (CSE-A)";
    document.querySelector(".cr_4").innerHTML = "insta : _ashwin_si";
}
