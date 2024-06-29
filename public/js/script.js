const pageButton = document.getElementById('page-button');
const dashboardButton = document.getElementById('dashboard-button');
const homeButton = document.getElementById('home-button');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');

pageButton.addEventListener('click', () => {
   // alert('you are in login.js');
    window.location.href = '/page';
});
dashboardButton.addEventListener('click', () => {
    // alert('you are in login.js');
     window.location.href = '/dashboard';
 });
 homeButton.addEventListener('click', () => {
    // alert('you are in login.js');
     window.location.href = '/home';
 });

 logoutButton.addEventListener('click', () => {
    // alert('you are in login.js');
     window.location.href = '/';
 });

 loginButton.addEventListener('click', () => {
    // alert('you are in login.js');
     window.location.href = '/login';
 });