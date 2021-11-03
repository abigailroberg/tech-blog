async function createPost(event) {
    event.preventDefault()
    
    const user_id = window.location.toString().split('/')[window.location.toString().split('/').length -1]
    const title = document.querySelector('#post-title').value.trim()
    const text_content = document.querySelector('#post-content').value.trim()

    if(text_content && title) {
        const response = await fetch('/api/posts', {
            method: 'post',
            body: JSON.stringify({
                user_id,
                title,
                text_content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(response.ok) {
            document.location.reload()
        }
        else {
            alert(response.statusText)
        }
    }
}

document.querySelector('#new-post-form').addEventListener('submit', createPost)