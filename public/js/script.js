const pageButton = document.getElementById('page-button');
const dashboardButton = document.getElementById('dashboard-button');
const homeButton = document.getElementById('home-button');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const poster1 = JSON.parse(sessionStorage.getItem('user'));
const currentUser1 = poster1.username;


pageButton.addEventListener('click', () => {
   // alert('you are in login.js');
    window.location.href = '/page';
});
dashboardButton.addEventListener('click', async () => {
    // alert('you are in login.js');
    const userID = await  getUserID(currentUser1);

     if(userID > 0){
        window.location.href = `/dashboard/${userID}`;
     }
     else{
        window.location.href = `/dashboard`;
     }
    
 });
 homeButton.addEventListener('click', () => {
    // alert('you are in login.js');
     window.location.href = '/homepage';
 });
 logoutButton.addEventListener('click', () => {
    // alert('you are in login.js');
     window.location.href = '/';
 });
 if(loginButton !== null){

    loginButton.addEventListener('click', () => {
        // alert('you are in login.js');
         window.location.href = '/login';
     });

 }
