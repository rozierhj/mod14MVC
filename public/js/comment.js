const newComment = document.getElementById('comment-post-page-dab');
const currentPost = document.getElementById('postWcomment');
const saveNewComment = document.getElementById('comment-create-new');
const closeComment = document.getElementById('comment-delete-new');
const closeEditButton = document.getElementsByClassName('close-edit-comment');
const saveEditButton = document.getElementsByClassName('save-edit-comment');


if(newComment!==null){


    newComment.addEventListener('click', async () =>{
        
        
        try{
            
            const postToComment = currentPost.querySelector('.post-card-w-comment');
            const postID = postToComment.id;

            const response = await fetch(`/api/post/${postID}`);

            const data = await response.json();

            const postUser = data.selectPost.user_nane;
            const currentUser = data.currentUser;

            if(currentUser === postUser){

                await fetch(`/homepage/myPost/${postID}/newComment`);
                window.location.href = `/homepage/myPost/${postID}/newComment`;
            }
            else{
                await fetch(`/homepage/post/${postID}/newComment`);
                window.location.href = `/homepage/post/${postID}/newComment`;
            }
    
    
    
        }
        catch(err){
            console.error(err);
        }
    
    });

    if(saveNewComment !== null){

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
                    })
                });
        
                const data = await response.json();
        
                console.log(data);
    
                const location = window.location.href;
    
                const pageResponse = await fetch(`/api/post/${postID}`);
    
                const pageData = await pageResponse.json();
    
                const postUser = pageData.selectPost.user_name;
                const currentUser = pageData.currentUser;
    
                if(location.includes('homepage') && postUser === currentUser){
                    window.location.href = `/homepage/myPost/${postID}`;
                }
                else if(location.includes('homepage') && postUser !== currentUser){
                    window.location.href = `/homepage/post/${postID}`;
                }
                else{
                    window.location.href = `/dashboard`;
                }
            }
            catch(err){
                console.error(err);
            }
    
        })

        closeComment.addEventListener('click', async (event)=>{
    
            try{
    
    
                const postToComment = currentPost.querySelector('.post-card-w-comment');
                const postID = postToComment.id;  
                
                const pageResponse = await fetch(`/api/post/${postID}`);
        
                const pageData = await pageResponse.json();
        
                const postUser = pageData.selectPost.user_name;
                const currentUser = pageData.currentUser;
    
                if(postUser === currentUser){
    
                    window.location.href = `/homepage/myPost/${postID}`;
    
                }
                else{
                    window.location.href = `/homepage/post/${postID}`;
                }
        
    
            }
            catch(err){
                console.error(err);
            }
    
    
        });
    
        editComment.addEventListener('click', async () =>{
            
            
            try{
                
                const postToComment = currentPost.querySelector('.post-card-w-comment');
                const postID = postToComment.id;
        
                await fetch(`/homepage/myPost/${postID}/newComment`);
        
                window.location.href = `/homepage/myPost/${postID}/newComment`;
        
            }
            catch(err){
                console.error(err);
            }
        
        });
    }

}


if(closeEditButton !== null){

    console.log(closeEditButton);
    const closeBTN = closeEditButton[0].id;
    const saveBTN = saveEditButton[0].id;
    const newCommentID = saveBTN.replace('comment-edit-','');
    const closingCommentBtn = document.getElementById(closeBTN);
    const savingCommentBtn = document.getElementById(saveBTN);

    closingCommentBtn.addEventListener('click', async (event) =>{

        
        try{
            
            const postToComment = currentPost.querySelector('.post-card-w-comment');
            const postID = postToComment.id;
            const response = await fetch(`/api/post/${postID}`);
            const data = await response.json();

            const userName = data.selectPost.user_name;
            const currentUser = data.currentUser;

            if(userName === currentUser){
                window.location.href = `/homepage/myPost/${postID}`;
            }
            else{
                window.location.href = `/homepage/post/${postID}`;
            }


        }
        catch(err){
            console.error(err);
        }


    });

    savingCommentBtn.addEventListener('click', async() =>{

        const commentValue = savingCommentBtn.id;
        const commID =commentValue.replace('comment-edit-','');
        const commentText = document.getElementsByClassName('edit-this-comment');
        const editCommentText = commentText[0].value;
      
        try{
    
            const response = await fetch(`/api/comment/edit/${commID}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    post_comment: `${commentText[0].value}`,
                    id: `${commID}`,
                })
            });
            const data = await response.json();
    
            console.log(data);
        
            const postToComment = currentPost.querySelector('.post-card-w-comment');
            const postID = postToComment.id;
            const pageResponse = await fetch(`/api/post/${postID}`);
            const pageData = await pageResponse.json();

            const userName = pageData.selectPost.user_name;
            const currentUser = pageData.currentUser;

            if(userName === currentUser){
                await fetch(`/homepage/myPost/${postID}`);
                window.location.href = `/homepage/myPost/${postID}`;
            }
            else{
                await fetch(`/homepage/post/${postID}`);
                window.location.href = `/homepage/post/${postID}`;
            }
    
        }
        catch(err){
    
            console.error(err);
    
        }

    });

}
