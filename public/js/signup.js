// signup function
async function signupFormHandler(event) {
    event.preventDefault()

    console.log('sign up form click submit')

    // get username and password from entry
    const username = document.querySelector('#username-signup').value.trim()
    const password = document.querySelector('#password-signup').value.trim()

    console.log(`username: ${username} password: ${password}`)

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

function loginForm(event) {
    event.preventDefault()

    // load login page
    document.location.replace('/login')
    
}

 console.log('signup js running')

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler)
document.querySelector('#login').addEventListener('click', loginForm)