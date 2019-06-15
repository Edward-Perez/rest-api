# Rest API 
### Project 9 from the Treehouse Full Stack Javascript TechDegree program. 
**_Node.js, Express, SQL ORM Sequelizer_**

In this project, I’ll create a REST API. The API will provide a way for users to administer a school database containing information about courses. Users can interact with the database by retrieving a list of courses, as well as add, update and delete courses in the database. I will use Node.js, Express, SQL ORM Sequelize, and my knowledge of Rest API to accomplish this goal.

### Project Requirements
* Database Connection
  * Sequelize uses the fsjstd-restapi.db SQLite database that's generated by the npm run seed command
  * Console log database connection status 
* Models
  * Create User Model with HasMany association to Course models
  * Create Course Model with BelongsTo association to User model
* Routes
  * Routes return appropriate JSON data and status 
* Validation
  * User Model
    * firstName, lastName, emailAddress, password require
  * Course Model
    * title, description require
* Password Security
  * User password is hash before persisting the user to the database
* Permission
  * Middleware authentication created for protected routes

### Exceeds Requirements
* The /api/users route filters out the following properties:
  * password
  * createdAt
  * updatedAt
* The /api/courses route filters out the following properties:
  * createdAt
  * updatedAt
* The PUT /api/courses/:id and DELETE /api/courses/:id routes return a 403 status code if current user does not have permission
* The POST /api/users route validates that the provided email address is a valid email address and isn't already associated with an existing user

### Getting Started

To get up and running with this project, run the following commands from the root of the folder that contains this README file.

First, install the project's dependencies using `npm`.

```
npm install
```

Second, seed the SQLite database which will generate the fsjstd-restapi.db database

```
npm run seed
```

And lastly, start the application.

```
npm start
```

To test the Express server, browse to the URL [http://localhost:5000/](http://localhost:5000/).
