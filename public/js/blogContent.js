async function addPost(){

    const blogText = document.getElementById('blog-text');
    const blogTitle = document.getElementById('blog-title');


    try{
        const response = await fetch('/api/post/add',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                blog_post: `${blogText.value}`,
                post_title: `${blogTitle.value}`,
                post_date: new Date(),
                user_name: `${currentUser}`,
    
            })
        });

        const data = await response.json();

        console.log('success',data);
    }
    catch(err){
        console.error(err);
    }

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
    window.location.reload();
    })
    .catch(error => {
    console.error('Error:', error);
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
        window.location.reload();
    })
    .catch((error)=>{
        console.error('error:',error);
    });

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
        window.location.reload();
    
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


