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

function addComment(postID){

    
    const commentText = document.getElementById('comment-text');

    fetch('/api/comment/add',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            post_comment: `${commentText.value}`,
            post_id : `${postID}`,
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