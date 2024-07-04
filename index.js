let marks_list=[0,0,0,0,0,0];
function main() { // main fucntion 
    let m1_mark = Number(document.getElementById("m1_mark").value);
    let m2_mark = Number(document.getElementById("m2_mark").value);
    let m3_mark = Number(document.getElementById("m3_mark").value);
    let excep_check=exception_condition_checker(m1_mark,m2_mark,m3_mark);
    refresh_window();//refreshes the window 
    if(excep_check==1){
        alert("Wrong input try again !!!");//displays wrong input
        return;
    }else if(excep_check==2){
        alert("Input missing!!!");//if the required fields are not choiced
        return;
    }
    //[first_15,second_15,extra_1,extra_2,internal,external]
    const bonus_mark=bonus_mark_checker()
    marks_list=internal_mark_calculation(m1_mark,m2_mark,m3_mark,bonus_mark,marks_list);
    const hundard_checker=hundard_mark_checker(m1_mark,m2_mark,m3_mark);//checks for 100 marks
    if(hundard_checker){
        marks_list=extra_criteria(marks_list)
    }else{
        marks_list=mark_changer_spcial_case(marks_list)
    }
    marks_list=external_mark_calculation(marks_list);
    display_result(marks_list,hundard_checker);//displaying result
};

function exception_condition_checker(m1_mark,m2_mark,m3_mark){ // checks for double clicks or some eror inputs
    if ((skill_done.checked && skill_not_done.checked) || 
        (extra_done.checked && extra_not_done.checked) || 
        (m1_mark > 100 || m2_mark > 100 || m3_mark > 100)||(with_bonus.checked && without_bonus.checked)) {
        return 1;
    }
    else if((!skill_done.checked && !skill_not_done.checked) || 
    (!extra_done.checked && !extra_not_done.checked)
    ||(!with_bonus.checked && !without_bonus.checked)){
        return 2;
    }
    console.log("inspect ha da panni pankura body soda");
}

function refresh_window(){
    document.querySelector(".cr_1").innerHTML = "";
        document.querySelector(".cr_1").classList.remove("special_case")
}
//calculation part

function bonus_mark_checker(){
    if(with_bonus.checked){
        return 1.5;
    }else{
        return 1;
    }
}

function internal_mark_calculation(m1_mark,m2_mark,m3_mark,bonus,marks_list){
    marks_list[0] = (((m1_mark * bonus) + (m2_mark * bonus)) * 0.075); //bug 1 restored
    marks_list[1] =((m3_mark * bonus) * 0.15);
    if(marks_list[0]>=15){
        marks_list[0]=15;
    }
    if(marks_list[1]>=15){
        marks_list[1]=15;
    }
    marks_list[0]= parseFloat(marks_list[0].toFixed(2));
    marks_list[1]= parseFloat(marks_list[1].toFixed(2));
    marks_list[4]=marks_list[0]+marks_list[1];
    if(marks_list[4]>=30){// one more condition checker to avoid errors
        marks_list[4]=30;
    }
    if (m1_mark + m2_mark + m3_mark >= 100) {
        marks_list[4] += 5;
        marks_list[3]+=5;
        
    }
    marks_list[4]= parseFloat(marks_list[4].toFixed(2));
    return marks_list;
}

function hundard_mark_checker(m1_mark,m2_mark,m3_mark){
    if (m1_mark + m2_mark + m3_mark >= 100) {
        return true;
    }else{

        return false;
    }
}
//[first_15,second_15,extra_1,extra_2,internal,external]
function mark_changer_spcial_case(mark_list){
    let res=mark_list[0]+mark_list[1];
    mark_list[4]=res*1.334;
    return(mark_list);

}
function extra_criteria(marks_list){ // checks for extra criteria
    if (skill_done.checked) {
        marks_list[4] += 2.5;
        marks_list[2]+=2.5;
    }
    if (extra_done.checked) {
        marks_list[4] += 2.5;
        marks_list[2]+=2.5;
    }
    
    return marks_list;
}

function external_mark_calculation(marks_list){ //calcualtes the external mark
    let external_mark = 91;
    if (marks_list[4] >= 23) {
        external_mark = 45;
    } else {
        external_mark = (50-marks_list[4])*1.667;
    }
    marks_list[5]=Math.floor(external_mark);
    return marks_list;
}


//output function
//mark_list=[first_15,second_15,extra_1,extra_2,internal,external]
function display_result(marks_list,hundard_checker) { 
    marks_list[4] = Math.round(marks_list[4]);
    alert("YOU MUST SCORE " + marks_list[5] + " IN EXTERNAL EXAM TO PASS OUT OF 100\nINTERNAL MARK : " + marks_list[4] + " OUT OF 40");
    document.getElementById("result_container").classList.add("result_container");
    document.getElementById("res_divs").classList.add("res_divss");
    document.getElementById("first_15").innerHTML = "Model 1 & Model 2 : " + marks_list[0] + " / 15";
    document.getElementById("second_15").innerHTML = "Model 3 : " + marks_list[1] + " / 15";
    document.getElementById("extra_critea_1").innerHTML = "Skillrack & Certificate : " + marks_list[2] + " / 5";
    document.getElementById("extra_critea_2").innerHTML = "Above 100 : " + marks_list[3] + " / 5";
    document.getElementById("internal_publish").innerHTML = "Internal Mark : " + marks_list[4] + " / 40";
    document.getElementById("external_publish").innerHTML = "External Mark : " + marks_list[5] + " (TO PASS)";
    document.querySelector(".cr_1").innerHTML = "";
    document.querySelector(".cr_3").innerHTML = "CREATED BY : ASHWIN SI(CSE)";
    document.querySelector(".result_page_button").innerHTML="VIEW POSSIBLE RESULTS";
    document.querySelector(".result_page_button").style.visibility="visible";
    if(!hundard_checker){
        document.querySelector(".cr_1").innerHTML = "SPECIAL CASE [LESSER THAN 100]";
        document.querySelector(".cr_1").classList.add("special_case")
        
    }
    
}

// display result page
function result_page(){
    let intermal_marl_scored=marks_list[4];
    let marks_display=[60,54,48,42,36,30,27,marks_list[4]];
    for(let i=0;i<7;i++){
        marks_display[i]+=intermal_marl_scored;
        if(marks_display[i]>100){
            marks_display[i]=100;
        }
    }
    localStorage.setItem('marks_display', JSON.stringify(marks_display));
    window.location.href = "result_page.html";
}
