const seedPosts = require('./post-seeds.js');
//const seedUsers = require('./user-seeds.js');

const sequelize = require('../config/connection.js');

const seedBlog = async () =>{

    await sequelize.sync({force:false});
    console.log('DataBase Synced');

    // await seedUsers();
    // console.log('Users seeded');

    await seedPosts();
    console.log('Posts seeded');

}

seedBlog();