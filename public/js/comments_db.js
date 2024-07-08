
const closeCommentDAB = document.getElementById('close-comments');
const postCommentDAB = document.getElementsByClassName('edit-comment');
const saveCommentEditDAB = document.getElementById('save-comment');
const createNewCommentDAB = document.getElementById('create-comment');
const deleteCommentDAB = document.getElementsByClassName('delete-comment');
//    poster = JSON.parse(sessionStorage.getItem('user'));
//    currentUser = poster.username;


if(createNewCommentDAB !== null){

    createNewCommentDAB.addEventListener('click', async ()=>{

        const buttonParent = createNewComment.parentElement;
        const parent = buttonParent.parentElement;
        const closestComments = parent.querySelector('.post-comment'); 
        const closestCommentID = closestComments.id.replace('comment-',"");
        const postID = await getPostIDByComment(closestCommentID);

        prepareCommentModal(postID);
        const theModal = new bootstrap.Modal(document.getElementById('commentModal'));
        document.querySelector('#commentModal textarea').value = '';

        theModal.show();

        console.log(postID);
        await addComment(postID, postHeader);   

    });

}

if(closeCommentDAB !== null){

    closeCommentDAB.addEventListener('click',()=>{

       window.location.href = `/dashboard/${currentUser}`;
    });
}

Array.from(postCommentDAB).forEach(button => {
    button.addEventListener('click',(event)=>{

        const buttonClicked = event.target;
            const parent = document.getElementById('comments');
            const post = parent.querySelector('.blog-post');
            const postID = post.id;
            const buttonClick = document.querySelector(`#${buttonClicked.id}`);
            const parentComment = buttonClick.closest('.post-comment');
            if(parentComment !== null){
            const commentText = parentComment.querySelector('.card-text').textContent;
            const commentID = parentComment.id;


            const theModal = new bootstrap.Modal(document.getElementById('commentModal'));
            document.querySelector('#commentModal textarea').value = commentText;
            prepareCommentModal(postID);
            theModal.show();
            
           getCommentToEdit(commentID);
        }
        
    });
});

Array.from(deleteCommentDAB).forEach(button => {
    button.addEventListener('click', async (event)=>{

            const buttonClicked = event.target;
            const buttonClick = document.querySelector(`#${buttonClicked.id}`);
            const parentComment = buttonClick.closest('.post-comment');

            if(parentComment !== null){
            const commentID = parentComment.id;
            const closestCommentID = commentID.replace('comment-',"");
            const postID = await getPostIDByComment(closestCommentID);

            deleteTheComment(closestCommentID, postID);
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

function deleteTheComment(commentID, postID){

    fetch(`/api/comment/delete/${commentID}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.length > 1){
            window.location.href = `/homepage/${postID}`;
        }
        else{
            window.location.href = '/homepage';
        }
    })
    .catch(error => {
    console.error('Error:', error);
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
        window.location.href = `/homepage/${data.post_id}`;
    })
    .catch((error)=>{
        console.error('error:',error);
    });

}

async function getCommentsF(postID){

    try{
        const response = await fetch(`/homepage/${postID}`);

        const data = await response.json();

        if(data.response === false){
            return false;
        }
        else{
            window.location.href = `/homepage/${postID}`;
            return postID;
        }

    }
    catch(err){
        console.error('bad request',err);
    }
    
}

function getCommentToEdit(commentID){

    saveCommentEditDAB.addEventListener('click', ()=>{

        const modalToDelete = document.getElementById('commentModal');
    
       editCommentF(commentID);      
    
        const openModal = bootstrap.Modal.getInstance(document.getElementById('commentModal'));
    
        openModal.hide();
        openModal.dispose();
    
        modalToDelete.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
       // window.location.href = '/homepage';
    
    });
    
}

async function createComment(postID, userName){

    try{
        const postComment = document.getElementById('comment-text');

        const response = await fetch('/api/comment/add',{
              method: 'POST',
              headers:{
                  'Content-Type':'application/json'
              },
              body: JSON.stringify({
                  post_comment: `${postComment.value}`,
                  post_id: `${postID}`,
                  user_name: userName,
              })
          })
          const data = await response.json();
  
          console.log(data);
    }
    catch(err){
        console.error(err);
    }
}

async function addComment(postID){

    
    saveCommentButton.addEventListener('click', async ()=>{

        const modalToDelete = document.getElementById('commentModal');
    
        await createComment(postID, currentUser);
    
        const openModal = bootstrap.Modal.getInstance(document.getElementById('commentModal'));
    
        openModal.hide();
        openModal.dispose();
    
        // modalToDelete.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
        modalToDelete.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
        window.location.href = `/homepage/${postID}`;
    
    });
    
}

async function getComments(postID){

    const commentGotten = await getCommentsF(postID);

    if(commentGotten=== false){


        prepareCommentModal(postID);
        const theModal = new bootstrap.Modal(document.getElementById('commentModal'));
        theModal.show();
        
        addComment(postID);

     }
    else{
        window.location.href = `/homepage/${postID}`;
        return postID;
    }
        

}

// function prepareCommentModal(postID){

// const postHeader = document.getElementById(`header-${postID}`);
// let commentHeader = document.getElementById('post-details-header');
// commentHeader.innerHTML = postHeader.innerHTML

// const postTitle = document.getElementById(`post-title-${postID}`);
// const postText = document.getElementById(`post-text-${postID}`);
// let commentText = document.getElementById('post-details-text');
// let commentTitle = document.getElementById('post-details-title');
// commentTitle.innerHTML = postTitle.innerHTML;
// commentText.innerHTML = postText.innerHTML;

// }