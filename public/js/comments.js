
    const closeComment = document.getElementById('close-comments');
    const postComment = document.getElementsByClassName('edit-comment');
    const saveCommentEdit = document.getElementById('save-comment');
    const createNewComment = document.getElementById('create-comment');

    if(createNewComment !== null){

        createNewComment.addEventListener('click', async ()=>{
    
            const buttonParent = createNewComment.parentElement;
            const parent = buttonParent.parentElement;
            const closestComment = parent.querySelector('.post-comment'); 
            const closestCommentID = closestComment.id.replace('comment-',"");
            const postID = await getPostIDByComment(closestCommentID);

            const theModal = new bootstrap.Modal(document.getElementById('commentModal'));
            theModal.show();
    
            console.log(postID);
            await addComment(postID);   
    
        });

    }

    if(closeComment !== null){

        closeComment.addEventListener('click',()=>{
    
           window.location.href = '/dashboard';
        });
    }
    
    Array.from(postComment).forEach(button => {
        button.addEventListener('click',(event)=>{
    
    
            const buttonClicked = event.target;
    
            

                const buttonClick = document.querySelector(`#${buttonClicked.id}`);
                const parentComment = buttonClick.closest('.post-comment');
                if(parentComment !== null){
                const commentText = parentComment.querySelector('.card-text').textContent;
                const commentID = parentComment.id;
                const theModal = new bootstrap.Modal(document.getElementById('commentModal'));
                document.querySelector('#commentModal textarea').value = commentText;
                theModal.show();
                
               getCommentToEdit(commentID);
            }
            
    
        });
    });

    async function getPostIDByComment(commentID){
        try{

            const response = await fetch(`/api/comment/get/${commentID}`);

            const data = await response.json();

            return data;

        }catch(err){
            console.error('there was an error',err);
        }
    }


