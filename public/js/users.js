
async function getUserID(user_name){

    try{

        const response = await fetch(`api/users/${user_name}`);

        const data = await response.json();

        return data.id;

    }
    catch(err){
        console.error(err);
    }

}

    async function confirmUser(postOrCommentOwner, currentUser){

    let allowEdit = false;

    if(postOrCommentOwner === currentUser){

        allowEdit = true;

    }
    else{

        allowEdit = false;

    }

    return allowEdit;

}