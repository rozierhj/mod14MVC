const dashboardButton = document.getElementById('dashboard-button');
const homeButton = document.getElementById('home-button');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');

//link to
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

 homeButton.addEventListener('click', async () => {

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

 if(logoutButton !== null){


     logoutButton.addEventListener('click', async () => {
        // alert('you are in login.js');
        await fetch('/');
         window.location.href = '/';
     });
 }
 
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