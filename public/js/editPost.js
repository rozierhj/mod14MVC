const closeBtnDab = document.getElementById('close-post-page-dab');

closeBtnDab.addEventListener('click',()=>{

    window.location.href = `/dashboard/${currentUser}`;

});