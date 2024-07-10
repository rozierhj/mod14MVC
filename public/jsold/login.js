const loginButton2 = document.getElementById('login-button');
const createUserBtn = document.getElementById('create-user-btn');

document.addEventListener('DOMContentLoaded', function () {
    const theModal = new bootstrap.Modal(document.getElementById('signupModal'), {});
    theModal.show();
});

loginButton2.addEventListener('click', () => {
    
    const theModal = new bootstrap.Modal(document.getElementById('signupModal'), {});
    theModal.show();

});

createUserBtn.addEventListener('click', ()=>{

    const modalToDelete = document.getElementById('signupModal');

    const openModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));

    newUser();

    openModal.hide();
    openModal.dispose();

    modalToDelete.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
    modalToDelete.querySelectorAll('input[type="password"]').forEach(input => input.value = '');
    window.location.href = '/homepage';


});

async function newUser()
{
    
    try{
        const userName = document.getElementById('new-user');
        const newPW = document.getElementById('inputPassword');
        
        const response = await fetch('/api/login/add',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                user_name: `${userName.value}`,
                password: `${newPW.value}`,
            })
        })
        const data = await response.json();

        //console.log(userName.value);
        
        const user = {
            username:data.user_name
        }

        sessionStorage.setItem('user',JSON.stringify(user));
        console.log('success',data);
    }
    catch(err){
        console.error(err);
    }


}