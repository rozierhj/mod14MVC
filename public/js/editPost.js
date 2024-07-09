
    const closeBtnDab = document.getElementById('close-post-page-dab');
    const deleteBtnDab = document.getElementById('delete-post-btn-dab');
    const saveBtnDab = document.getElementById('save-post-btn-dab');
    const blogPost = document.getElementById('exampleFormControlTextarea1');
    const blogTitle = document.getElementById('post-title-dab');
    const allPosts = document.getElementsByClassName('post-card-header');




if(closeBtnDab !== null){

    closeBtnDab.addEventListener('click',()=>{
    
        window.location.href = `/dashboard/${currentUser}`;
    
    });
    
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
    
            window.location.href = `/dashboard/${currentUser}`;
    
        }
        catch(err){
    
            console.error(err);
    
        }
    
    
    });
    
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
    
            window.location.href = `/dashboard/${currentUser}`;
    
        }
        catch(err){
    
            console.error(err);
    
        }
    
    
    });

}


Array.from(allPosts).forEach(post => {
    console.log(post);
    post.addEventListener('click', async (event)=>{

        const postClicked = event.target;
        const parentPost = postClicked.closest('.blog-post-dashboard');
        const postID = parentPost.id;

        try{

            await fetch(`/dashboard/${currentUser}/${postID}`);

            window.location.href = `/dashboard/${currentUser}/${postID}`;

        }
        catch(err){

            console.error(err);
        }
        
    });
});
