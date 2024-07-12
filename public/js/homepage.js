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

//button to create new posts
homePostButton.addEventListener('click', async () => {

    try{
        await fetch(`/homepage/${currentUser}/newPost`);
        window.location.href = `/homepage/${currentUser}/newPost`;
        console.log('success');

    }
    catch(err){
        console.error(err);
    }

});

// set event for headers for every post
Array.from(homePostHeader).forEach(postHeader => {

    //event to open a post with its comments
    postHeader.addEventListener('click', async (event)=>{

        const homeHeadersClicked = event.target;
        const homeSelectedPost = homeHeadersClicked.closest('.blog-post');
        const postID = homeSelectedPost.id;

        try{

            const response = await fetch(`/api/post/${postID}`);

            const data = await response.json();

            const postUser = data.user_name;

            if(postUser === currentUser){

                await fetch(`/homepage/${currentUser}/${postID}`);
                window.location.href = `/homepage/${currentUser}/${postID}/myPost`;
            }

            else{
                await fetch(`/homepage/${currentUser}/${postID}/myPost`);
                window.location.href = `/homepage/${currentUser}/${postID}`;
            }


        }
        catch(err){
            console.error(err);
        }

    });
});






