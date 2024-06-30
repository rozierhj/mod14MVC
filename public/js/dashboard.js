// const { response } = require("express");
document.addEventListener('DOMContentLoaded', function () {
    window.scrollTo(0, document.body.scrollHeight);
});

const postButton = document.getElementById('make-post');
const savePostButton = document.getElementById('save-post');
const deletePost = document.getElementsByClassName('delete-post');
const editPost = document.getElementsByClassName('edit-post');

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
    button.addEventListener('click',(event)=>{

        //const buttonClicked = document.querySelector('.delete-post');
        //const postCard = buttonClicked.closest('.blog-post');
        const buttonClicked = event.target;
        //console.log(postCard.id);
        //alert(buttonClicked.id);

        const buttonClick = document.querySelector(`#${buttonClicked.id}`);
        const parentPost = buttonClick.closest('.blog-post');
       // alert(parentPost.id);

        fetch(`/api/post/delete/${parentPost.id}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
        console.log('Delete successful:', data);
        window.location.href = '/dashboard';
        })
        .catch(error => {
        console.error('Error:', error);
        });

    });
});

Array.from(editPost).forEach(button => {
    button.addEventListener('click',(event)=>{


        const buttonClicked = event.target;

        const buttonClick = document.querySelector(`#${buttonClicked.id}`);
        const parentPost = buttonClick.closest('.blog-post');

        const blogPost = parentPost.querySelector('.card-text').textContent;
        const postTitle = parentPost.querySelector('.card-title').textContent;
        const theModal = new bootstrap.Modal(document.getElementById('postModal'));
        document.querySelector('#postModal input[type="text"]').value = postTitle;
        document.querySelector('#postModal textarea').value = blogPost;
        theModal.show();

    });
});

