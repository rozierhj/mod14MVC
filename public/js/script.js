const dashboardButton = document.getElementById('dashboard-button');
const homeButton = document.getElementById('home-button');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');

//test to move user to homepage if they are already signed in
document.addEventListener('DOMContentLoaded', async ()=>{

    const url = window.location.pathname;
    const response = await fetch('/api/users/userSearch');
    const data = await response.json();
    if(data.loggedIn === true && url.includes('homepage') !== true && url.includes('dashboard') !== true){
        await fetch('/homepage');
        window.location.href = '/homepage';
    }

});

//button on header that takes the user top the dashboard page
dashboardButton.addEventListener('click', async () => {
    //const userID = await  getUserID(currentUser);
    // alert(userID);
    
    const response = await fetch('/api/users/userSearch');

    const data = await response.json();

    if(data.loggedIn === true){
        await fetch('/dashboard');
        window.location.href = '/dashboard';

    }
    else{
        await fetch('/login');
        window.location.href = '/login';
    }
    
 });

 //button on header that takes use to the homepage
 homeButton.addEventListener('click', async () => {

    //testing if there is an active loggin
    const response = await fetch('/api/users/userSearch');

    console.log(response);

    const data = await response.json();

    console.log(data);

    if(data.loggedIn === true){
        await fetch('/homepage');
        window.location.href = '/homepage';

    }
    else{
        await fetch('/login');
        window.location.href = '/login';
    }
 });

 //button on header that logs the user out
 if(logoutButton !== null){


     logoutButton.addEventListener('click', async () => {
        // alert('you are in login.js');
        await fetch('/');
         window.location.href = '/';
     });
 }

 //button on header that logs the user in
 if(loginButton !== null){

    loginButton.addEventListener('click', async () =>{

        try{
            await fetch('/login');
            window.location.href = '/login';

        }
        catch(err){
            console.error(err);
        }

    });

}