const REG_MAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REG_PHONE = /^(([0-9]{2}[.]{1}){4}[0-9]{2})$/;

// Display welcome message if user already sign-up
if(getCookie('user') != ''){
    $('#welcome-user').text('👋 Hello '+ encodeURI(getCookie('user')) +', welcome on board!');
    $('#welcome-user').removeClass('hidden');
}

//---- SIGN IN ---- //
$('#submit').bind('click', (e) =>{
    let email = $('#inputEmail').val();

    if (!email.match(REG_MAIL)) {
        $('#sign-mail-error').text('This is not a valid Email');
    }else{
        $('#sign-mail-error').text('');
    }
});

//---- SIGN UP ---- //
// Display Sign-up pop-up
$('#register').bind("click", function(e){
   e.preventDefault();
    $('#register-wrapper').removeClass('hidden');
});

// Hide Sign-up pop-up
$('#registerCancel').bind('click', (e) => {
    e.preventDefault();
    $('#register-wrapper').addClass('hidden');
})

// Register submit
$('#registerValid').bind('click', (e) => {
    let email = $('#registerInputEmail').val();
    let password = $('#registerInputPassword').val();
    let passwordConfirm = $('#registerInputPassword2').val();
    let name = encodeURI($('#registerName').val());
    let phone = $('#registerPhone').val();

    // Check if values is not empty
    if (email !== null && email !== '' && password !== null && password !== '' && passwordConfirm !== null && passwordConfirm !== '' && name !== null && name !== '' && phone !== null && phone !== ''){
        // Same password
        if (password === passwordConfirm){
            $('#phone-error').text('')
            // Valid Email
            if(email.match(REG_MAIL)){
                $('#mail-error').text('')
                //Valid Phone
                if(phone.match(REG_PHONE)){
                    $('#password-error').text('')
                    // All is good, user win a cookie 🍪
                    document.cookie = 'user=' + name;
                    console.log(name)
                }else{
                    $('#phone-error').text('This is not a valid phone number')
                }
            }else{
                $('#mail-error').text('This is not a valid Email')
            }
        }else{
            $('#password-error').text('Passwords is not the same')
        }
    }else{
        // User try to submit empty value
    }
})

//---- Tools ----//
function getCookie(nomCookie) {
    deb = document.cookie.indexOf(nomCookie+ "=")
    if (deb >= 0) {
        deb += nomCookie.length + 1
        fin = document.cookie.indexOf(";",deb)
        if (fin < 0) fin = document.cookie.length
        return encodeURI(document.cookie.substring(deb,fin))
    }else return ""
}