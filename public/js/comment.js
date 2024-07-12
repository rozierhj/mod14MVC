const newComment = document.getElementById('comment-post-page-dab');
const currentPost = document.getElementById('postWcomment');
const saveNewComment = document.getElementById('comment-create-new');


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

    saveNewComment.addEventListener('click', async (event) => {
        const saveButton = event.target;
        console.log(saveButton);
        const parent = document.getElementById('new-comment-body');
        const commentText = parent.querySelector('.the-new-comment');
        // const commentText = saveButton.closest('exampleFormControlTextarea1');
        console.log(parent);
        const postToComment = currentPost.querySelector('.post-card-w-comment');
        const postID = postToComment.id;

        try{
            const response = await fetch('/api/comment/add',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    post_comment: `${commentText.value}`,
                    post_id:`${postID}`,
                    user_name: `${currentUser}`,
                })
            });
    
            const data = await response.json();
    
            console.log(data);

            const location = window.location.href;

            const pageResponse = await fetch(`/api/post/${postID}`);

            const pageData = await pageResponse.json();

            const postUser = pageData.user_name;

            if(location.includes('homepage') && postUser === currentUser){
                window.location.href = `/homepage/${currentUser}/${postID}/myPost`;
            }
            else if(location.includes('homepage') && postUser !== currentUser){
                window.location.href = `/homepage/${currentUser}/${postID}`;
            }
            else{
                window.location.href = `/dashboard/${currentUser}`;
            }
        }
        catch(err){
            console.error(err);
        }

    })

}