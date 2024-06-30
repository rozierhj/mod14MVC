// const { response } = require("express");
document.addEventListener('DOMContentLoaded', function () {
    window.scrollTo(0, document.body.scrollHeight);
});

const postButton = document.getElementById('make-post');
const savePostButton = document.getElementById('save-post');
const deletePost = document.getElementsByClassName('delete-post');

postButton.addEventListener('click', () => {

    const theModal = new bootstrap.Modal(document.getElementById('postModal'), {});
    theModal.show();

});

savePostButton.addEventListener('click',()=>{

    const modalToDelete = document.getElementById('postModal');
    const blogText = document.getElementById('blog-text');
    const blogTitle = document.getElementById('blog-title');

    fetch('/api/post/add',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            blog_post: `${blogText.value}`,
            post_title: `${blogTitle.value}`,
        })
    })
    .then(response=>response.json())
    .then(data =>{
        console.log('success',data)
    })
    .catch((error)=>{
        console.error('error:',error);
    });

    const openModal = bootstrap.Modal.getInstance(document.getElementById('postModal'));

    openModal.hide();
    openModal.dispose();

    modalToDelete.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
    modalToDelete.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
    window.location.href = '/dashboard';

});

Array.from(deletePost).forEach(button => {
    button.addEventListener('click',()=>{

        

        // fetch('/api/post/delete/2', {
        //     method: 'DELETE',
        //     headers: {
        //     'Content-Type': 'application/json',
        //     },
        // })
        // .then(response => response.json())
        // .then(data => {
        // console.log('Delete successful:', data);
        // window.location.href = '/dashboard';
        // })
        // .catch(error => {
        // console.error('Error:', error);
        // });



    });
});
