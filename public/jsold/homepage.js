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

postButton.addEventListener('click', async () => {

    try{
        await fetch('/homepage/newPost');
        window.location.href = '/homepage/newPost';
        console.log('success');

    }
    catch(err){
        console.error(err);
    }

});

savePostButton.addEventListener('click',async ()=>{

    
    await addPost();

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






