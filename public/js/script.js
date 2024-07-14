const pageButton = document.getElementById('page-button');
const dashboardButton = document.getElementById('dashboard-button');
const homeButton = document.getElementById('home-button');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const poster = JSON.parse(sessionStorage.getItem('user'));
const userID = '';

document.addEventListener('DOMContentLoaded', function () {
    
    const pageHeader = document.getElementById('all-page-header');


});
const currentUser = poster.username;

//link to dashboard page
dashboardButton.addEventListener('click', async () => {

    //
     if(currentUser !== null && currentUser !== undefined && currentUser !== ''){
        window.location.href = `/dashboard/${currentUser}`;
     }
     else{
        window.location.reload();
     }
    
 });
 homeButton.addEventListener('click', () => {
    // alert('you are in login.js');
     window.location.href = `/homepage/${currentUser}`;
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