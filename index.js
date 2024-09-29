let result_marks=[0,0,false,false,false,0,0]//m1_m2_combined_score, m3_score,with_without,skillrack,online_course,result_internal,external_mark

//functions that check for any error or missing value
function input_box_error_handler(mark,element_id){
    if(mark<0 || mark>100|| isNaN(mark)){
        navigator.vibrate(200);
        const container = document.getElementById(`${element_id}`);
        container.classList.add('vibrate');
        setTimeout(() => {
             container.classList.remove('vibrate');
        }, 400);
        return false;
    }
    return true;
}

function radio_button_checker(b1, b2) {
    const button1 = document.getElementById(b1);
    const button2 = document.getElementById(b2);

    if (!button1.checked && !button2.checked) {
        navigator.vibrate(200);
        const container1 = document.getElementById(`${b1}`);
        container1.classList.add('vibrate');
        setTimeout(() => {
            container1.classList.remove('vibrate');
        }, 400);
        const container2 = document.getElementById(`${b2}`);
        container2.classList.add('vibrate');
        setTimeout(() => {
            container2.classList.remove('vibrate');
        }, 400);
        return false;
    }
    return true;
}

function celebration_effect(){
    document.getElementById("congrs-lottie-animation").style.visibility='visible';
    if(window.innerWidth>768){
        document.getElementById("congrs-lottie-animation").classList.add('add_width_pc');
    }else{
        document.getElementById("congrs-lottie-animation").classList.add('add_width_mobile');
    }
    setInterval(()=>{
        document.getElementById("congrs-lottie-animation").style.visibility='hidden';
        if(window.innerWidth>768){
            document.getElementById("congrs-lottie-animation").classList.remove('add_width_pc');
        }else{
            document.getElementById("congrs-lottie-animation").classList.remove('add_width_mobile');
        }
    },5000);
}

//function that checks the clickevent
document.getElementById('calculate_button').addEventListener('click',()=>{
    let m1_mark=parseFloat(document.getElementById('mark_m1').value);
    let m2_mark=parseFloat(document.getElementById('mark_m2').value);
    let m3_mark=parseFloat(document.getElementById('mark_m3').value);
    result_marks=[0,0,false,false,false,0,0];
    if(input_box_error_handler(m1_mark,'mark_m1') && input_box_error_handler(m2_mark,'mark_m2') && input_box_error_handler(m3_mark,'mark_m3') && radio_button_checker('yes_bonus','no_bonus') && radio_button_checker('skillrack_no','skillrack_yes') && radio_button_checker('course_yes','course_no')){
        const bonus=document.getElementsByName('bonus');
        bonus.forEach((element)=>{
            if(element.checked){
                if(element.value==='yes'){
                    result_marks[2]=true;
                    }
            }
        })
        main(m1_mark,m2_mark,m3_mark);
        celebration_effect();
    }
});

//function that calculates the first_15 mark
function first_15_cal(m1_mark,m2_mark,bonus){
    let result=parseFloat((((m1_mark * bonus) + (m2_mark * bonus)) * 0.075).toFixed(2));
    return(result>15?15:result);
}

//function that calculates the second_15_mark
function second_15_cal(m3_mark,bonus){
    let result=parseFloat(((m3_mark * bonus) * 0.15).toFixed(2));
    return(result>15?15:result);
}

//function that checks the radio buttons
//m1_m2_combined_score, m3_score,with_without,skillrack,online_course,result_internal,external_mark
function extra_activity_cal(){
    const skillrack_buttons=document.getElementsByName('skillrack');
    const course=document.getElementsByName('course');
    skillrack_buttons.forEach((element)=>{
        if(element.checked){
            if(element.value==='yes'){
                result_marks[3]=true;
            }
        }
    })
    course.forEach((element)=>{
        if(element.checked){
            if(element.value==='yes'){
                result_marks[4]=true;
            }
        }
    })
}

//function that calculates the internal mark
function internal_mark_calculator(){
    let result=result_marks[0]+result_marks[1];
    if(result_marks[3]){
        result+=2.5;
    }
    console.log(result);
    if(result_marks[4]){
        result+=2.5;
    }
    result_marks[5]+=result;
    external_mark_calculation()
}

//function that calculates the external mark
function external_mark_calculation(){ 
    let external_mark = 91;
    if (result_marks[5] >= 23) {
        external_mark = 45;
    } else {
        external_mark = (50-result_marks[5])*1.667;
    }
    result_marks[6]=Math.floor(external_mark);
}

//fucntion result_container_displayer
//m1_m2_combined_score, m3_score,with_without,skillrack,online_course,result_internal,external_mark
function display_changer(m1_mark,m2_mark,m3_mark){
   
    let bonus_or_not=(result_marks[2])?"WITH BONUS":"WITHOUT BONUS";
    let skillrack=(result_marks[3])?"2.5":"0";
    let above_100=(m1_mark+m2_mark+m3_mark>100)?"5":"0";
    let course=(result_marks[4])?"2.5":"0";
    document.querySelector('.result-mark-container').style.visibility='visible';
    document.querySelector('.result-mark-container').innerHTML=`<div class="row">
                    <p class="result-mark-header">${bonus_or_not}</p>
                </div>
                <div class="row">
                    <div class="col"><p >MODEL 1 & 2 </p></div>
                    <div class="col"><p>${result_marks[0]} / 15</p></div>
                </div>
                <div class="row">
                    <div class="col"><p>MODEL 3 </p></div>
                    <div class="col"><p>${result_marks[1]} / 15</p></div>
                </div>
                <div class="row">
                    <div class="col"><p>SKILLRACK </p></div>
                    <div class="col"><p>${skillrack} / 2.5</p></div>
                </div>
                <div class="row">
                    <div class="col"><p>COURSE </p></div>
                    <div class="col"><p>${course} / 2.5</p></div>
                </div>
                <div class="row">
                    <div class="col"><p>ABOVE 100 </p></div>
                    <div class="col"><p>${above_100} / 5</p></div>
                </div>
                <div class="row">
                    <div class="col"><p>TOTAL INTERNAL</p></div>
                    <div class="col"><p>${result_marks[5]} / 40</p></div>
                </div>
                <div class="row">
                    <div class="col"><p>MARK TO PASS </p></div>
                    <div class="col"><p>${result_marks[6]} / 100</p></div>
                </div>
                <button id="possible-mark-button">POSSIBLE MARK</button>`
        document.getElementById('possible-mark-button').addEventListener('click',()=>{
                    let intermal_marl_scored=result_marks[6];
                    localStorage.setItem('internal_mark', JSON.stringify(intermal_marl_scored));
                    window.location.href = "result_page.html";
                    window.location.href="result_page/result_page.html";
                });
}


function main(m1_mark,m2_mark,m3_mark){
    let bonus_mark=(result_marks[2])?1.5:1;
    result_marks[0]=first_15_cal(m1_mark,m2_mark,bonus_mark);
    result_marks[1]=second_15_cal(m3_mark,bonus_mark);
    if(m1_mark+m2_mark+m3_mark>100){
        
        result_marks[5]+=5;
        
        extra_activity_cal();
    }
    internal_mark_calculator();
    display_changer(m1_mark,m2_mark,m3_mark);
}