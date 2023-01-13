### ProjectPlanner
### Exercise given by Littlegiants. Flutter frontend, NestJS backend, Postgres Database. 

# Current known problems are: 
Picture/avatar uploads functonality kind of works. It's possible to upload an image and avatar and overwrite it with a new post request, however the previous images are never deleted. It also currently doesn't check if the file extension is correct.

E2E-tests can be more thorough, albeit most of the coding is simple it just takes time to write all the niche cases.

Migrations are not implemented, so the way to reset the application is through docker-compose down & docker-compose up, this is also how the tests are reset.



## Frontend

Has not been developed yet.

## Backend

# All minimum requirements have been met, and the additional requirement regarding authentication has also been completed
To run the application you need docker.
In the folder projectplanner run docker-compose up to start the database and adminer on port 8080 to see the tables.
In the terminal cd into backend/projectplanner_backend and run npm start run:dev
To start the tests run npm run test:e2e
Remember to docker-compose down & docker-compose up to reset the database.

# Here are the end points
BaseUrl = http://localhost:3000
Most end points requires authentication, this is done by adding a authentication header with a jwt token.
The jwt token is a response when logging in with an existing user. 
You add the token to the header like this "bearer {token}"

# USER

@Get(/auth)
Gets all users

@Post('/auth/create')
Creates a user with the body {username, password}

@Get('/auth/me')
Gets currently logged in user

@Patch('/auth/me')
Updates current user with the body {username, password}

@Post('/auth/:id/avatar/')
Adds an avatar to the server and updates the user 

@Get('/auth/avatar/:avatarname')
Gets a specific avatar

@Post('/auth/login')
Logs in the user with the body {username, password}

@Post('/auth/refreshtoken')
Refreshes the jwt token (can also be done by just logging in again)


# Tasks

@Get('/tasks')
Gets current tasks

@Get('/tasks/ownertasks')
Gets tasks that the logged in user owns

@post('/tasks/task')
Creates a task with the body {title, description}

@Get('/tasks/task/:id')
Gets specific task based on id

@Patch('tasks/task/:id')
Updates specific task based on id with the body {title, description}

@Post('/tasks/task/:id/tag')
Adds a tag to a specific task with the body {name}

@Delete('tasks/task/:id/tag/:tagId')
Removes a specific tag from a specific task

@Post('tasks/task/:id/assignee')
Adds assignee to a specific task with the body {userId}

@Delete('tasks/task/:id/assignee/:userId')
Removes specific assignee from specific task

@Post('tasks/task/:id/uploadimage/')
Uploads image to the server and updates the image on the user

@Get('tasks/task/image/:imagename')
Gets a specific image from the server

@Delete('tasks/task/:id')
Deletes a specific task






