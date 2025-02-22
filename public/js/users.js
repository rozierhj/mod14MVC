
const createAccount = document.getElementById('create-new-account');
const createMyAccount = document.getElementById('create-my-account');
const createPassword = document.getElementById('create-password');
const createUsername = document.getElementById('create-username');
const signUserInBtn = document.getElementById('sign-in-user');
const userName = document.getElementById('signin-user-name');
const userPassword = document.getElementById('signin-password');
const logoutBtn = document.getElementById('logout-button');
const closeSignIn = document.getElementById('close-sign-in');
const closeCreateAccount = document.getElementById('close-sign-up');

//button user clicks to be taken to create account menu
if(createAccount !== null){


    createAccount.addEventListener('click', async () =>{
    
        try{
            await fetch('/createAccount');
        
            window.location.href = '/createAccount';
    
        }
        catch(err){
            console.error(err);
        }
    
    });

}

//button user clicks to create their account
if(createMyAccount !== null){

    createMyAccount.addEventListener('click', async () =>{

        //checking if the username already exists
        const userResponse = await fetch(`/api/users/check/${createUsername.value}`);
        const userData = await userResponse.json();

        if(userData.hasUser === true){
            let errorMessage = document.getElementById('error-message');
            errorMessage.innerHTML = 'That username name already exists';
        }
        else{
            //create user account
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
        }


    });

}

//sign user in
if(signUserInBtn !== null){

    signUserInBtn.addEventListener('click', async () =>{
   
        const response = await fetch('/api/users/login',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
    
            body: JSON.stringify({
                user_name: userName.value,
                password: userPassword.value,
            })
        });
        
        if(response.status !== 200){
            let errorMessage = document.getElementById('error-message');
            errorMessage.innerHTML = 'Incorrect Username or Password!';
    
        }
        else{
    
            const data = await response.json();
            console.log(data);
    
    
            const currentUser = data.session.user_name;
            const sessionLive = data.session.loggedIn;
    
    
           await fetch('/dashboard');
    
           window.location.href = '/dashboard';
        }
    
    }); 
}

//log user out
if(logoutBtn !== null){

    logoutBtn.addEventListener('click', async ()=>{


        const response =  await fetch('/api/users/logout',{
             method: 'POST',
             headers:{
                 'Content-Type':'application/json'
             },
         });
         if(response.ok){
             window.location.href = '/';
         }
         else{
             alert(response.statusText);
         }

    });


}

//close the signin window
if(closeSignIn !== null){

    closeSignIn.addEventListener('click', async () =>{

        await fetch('/');
        window.location.href = '/';

    })

}

//close the create account window
if(closeCreateAccount !== null){
    closeCreateAccount.addEventListener('click', async () =>{

        await fetch('/');
        window.location.href = '/';

    });
}