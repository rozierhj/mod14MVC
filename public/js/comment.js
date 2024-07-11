const newComment = document.getElementById('comment-post-page-dab');
const currentPost = document.getElementById('postWcomment');

newComment.addEventListener('click', async () =>{
    
    
    try{
        
        const postToComment = currentPost.querySelector('.post-card-w-comment');
        const postID = postToComment.id;

        await fetch(`/homepage/${postID}/newComment`);

        window.location.href = `/homepage/${postID}/newComment`;

    }
    catch(err){
        console.error(err);
    }

});