const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const sequelize = require('./util/database');

const UserDetails = require('./routes/user');

const app = express();
//app.use(cors()) in your server code, it allows the server to respond to requests from different origins, 
//including requests coming from different laptops or devices.

//When you make a POST request from the front end to the backend server, the backend server does send a response back to the front end. 
//CORS (Cross-Origin Resource Sharing) comes into play during this process to determine whether the front end is allowed to access the response.
//In your above example, the reason why you would require CORS (Cross-Origin Resource Sharing) policy 
//is because you are making a POST request from the front end (client-side) to the backend server (server-side) that is hosted on a different domain.
//The same-origin policy implemented by browsers restricts web pages from making requests to a different origin (domain, protocol, or port) than the one from which they were loaded. 
//This policy is in place to prevent malicious scripts from accessing sensitive data or performing unauthorized actions.
//In your case, when the front end code running in the browser sends a POST request to the backend server, 
//the request is considered a cross-origin request because the client-side code is running in the origin of https://www.example.com, 
//while the server-side code is hosted on https://api.example.com.
//By default, the browser will block this cross-origin request because of the same-origin policy. 
//This is where CORS comes into play. 
//CORS provides a mechanism to relax the same-origin policy and allow controlled cross-origin requests.
//To make the POST request from the front end to the backend server successful, you need to configure the backend server to handle CORS and include the appropriate CORS headers in its response. 
//These headers specify which origins are allowed to access the server's resources.

app.use(cors());

//bodyparser helps to parse the incoming request means after making request, req.body get hold of the information 
//information present inside body-parser should be in json formate
app.use(bodyparser.json());

app.use(UserDetails);

sequelize.sync()
.then(()=>{
    app.listen(3000,()=>{
        console.log('server running on port 3000')  
        //If you are seeing the message "server running on port 3000" in your console log, 
        //it indicates that your backend server is successfully running and listening on port 3000. 
        //This message is typically logged when the server starts up and begins accepting incoming requests.
    });
}) 
.catch((err)=>{
    console.log('error while connecting database:',err);
})
