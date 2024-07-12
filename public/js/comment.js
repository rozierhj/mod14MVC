const newComment = document.getElementById('comment-post-page-dab');
const currentPost = document.getElementById('postWcomment');

if(newComment!==null){


    newComment.addEventListener('click', async () =>{
        
        
        try{
            
            const postToComment = currentPost.querySelector('.post-card-w-comment');
            const postID = postToComment.id;
    
            await fetch(`/homepage/${currentUser}/${postID}/newComment`);
    
            window.location.href = `/homepage/${currentUser}/${postID}/newComment`;
    
        }
        catch(err){
            console.error(err);
        }
    
    });

}