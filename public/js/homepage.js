// const { response } = require("express");
document.addEventListener('DOMContentLoaded', function () {
    // window.scrollTo(0, document.body.scrollHeight);
});

const postButton = document.getElementById('make-post');
const savePostButton = document.getElementById('save-post');
const deletePost = document.getElementsByClassName('delete-post');
const editPost = document.getElementsByClassName('edit-post');
const commentButton = document.getElementsByClassName('comment-button');
const saveCommentButton = document.getElementById('save-comment');
const saveEditButton = document.getElementById('edit-save-post');
const poster = JSON.parse(sessionStorage.getItem('user'));
const currentUser = poster.username;

postButton.addEventListener('click', () => {

    const theModal = new bootstrap.Modal(document.getElementById('postModal'), {});
    theModal.show();

});

savePostButton.addEventListener('click',async ()=>{

    const modalToDelete = document.getElementById('postModal');

    const userID = await getUserID(currentUser);

    await addPost(userID);

    const openModal = bootstrap.Modal.getInstance(document.getElementById('postModal'));

    openModal.hide();
    openModal.dispose();

    modalToDelete.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
    modalToDelete.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
    window.location.href = '/homepage';

});

Array.from(deletePost).forEach(button => {
    button.addEventListener('click',(event)=>{

        const buttonClicked = event.target;

        const buttonClick = document.querySelector(`#${buttonClicked.id}`);
        const parentPost = buttonClick.closest('.blog-post');
        deleteThePost(parentPost.id);

    });
});

Array.from(editPost).forEach(button => {
    button.addEventListener('click',(event)=>{


        const buttonClicked = event.target;

        const buttonClick = document.querySelector(`#${buttonClicked.id}`);
        const parentPost = buttonClick.closest('.blog-post');

        const blogPost = parentPost.querySelector('.card-text').textContent;
        const postTitle = parentPost.querySelector('.card-title').textContent;
        const postID = parentPost.id;
        const theModal = new bootstrap.Modal(document.getElementById('editModal'));
        document.querySelector('#editModal input[type="text"]').value = postTitle;
        document.querySelector('#editModal textarea').value = blogPost;
        theModal.show();
        
        getPostToEdit(postID);
        

    });
});

Array.from(commentButton).forEach( button => {
    button.addEventListener('click', (event)=>{

        const buttonClicked = event.target;

        const buttonClick = document.querySelector(`#${buttonClicked.id}`);
        const parentPost = buttonClick.closest('.blog-post');

        const postID = parentPost.id;

        getComments(postID);
        
    });
});






