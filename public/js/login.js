// login function
async function loginFormHandler(event) {
    event.preventDefault()
    
    // get username and password from form entry
    const username = document.querySelector('#username-login').value.trim()
    const password = document.querySelector('#password-login').value.trim()

    // check for username and password entered
    if(username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: ({ 'Content-Type': 'application/json' })
        })

        if(response.ok) {
            document.location.replace('/')
        } else {alert(response.statusText)}
    }
}

// signup function
async function signupFormHandler(event) {
    event.preventDefault()

    // get username and password from entry
    const username = document.querySelector('#username-signup').value.trim()
    const password = document.querySelector('#password-signup').value.trim()

    // create new account with username and password
    if(username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })

        if(response.ok) {
            document.location.replace('/')
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('#login-form').addEventListener('submit', loginFormHandler)
document.querySelector('#signup-form').addEventListener('submit', signupFormHandler)