const pageButton = document.getElementById('page-button');
const dashboardButton = document.getElementById('dashboard-button');
const homeButton = document.getElementById('home-button');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const poster = JSON.parse(sessionStorage.getItem('user'));
document.addEventListener('DOMContentLoaded', async function () {
    // window.scrollTo(0, document.body.scrollHeight);
    const userID = await getUserID(currentUser);
alert(userID);
});
const currentUser = poster.username;




pageButton.addEventListener('click', () => {
   // alert('you are in login.js');
    window.location.href = '/page';
});
dashboardButton.addEventListener('click', async () => {
    // alert('you are in login.js');
    const userID = await  getUserID(currentUser);
    //alert(userID);

     if(userID > 0){
        window.location.href = `/dashboard/${currentUser}`;
     }
     else{
        window.location.reload();
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