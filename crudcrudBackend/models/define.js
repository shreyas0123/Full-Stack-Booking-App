const Sequelize = require('sequelize');
const sequelize = require('../util/database');

//sequelize method will automatically create table,column in database if does not exist
//create obj called user and table name of sequelizer is "users"
const user = sequelize.define("users",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    number:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    }
});

(async () => {
    try {
      // Create the User table if it doesn't exist with force: true option
      await user.sync(); //if table does not exist then force:true inside user.sync({force:true})
      console.log('users table created successfully.');
    } catch (error) {
      console.error('Error creating User table:', error);
    }
  })();
  
module.exports = user;


