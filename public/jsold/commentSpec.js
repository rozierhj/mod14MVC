
    const savePostBtn = document.getElementById('save-new-comment');
    const closePostBtn = document.getElementById('close-new-comment');
    const commentText = document.getElementById('exampleFormControlTextarea1');

    savePostBtn.addEventListener('click', async (postID)=>{

        try{
    
            const response = await fetch('/api/comment/add',{
                  method: 'POST',
                  headers:{
                      'Content-Type':'application/json'
                  },
                  body: JSON.stringify({
                      post_comment: `${commentText.value}`,
                      post_id: `${postID}`,
                      user_name: `${currentUser}`,
                  })
              })
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

