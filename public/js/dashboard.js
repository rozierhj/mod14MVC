
const postButton = document.getElementById('make-post');
const savePostButton = document.getElementById('save-post');
const allPosts = document.getElementsByClassName('post-card-header');

//create a new post
postButton.addEventListener('click', async () =>{

    try{
        
       await fetch(`/dashboard/${currentUser}/newpost`);

       window.location.href = `/dashboard/${currentUser}/newpost`;

    }
    catch(err){
        console.error(err);
    }

});

// get one post from the dashboard to view
Array.from(allPosts).forEach(post => {

    post.addEventListener('click', async (event)=>{

        const postClicked = event.target;
        const parentPost = postClicked.closest('.blog-post-dashboard');
        const postID = parentPost.id;

        try{

            await fetch(`/dashboard/${currentUser}/${postID}`);

            window.location.href = `/dashboard/${currentUser}/${postID}`;

        }
        catch(err){

            console.error(err);
        }
        
    });
});


