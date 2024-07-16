
const homePostButton = document.getElementById('make-post');
const homePostHeader = document.getElementsByClassName('post-header');
//const loginButton = document.getElementById('login-button');


//button to create new posts
if(homePostButton !== null){

    homePostButton.addEventListener('click', async () => {
    
        try{
            await fetch(`/homepage/newPost`);
            window.location.href = `/homepage/newPost`;
            console.log('success');
    
        }
        catch(err){
            console.error(err);
        }
    
    });

}



// set event for headers for every post
Array.from(homePostHeader).forEach(postHeader => {

    //event to open a post with its comments
    postHeader.addEventListener('click', async (event)=>{

        const homeHeadersClicked = event.target;
        const homeSelectedPost = homeHeadersClicked.closest('.blog-post');
        const postID = homeSelectedPost.id;

        try{

            const response = await fetch(`/api/post/${postID}`);

            const data = await response.json();

            const postUser = data.selectPost.user_name;
            const currentUser = data.currentUser;
        

            if(postUser === currentUser){

                await fetch(`/homepage/myPost/${postID}`);
                window.location.href = `/homepage/myPost/${postID}`;
            }

            else{
                await fetch(`/homepage/post/${postID}`);
                window.location.href = `/homepage/post/${postID}`;
            }


        }
        catch(err){
            console.error(err);
        }

    });
});






