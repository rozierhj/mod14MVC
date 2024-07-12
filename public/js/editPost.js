
    const closeBtnDab = document.getElementById('close-post-page-dab');
    const deleteBtnDab = document.getElementById('delete-post-btn-dab');
    const saveBtnDab = document.getElementById('save-post-btn-dab');
    const blogPost = document.getElementById('exampleFormControlTextarea1');
    const blogTitle = document.getElementById('post-title-dab');

if(closeBtnDab !== null){

    //close the view of the selected post
    closeBtnDab.addEventListener('click',()=>{
    
        const location = window.location.href;

        if(location.includes('homepage')){
            window.location.href = `/homepage/${currentUser}`;
        }
        else{
            window.location.href = `/dashboard/${currentUser}`;
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
                    window.location.href = `/homepage/${currentUser}`;
                }
                else{
                    window.location.href = `/dashboard/${currentUser}`;
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
                    window.location.href = `/homepage/${currentUser}`;
                }
                else{
                    window.location.href = `/dashboard/${currentUser}`;
                }
        
            }
            catch(err){
        
                console.error(err);
        
            }
        
        
        });

    }

}



