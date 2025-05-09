// const form = document.getElementsByClassName('cform');
// console.log(form);
// form.addEventListener('submit',(e)=>{
    
//     alert("form is sumited")
// })

// const btn = document.getElementsByClassName('btn');
// console.log(btn);
// btn.addEventListener('submit',()=>{
//     alert("form is sumited")
// })


document.getElementById('fm').addEventListener('submit',(e)=>{
    if(this?.password?.value != this?.repassword.value){
        alert('password not matching')
    }else{

        alert("form is sumited")
    }
});