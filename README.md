# Recipe App
This is a recipe application built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). It allows users to sign up, log in, log out and perform CRUD operations on recipes. The project consists of two controllers: the user controller for authentication and the recipe controller.

## Features
- User authentication (sign up, log in, and logout)
- Recipe management (create, read, update, and delete recipes)
- Saving and retrieving saved recipes
- User authentication middleware for protected routes
- API documentation using Swagger UI

## Dependencies
kindly check package.json file for all the dependencies

## Installation
Install the dependencies:
npm install
```
git clone <repository_url>
cd <project_directory>
npm install
```

Configure the environment variables:
- Update the necessary values in the `.env` file, such as the database connection URL.

Create a .env file in the root directory and add the following variables:


The application will start running on http://localhost:${port}.
Please refer to the API documentation using Swagger UI for more details on request and response formats.

## Routes
- `POST /signup`: Create a new user account.
- `POST /login`: Log in to an existing user account.
- `GET /logout`: Log out the current user.
- `GET /:recipeId`: Get a recipe by its ID.
- `PUT /save`: Save a recipe.
- `GET /savedRecipes/ids/:userId`: Get saved recipe IDs for a user.
- `GET /savedRecipes/:userId`: Get saved recipes for a user.
- `DELETE /delete/:recipeId`: Delete a recipe by its ID.
- `PUT /update/:recipeId`: Update a recipe by its ID.


## Contributing
Contributions and feedback are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue. Please follow the contribution guidelines outlined.

Author : Nishant(@nishant219)


