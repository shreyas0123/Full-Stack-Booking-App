const user = require('../models/define');

//adding new record into a database table using add method
//first step:
//how we can add means we need to first get the values of form fields like name,email,phone (req.body holds all these variables)
//we we make an http request(means when we click on submit button) forms fileds like name,email,phone values stored in an request.body

exports.addmethod = async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const number = req.body.number;
        console.log('from req.body>>>>',name, email, number);

        //second step:
        //Use the user.create() method to create a new user record in the database with the extracted values.
        //Await the completion of the create() method and assign the result to the data variable

        const data = await user.create({
            name: name,
            email: email,
            number: number

        })
        
        res.json({ newuser: data })
        console.log('response from add method',data);

    } catch (error) {
        res.json({ Error: error })
        console.log('error from add method in add.js',error);
    }
}

//1st step
// the code calls user.findAll() to retrieve data. 
//It assumes that there is a user model or database table defined and connected.

//2nd step:
//The retrieved data is then transformed using the map method. 
//For each user object, a new object is created with additional properties, 
//including an _id property that corresponds to the id property of the original user object.
//The transformed data is stored in the modifiedData variable.

//3rd step:
//Finally, the res.json() method is used to send a JSON response back to the client. 
//It sends an object with a property named alluser, which contains the modifiedData array.

exports.getmethod = async (req, res) => {
    try {
      const data = await user.findAll();
      const modifiedData = data.map((user) => ({
        _id: user.id, // Add the _id property
        name: user.name,
        email: user.email,
        number: user.number,
      }));
      res.json({ alluser: modifiedData });
    } catch (error) {
      console.log('Error from add.js get method', error);
      res.json({ Error: error });
    }
  };

//1st step:
//On the front end, when the delete button is clicked, 
//an HTTP DELETE request is made to the server with the ID of the record to be deleted. 
//The ID is typically included in the URL as a parameter.

//2nd step:
//router routes.delete("/delete-details/:id",add.deletemethod) will acceess the id usin the path /delete-details/:id
//i.e
//The ID value will be captured in the route definition and then passed to the server's delete method.
//In the route definition, the placeholder ":id" captures the ID value from the URL. 
//When a request is made to the corresponding route, 
//the captured ID value is extracted from the URL parameters and made available in the route handler as req.params.id.

//3rd step:
//From there, you can pass the captured ID value to the server's delete method or use it for any other required operations. 
//The server's delete method can then access the ID value from req.params.id and use it to perform the necessary deletion action.

//4th step:
//The server-side code can then use this ID to perform the deletion operation, typically using a database query. 
//In your case, user.destroy({ where: { id: detailsId } }) is used to delete the record with a matching ID.

  exports.deletemethod = async (req, res) => {
    try {
        console.log('params id:', req.params.id); 
    if (!req.params.id) {
        throw new Error('id is mandatory to delete');
      }
      const detailsId = req.params.id;
      console.log('id of params',detailsId)
      await user.destroy({ where: { id: detailsId } });
      res.sendStatus(200); // Sending a success response with status code 200
    } catch (error) {
      console.log('error from add.js delete method', error);
      res.status(500).json({ error: error.message }); // Sending an error response with status code 500 and the error message
    }
  };

 