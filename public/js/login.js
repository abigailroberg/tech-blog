// login function
async function loginFormHandler(event) {
    event.preventDefault()
    
    // get username and password from form entry
    const username = document.querySelector('#username-login').value.trim()
    const password = document.querySelector('#password-login').value.trim()

    // check for username and password entered
    if(username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: ({ 'Content-Type': 'application/json' })
        })

        if(response.ok) {
            document.location.replace('/')
        } 
        else {
            alert(response.statusText)
        }
    }
}

function signUpForm(event) {
    event.preventDefault()

    // load sign up page
    document.location.replace('/signup')
}

document.querySelector('#login-form').addEventListener('submit', loginFormHandler)
document.querySelector('#signup').addEventListener('click', signUpForm)