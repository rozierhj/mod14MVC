
const homePostButton = document.getElementById('make-post');
const homePostHeader = document.getElementsByClassName('post-header');
//const loginButton = document.getElementById('login-button');


//button to create new posts
homePostButton.addEventListener('click', async () => {

    try{
        await fetch(`/homepage/${currentUser}/newPost`);
        window.location.href = `/homepage/${currentUser}/newPost`;
        console.log('success');

    }
    catch(err){
        console.error(err);
    }

});

if(loginButton !== null){

    loginButton.addEventListener('click', async () =>{

        try{
            await fetch('/homepage/login');
            window.location.href = '/homepage/login';

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

            const postUser = data.user_name;

            if(postUser === currentUser){

                await fetch(`/homepage/${currentUser}/${postID}/myPost`);
                window.location.href = `/homepage/${currentUser}/${postID}/myPost`;
            }

            else{
                await fetch(`/homepage/${currentUser}/${postID}`);
                window.location.href = `/homepage/${currentUser}/${postID}`;
            }


        }
        catch(err){
            console.error(err);
        }

    });
});






