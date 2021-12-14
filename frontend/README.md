# What is this?

This is the front end package of the project Poll Master. This project is initialized with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
The build is automatically initialized by the back end package's build script. The express app will look for static assets in the build folder.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
### Deployment

The whole Poll Master project is deployed on [Heroku](https://poll-master.herokuapp.com/). The front end packaged is automatically built by heroku with the build script in the back end package