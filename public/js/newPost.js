
    const savePostBtn = document.getElementById('save-new-post');
    const closePostBtn = document.getElementById('close-new-post');
    const postText = document.getElementById('exampleFormControlTextarea1');
    const postTitle = document.getElementById('new-post-title');

    //save a new post
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

    //close the new post window
    closePostBtn.addEventListener('click', ()=>{

        const location = window.location.href;

        if(location.includes('homepage')){
            window.location.href = `/homepage`;
        }
        else{
            window.location.href = `/dashboard`;
        }

    });



