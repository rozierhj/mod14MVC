
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