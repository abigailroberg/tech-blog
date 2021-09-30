async function createPost(event) {
    event.preventDefault()
    console.log('running create post script')
}

document.querySelector('#create-post').addEventListener('submit', createPost)