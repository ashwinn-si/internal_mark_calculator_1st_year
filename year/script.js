let result_mark=[0,0,false,false,false,false,0];//first_10,second_10,bonus,nptel,course,extra,final
function input_box_error_handler(mark,element_id){
    if(mark<0 || mark>100 || mark===NaN){
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


document.getElementById("calculate_button").addEventListener('click',()=>{
    result_mark=[0,0,false,false,false,false,0];
    let m1_mark=parseInt(document.getElementById('mark_m1').value)
    let m2_mark=parseInt(document.getElementById('mark_m2').value)
    let m3_mark=parseInt(document.getElementById('mark_m3').value)
    if(input_box_error_handler(m1_mark,'mark_m1') && input_box_error_handler(m2_mark,'mark_m2') && input_box_error_handler(m3_mark,'mark_m3') && radio_button_checker('yes_bonus','no_bonus') && radio_button_checker('nptel_yes','nptel_no') && radio_button_checker('course_yes','course_no') &&radio_button_checker('extra_yes','extra_no')){
        const bonus=document.getElementsByName('bonus');
        bonus.forEach((element)=>{
            if(element.checked){
                if(element.value==='yes'){
                    result_mark[2]=true;
                    }
            }
        })
        main(m1_mark,m2_mark,m3_mark);
    }
    
    
})

function mark_calculator(m1_mark,m2_mark,m3_mark,bonus_flag){
    let bonus_mark=(bonus_flag)?1.5:1;
    let first_10=((m1_mark*bonus_mark)+(m2_mark*bonus_mark))*0.05;
    let second_10=(m3_mark*bonus_mark)*0.1;
    first_10=(first_10>10)?10:first_10;
    second_10=(second_10>10)?10:second_10;
    result_mark[0]=parseFloat(first_10.toFixed(2));
    result_mark[1]=parseFloat(second_10.toFixed(2));
}

function extra_activity_cal(){
    const nptel_buttons=document.getElementsByName('nptel');
    const course=document.getElementsByName('course');
    const extra=document.getElementsByName('extra');
    nptel_buttons.forEach((element)=>{
        if(element.checked){
            if(element.value==='yes'){
                result_mark[3]=true;
            }
        }
    })
    course.forEach((element)=>{
        if(element.checked){
            if(element.value==='yes'){
                result_mark[4]=true;
            }
        }
    })
    extra.forEach((element)=>{
        if(element.checked){
            if(element.value==='yes'){
                result_mark[5]=true;
            }
        }
    })
}
//first_10,second_10,bonus,nptel,course,extra,final_result
function internal_mark_calculation(){
    let result=result_mark[0]+result_mark[1];
    if(result_mark[3]){
        result+=8;
    }
    if(result_mark[4]){
        result+=7;
    }
    if(result_mark[5]){
        result+=5;
    }
    result_mark[6]=result;
}

function main(m1_mark,m2_mark,m3_mark){
    mark_calculator(m1_mark,m2_mark,m3_mark,result_mark[2]);
    if(m1_mark+m2_mark+m3_mark>100){
        extra_activity_cal();
    }
    internal_mark_calculation();
    console.log(result_mark);
}