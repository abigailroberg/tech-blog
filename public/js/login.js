async function loginFormHandler(event) {
    event.preventDefault()
    
    // get username and password from form entry
    const user = document.querySelector('#username-login').value.trim()
    const pw = document.querySelector('#password-login').value.trim()

    // check for username and password entered
    if(user && pw) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                user,
                pw
            }),
            headers: ({ 'Content-Type': 'application/json' })
        })

        if(response.ok) {
            document.location.replace('/')
        } else {alert(response.statusText)}
    }
}

document.querySelector('#login-form').addEventListener('submit', loginFormHandler)