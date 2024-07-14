
const createAccount = document.getElementById('create-new-account');
const createMyAccount = document.getElementById('create-my-account');
const createPassword = document.getElementById('create-password');
const createUsername = document.getElementById('create-username');

if(createAccount !== null){


    createAccount.addEventListener('click', async () =>{
    
        try{
            await fetch('/homepage/createAccount');
        
            window.location.href = '/homepage/createAccount';
    
        }
        catch(err){
            console.error(err);
        }
    
    });

}

if(createMyAccount !== null){

    createMyAccount.addEventListener('click', async () =>{
        const response = await fetch('/api/users/add',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            
            body: JSON.stringify({
                user_name: createUsername.value,
                password: createPassword.value,
            })
        });
        
        const data = await response.json();

        console.log(data);

       await fetch('/dashboard');

       window.location.href = '/dashboard';

    });

}