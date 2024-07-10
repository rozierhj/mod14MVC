
    const savePostBtn = document.getElementById('save-new-post');
    const closePostBtn = document.getElementById('close-new-post');
    const postText = document.getElementById('exampleFormControlTextarea1');
    const postTitle = document.getElementById('new-post-title');

    savePostBtn.addEventListener('click', async ()=>{

        try{
            const response = await fetch('/api/post/add',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    blog_post: `${postText.value}`,
                    post_title: `${postTitle.value}`,
                    post_date: new Date(),
                    user_name: `${currentUser}`,
        
                })
            });
    
            const data = await response.json();

            
    
            console.log(data);
        }
        catch(err){
            console.error(err);
        }
    });

    closePostBtn.addEventListener('click', ()=>{

        window.location.href = '/homepage';

    });

