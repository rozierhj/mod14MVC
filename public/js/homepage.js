// const { response } = require("express");
document.addEventListener('DOMContentLoaded', function () {
    // window.scrollTo(0, document.body.scrollHeight);
});

const homePostButton = document.getElementById('make-post');
const homePostHeader = document.getElementsByClassName('post-header');
// const savePostButton = document.getElementById('save-post');
// const deletePost = document.getElementsByClassName('delete-post');
// const editPost = document.getElementsByClassName('edit-post');
// const commentButton = document.getElementsByClassName('comment-button');
// const saveCommentButton = document.getElementById('save-comment');
// const saveEditButton = document.getElementById('edit-save-post');

homePostButton.addEventListener('click', async () => {

    try{
        await fetch('/homepage/newPost');
        window.location.href = '/homepage/newPost';
        console.log('success');

    }
    catch(err){
        console.error(err);
    }

});

// savePostButton.addEventListener('click',async ()=>{

    
//     await addPost();

// });

Array.from(homePostHeader).forEach(button => {
    button.addEventListener('click', async (event)=>{

        const homeHeadersClicked = event.target;
        const homeSelectedPost = homeHeadersClicked.closest('.blog-post');
        const postID = homeSelectedPost.id;

        try{

            await fetch(`/homepage/${postID}`);

            window.location.href = `/homepage/${postID}`;

        }
        catch(err){
            console.error(err);
        }

    });
});






