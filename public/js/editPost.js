
    const closeBtnDab = document.getElementById('close-post-page-dab');
    const deleteBtnDab = document.getElementById('delete-post-btn-dab');
    const saveBtnDab = document.getElementById('save-post-btn-dab');
    const blogPost = document.getElementById('exampleFormControlTextarea1');
    const blogTitle = document.getElementById('post-title-dab');
    const deleteComment = document.getElementsByClassName('delete-comment');
    const editComment = document.getElementsByClassName('edit-comment');

    //test if post element exists to test if post is open
if(closeBtnDab !== null){

    //close the view of the selected post
    closeBtnDab.addEventListener('click',()=>{
    
        const location = window.location.href;

        if(location.includes('homepage')){
            window.location.href = `/homepage`;
        }
        else{
            window.location.href = `/dashboard`;
        }
    
    });
    
    //delete the selected post
    if(deleteBtnDab !== null){

        deleteBtnDab.addEventListener('click', async ()=>{
        
            const postCard = document.querySelector('.post-card');
            const postID = postCard.id;
        
            try{
        
                const response = await fetch(`/api/post/delete/${postID}`, {
                    method: 'DELETE',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                })
        
                const data = await response.json();
        
                console.log(data);
                const location = window.location.href;
        
                if(location.includes('homepage')){
                    window.location.href = `/homepage`;
                }
                else{
                    window.location.href = `/dashboard`;
                }
        
            }
            catch(err){
        
                console.error(err);
        
            }
        
        
        });

    }
    
    //save any changes made to the selected post
    if(saveBtnDab !== null){

        saveBtnDab.addEventListener('click', async ()=>{
        
            const postCard = document.querySelector('.post-card');
            const postID = postCard.id;
          
            try{
        
                const response = await fetch(`/api/post/edit/${postID}`,{
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        blog_post: `${blogPost.value}`,
                        post_title: `${blogTitle.value}`,
                        id: `${postID}`,
                    })
                });
                const data = await response.json();
        
                console.log(data);
                const location = window.location.href;
        
                if(location.includes('homepage')){
                    window.location.href = `/homepage`;
                }
                else{
                    window.location.href = `/dashboard`;
                }
        
            }
            catch(err){
        
                console.error(err);
        
            }
        
        
        });

    }

    if(deleteComment !== null){

        //get all of the delete comment buttons for events
        Array.from(deleteComment).forEach(deleteComBtn =>{

            //delete the comment
            deleteComBtn.addEventListener('click', async (event) =>{

                try{
                    const postCard = document.querySelector('.post-card');
                    const postID = postCard.id;
                    const deleteCom = event.target;
                    const commentName = deleteCom.id;
                    const commID = commentName.replace('comment-delete-','');
    
                    const response = await fetch(`/api/comment/delete/${commID}`, {
                        method: 'DELETE',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                    })
            
                    const data = await response.json();
            
                    console.log(data);

                    const pageResponse = await fetch(`/api/post/${postID}`);

                    const pageData = await pageResponse.json();

                    const postUser = pageData.selectPost.user_name;
                    const currentUser = pageData.currentUser;

                    //get posts by user logged in
                    if(postUser === currentUser){
                    await fetch(`/homepage/myPost/${postID}`);
                    window.location.href = `/homepage/myPost/${postID}`;
                    }
                    else{
                        //get all of the other posts
                    await fetch(`/homepage/post/${postID}`);
                    window.location.href = `/homepage/post/${postID}`;
                    }

                }
                catch(err){
                    console.error(err);
                }

            });


        });

    }

    if(editComment !== null){
//get all of the comments to edit
        Array.from(editComment).forEach(editComBtn =>{

            //get the comments
            editComBtn.addEventListener('click', async (event) =>{

                try{
                    const postCard = document.querySelector('.post-card');
                    const postID = postCard.id;
                    const editCom = event.target;
                    const commentName = editCom.id;
                    const commID = commentName.replace('comment-edit-','');
    
                    await fetch(`/homepage/myPost/${postID}/${commID}`);

                    window.location.href = `/homepage/myPost/${postID}/${commID}`;

                }
                catch(err){
                    console.error(err);
                }

            });


        });

    }


}



