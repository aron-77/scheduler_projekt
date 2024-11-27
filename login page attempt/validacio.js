const form = document.getElementById('form')
const nev = document.getElementById('name-input')
const email = document.getElementById('email-input')
const jelszo = document.getElementById('password-input')
const jelszo_ism = document.getElementById('re-password-input')
const hibuzenet = document.getElementById('error-message')

form.addEventListener('submit', (e) => {
    
    let errors = [];

    if (nev) {
        errors = getSignupFormErrors(nev.value, email.value, jelszo.value, jelszo_ism.value )
    }
    else
    {
        errors = getLoginFormErrors(email.value, jelszo.value)
    }

    if (errors.lenght > 0) {
        e.preventDefault()
        hibauzenet.innerText = errors.join(". ")
    }
})

function getSignupFormErrors(nev, email, jelszo, jelszo_ismetles) {
    let errors =[]

    if (nev === '' || nev === null) {     
           errors.push('Név megadása kötelező!')
           name_input.parentElement.classList.add('incorrect')
            
           
    }
    if (email === '' || email === null) {     
        errors.push('Email megadása kötelező!')
        email_input.parentElement.classList.add('incorrect')
         
        
    }
    if (jelszo === '' || jelszo === null) {     
        errors.push('Jelszó megadása kötelező!')
        password_input.parentElement.classList.add('incorrect')
     
    
    }
    if(jelszo.length < 8){
        errors.push('A jelszónak minimum 8 karakterrel kell rendelkeznie!')
        password_input.parentElement.classList.add('incorrect')
    }

    if(jelszo !== repeatPassword){
        errors.push('A két jelszó nem egyezik!')
        password_input.parentElement.classList.add('incorrect')
        re_password_input.parentElement.classList.add('incorrect')
    }
    return errors;
}