var signUp = document.querySelector('.signUp')
var signIn = document.querySelector('.signIn')
var nameInput = document.querySelector('.nameInput')
var btnLogin = document.querySelector('.btnLogin')
var btnSign = document.querySelector('.btnSign')
var emailInput = document.querySelector('#email')
var passInput = document.querySelector('#pass')
var userNameInput = document.querySelector('#userName')
var req = document.querySelector('#req')
var succ = document.querySelector('#succ')
var exists = document.querySelector('#exists')
var chick = document.querySelector('#chick')
var box = document.querySelector('.box')
var pageForWelcome = document.querySelector('#pageForWelcome')
var logout = document.querySelector('#logout')

var loginContainer = [];

if (localStorage.getItem('login') != null) {
    loginContainer = JSON.parse(localStorage.getItem('login'))
    console.log(loginContainer);
    
    showRefresh()
}


signUp.addEventListener('click', function (e) {
    // console.log('hello');
    e.preventDefault()
    signIn.classList.remove('d-none')
    signUp.classList.add('d-none')
    nameInput.classList.remove('d-none')
    btnLogin.classList.add('d-none')
    btnSign.classList.remove('d-none')
})

btnSign.addEventListener('click', function () {
   
    // chickForFindEmail()
    btnSignUp()
    confirm()
    
    
})



function btnSignUp(){
    
    if (
        validateForm(userNameInput) &&
        validateForm(emailInput) &&
        validateForm(passInput)
    
    ) {
       
            if(chickForFindEmail()){
                exists.classList.remove('d-none')
                succ.style.cssText = 'display : none !important' ; 
            }
            else{
                var user = {
                    userName: userNameInput.value,
                    emai: emailInput.value,
                    password: passInput.value
                }
                
              
                
    
            
    
                loginContainer.push(user)
                localStorage.setItem('login', JSON.stringify(loginContainer))
                
                exists.classList.add('d-none')
                succ.style.cssText = 'display : block !important' ;
               
            }

    
    
    
            // btnSign.addEventListener('click', function () {
            //     succ.classList.remove('d-none')
    
            // })
    
        
    }
    else {
        console.log('all input is requeried');
        
    }
}

function chickForFindEmail(){
                
    for(var i = 0 ; i<loginContainer.length ; i++){
        if(emailInput.value == loginContainer[i].emai){
            return true ; 
        }
        // else{
        //     return false ;
            
        // }
    }

    return false;
}


function confirm(){
    if(
        validateForm(userNameInput) &&
        validateForm(emailInput) &&
        validateForm(passInput)
    
    ){
     


        succ.classList.remove('d-none')
        req.classList.add('d-none')
        
         
    }
    else{
                    req.classList.remove('d-none')
                    succ.classList.add('d-none')
        
                
    }
    
}




function showRefresh() {
    var long = loginContainer.length - 1;
    emailInput.value = loginContainer[long].emai
    passInput.value = loginContainer[long].password
}


function validateForm(ele) {
    var regix = {
        userName: /^[a-z| ]{3,25}$/i,
        email: /^[a-z|0-9]{3,25}@gmail.com$/i,
        pass: /^.{3,15}$/,

    }
    if (regix[ele.id].test(ele.value)) {
        // console.log('match');
        ele.classList.remove('is-invalid')
        ele.classList.add('is-valid')
        return true;
    }
    else {
        // console.log('no match');
        ele.classList.remove('is-valid')
        ele.classList.add('is-invalid')
        return false;
       
    }

}


function login(){
    for(var i = 0 ; i<loginContainer.length ; i++){
        if(
            emailInput.value == loginContainer[i].emai &&
            passInput.value == loginContainer[i].password

        ){
            box.classList.add('d-none')
            pageForWelcome.classList.remove('d-none')
        }
        else{
            chick.classList.remove('d-none')
        }
    }
}

btnLogin.addEventListener('click',function(){
    login()
    display()
})



function display(){
    var cartona = ``;
    for(var i = 0 ;i<loginContainer.length;i++){
        if(emailInput.value == loginContainer[i].emai){
            cartona = `
                <h1>Welcome <span>${loginContainer[i].userName}</span></h1>
            `
        }
        else{
            console.log('no');
            
        }
    }
    document.getElementById('display').innerHTML = cartona ;
}


function closePageForWelcome(){
    pageForWelcome.classList.add('d-none')
    box.classList.remove('d-none')
    chick.classList.add('d-none')
}

logout.addEventListener('click',function(){
    closePageForWelcome()
})