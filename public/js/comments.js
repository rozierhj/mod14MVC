
    const closeComment = document.getElementById('close-comments');
    const postComment = document.getElementsByClassName('edit-comment');
    const saveCommentEdit = document.getElementById('save-comment');



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
    
            const commentText = parentComment.querySelector('.card-text').textContent;
            const commentID = parentComment.id;
            const theModal = new bootstrap.Modal(document.getElementById('commentModal'));
            document.querySelector('#commentModal textarea').value = commentText;
            theModal.show();
            
           getCommentToEdit(commentID);
            
    
        });
    });


