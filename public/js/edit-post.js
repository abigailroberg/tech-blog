async function editPost(event) {
    event.preventDefault()

    const title = document.querySelector('input[name="post-title"]').value.trim()
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1]

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    
    if (response.ok) {
        document.location.reload()
    } else {
        alert(response.statusText)
    }
}

async function deletePost(event) {
    event.preventDefault()

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1]
    
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    })

    if(response.ok) {
        document.location.replace('/')
    }
}

document.querySelector('#edit-post-form').addEventListener('submit', editPost)
document.querySelector('#delete-post-btn').addEventListener('click', deletePost)