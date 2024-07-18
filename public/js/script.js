const dashboardButton = document.getElementById('dashboard-button');
const homeButton = document.getElementById('home-button');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');

//link to
dashboardButton.addEventListener('click', async () => {
    //const userID = await  getUserID(currentUser);
    // alert(userID);
    

    await fetch('/dashboard');

    window.location.href = '/dashboard';


    
 });
 homeButton.addEventListener('click', () => {
    // alert('you are in login.js');
     window.location.href = `/homepage`;
 });

 if(logoutButton !== null){

     logoutButton.addEventListener('click', () => {
        // alert('you are in login.js');
         window.location.href = '/';
     });
 }
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