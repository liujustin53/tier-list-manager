# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Workflow for Authorization

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant Frontend
    participant Backend
    participant MAL as MAL API

    User-->>Frontend: Click login button
    Frontend-->>Frontend: Generate Code Challenge and State
    Frontend-->>Backend: Send Code Challenge and State (POST oauth/authorize)
    Frontend-->>User: Redirect to MAL link
    User-->>User: Allow App on MAL
    User-->>Backend: Redirect to 'oauth/redirect' (GET request) with auth code and state
    Backend-->>MAL: Authorize user with provided auth code and state
    Backend-->>Frontend: Set session_id as a cookie
    Frontend-->>Backend: session_id obtained as a cookie when making requests
    Backend-->>Backend: User access_token obtained from session_id
    Backend-->>MAL: Request made using access_token
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
