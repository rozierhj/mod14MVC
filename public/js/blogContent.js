function addPost(){

    const blogText = document.getElementById('blog-text');
    const blogTitle = document.getElementById('blog-title');

    fetch('/api/post/add',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            blog_post: `${blogText.value}`,
            post_title: `${blogTitle.value}`,
        })
    })
    .then(response=>response.json())
    .then(data =>{
        console.log('success',data)
    })
    .catch((error)=>{
        console.error('error:',error);
    });

}

function deleteThePost(id){

    fetch(`/api/post/delete/${id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
    console.log('Delete successful:', data);
    window.location.href = '/dashboard';
    })
    .catch(error => {
    console.error('Error:', error);
    });

}

function editPostF(postID){

    const blogText = document.getElementById('edit-blog-text');
    const blogTitle = document.getElementById('edit-blog-title');
    
    console.log(`/api/post/edit/${postID}`);

    fetch(`/api/post/edit/${postID}`,{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            blog_post: `${blogText.value}`,
            post_title: `${blogTitle.value}`,
            id: `${postID}`,
        })
    })
    .then(response=>response.json())
    .then(data =>{
        console.log('success',data)
    })
    .then(()=>{
        window.location.href = '/dashboard';
    })
    .catch((error)=>{
        console.error('error:',error);
    });

}

function editPostF(postID){

    const blogText = document.getElementById('edit-blog-text');
    const blogTitle = document.getElementById('edit-blog-title');

    fetch(`/api/post/edit/${postID}`,{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            blog_post: `${blogText.value}`,
            post_title: `${blogTitle.value}`,
            id: `${postID}`,
        })
    })
    .then(response=>response.json())
    .then(data =>{
        console.log('success',data)
    })
    .then(()=>{
        window.location.href = '/dashboard';
    })
    .catch((error)=>{
        console.error('error:',error);
    });

}

function editCommentF(commentID){

    const commentText = document.getElementById('comment-text');
    commentID = commentID.replace('comment-',"");

    fetch(`/api/comment/edit/${commentID}`,{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            post_comment: `${commentText.value}`,
            id: `${commentID}`,
        })
    })
    .then(response=>response.json())
    .then(data =>{
        console.log(data);
        window.location.href = `/dashboard/${data.post_id}`;
    })
    // .then(()=>{
    //     window.location.href = `/dashboard/${postID}`;
    // })
    .catch((error)=>{
        console.error('error:',error);
    });

}

async function getCommentsF(postID){

    try{
        const response = await fetch(`/dashboard/${postID}`);

        const data = await response.json();

        if(data.response === false){
            return false;
        }
        else{
            window.location.href = `/dashboard/${postID}`;
            return true;
        }

    }
    catch(err){
        console.error('bad request',err);
    }
    
}

function getPostToEdit(postID){

    saveEditButton.addEventListener('click', ()=>{

        const modalToDelete = document.getElementById('editModal');
    
        editPostF(postID);
    
        const openModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    
        openModal.hide();
        openModal.dispose();
    
        modalToDelete.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
        modalToDelete.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
        window.location.href = '/dashboard';
    
    });
    
}

function getCommentToEdit(commentID){

    saveCommentEdit.addEventListener('click', ()=>{

        const modalToDelete = document.getElementById('commentModal');
    
       editCommentF(commentID);      
    
        const openModal = bootstrap.Modal.getInstance(document.getElementById('commentModal'));
    
        openModal.hide();
        openModal.dispose();
    
        modalToDelete.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
       // window.location.href = '/dashboard';
    
    });
    
}

function createComment(postID){

    const postComment = document.getElementById('comment-text');

    fetch('/api/comment/add',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            post_comment: `${postComment.value}`,
            post_id: `${postID}`,
        })
    })
    .then(response=>response.json())
    .then(data =>{
        console.log('success',data)
    })
    .catch((error)=>{
        console.error('error:',error);
    });

}

function addComment(postID){

    saveCommentButton.addEventListener('click', ()=>{

        const modalToDelete = document.getElementById('commentModal');
    
        createComment(postID);
    
        const openModal = bootstrap.Modal.getInstance(document.getElementById('commentModal'));
    
        openModal.hide();
        openModal.dispose();
    
        modalToDelete.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
        modalToDelete.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
        window.location.href = '/dashboard';
    
    });
    
}

function resetEvents(){

    Array.from(postHeader).forEach( async button => {
        button.addEventListener('click', async (event)=>{
    
            try{
    
                await setWindow();
    
                await setComment(event);
    
                await setSave();
    
    
            }catch(err){
                console.error(err);
            }
            
    
        });
    });


}

async function getComments(postID){

        const commentGotten = await getCommentsF(postID);

        if(commentGotten=== false){


            const theModal = new bootstrap.Modal(document.getElementById('commentModal'));
            theModal.show();
            
            addComment(postID);

         }
        else{
            window.location.href = `/dashboard/${postID}`;
        }
            
    
}