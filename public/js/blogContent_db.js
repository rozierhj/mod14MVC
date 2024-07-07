// async function addPost(userID){

//     const blogText = document.getElementById('blog-text');
//     const blogTitle = document.getElementById('blog-title');


//     try{

//         const response = await fetch('/api/post/add',{
//             method: 'POST',
//             headers:{
//                 'Content-Type':'application/json'
//             },
//             body: JSON.stringify({
//                 blog_post: `${blogText.value}`,
//                 post_title: `${blogTitle.value}`,
//                 post_date: new Date(),
//                 user_id: userID,
    
//             })
//         });

//         const data = await response.json();

//         console.log('success',data);
//     }
//     catch(err){
//         console.error(err);
//     }

// }

// function deleteThePost(id){

//     fetch(`/api/post/delete/${id}`, {
//         method: 'DELETE',
//         headers: {
//         'Content-Type': 'application/json',
//         },
//     })
//     .then(response => response.json())
//     .then(data => {
//     console.log('Delete successful:', data);
//     window.location.href = '/homepage';
//     })
//     .catch(error => {
//     console.error('Error:', error);
//     });

// }

// async function editPostF(postID, userID){

//     const blogText = document.getElementById('edit-blog-text');
//     const blogTitle = document.getElementById('edit-blog-title');
//     try{
//         const response = await fetch(`/api/post/edit/${postID}`,{
//             method: 'PUT',
//             headers:{
//                 'Content-Type':'application/json'
//             },
//             body: JSON.stringify({
//                 blog_post: `${blogText.value}`,
//                 post_title: `${blogTitle.value}`,
//                 id: `${postID}`,
//             })
//         });

//         const data = await response.json();

//         console.log('success',data);

//         window.location.reload();

        
//     }
//     catch(err){
//         console.error(err);
//     }

// }

// function getPostToEdit (postID){
    
//     saveEditButton.addEventListener('click', async ()=>{


//             const modalToDelete = document.getElementById('editModal');
            
//             editPostF(postID);
        
//             const openModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
        
//             openModal.hide();
//             openModal.dispose();
        
//             modalToDelete.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
//             modalToDelete.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
    
//     });
    
// }

// function resetEvents(){

//     Array.from(postHeader).forEach( async button => {
//         button.addEventListener('click', async (event)=>{
    
//             try{
    
//                 await setWindow();
    
//                 await setComment(event);
    
//                 await setSave();
    
    
//             }catch(err){
//                 console.error(err);
//             }
            
    
//         });
//     });


// }

// async function getUserID(user_name){

//     try{
//         const response = await fetch(`api/users/${user_name}`);

//         const data = await response.json();

//         return data.id;

//     }
//     catch(err){
//         console.error(err);
//     }

// }