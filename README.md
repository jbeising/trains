# Trains!

## Description
This project demonstrates a simple service to manage schedules of a single train station with an arbitrary number of train lines. This service should record when trains arrive, and report when multiple trains are in the station at the same time.

## Setup
This project is built in Node.js v16.13.1 (LTS).

### Initial Setup
- Make sure you have the [LTS version of Node.js installed](https://nodejs.org/en/download/)
- Run `npm ci` to install the dependencies
- Run `npm run dev` to run it locally

### Tests
- Run `npm t` to run the tests

### Config
This project uses the `npm` package [`dotenv`](https://www.npmjs.com/package/dotenv), which evaluates a file called `.env` that should be at the root of the application directory that contains environment variables, and automatically makes them accessible via `process.env.NAME_OF_ENV_VAR`.

There are a few config properties, which are explained below:
- `app.name`: The name of the application (automatically pulled from `package.json`)
- `app.version`: The version of the application (automatically pulled from `package.json`)
- `app.debug`: Whether or not the app should be in debug mode, whichs returns a stack trace in the response payload if an error occurs. Pulled from the env variable `APP_DEBUG`. A `string` that evaluates to `'1'` or `'true'` will be `true`, any other value will be `false`
- `httpServer.port`: The port the server should listen on. Defaults to `3000`, but can be set with the env variable `HTTP_PORT`

## API
For detailed api documentation, check out our [swagger page](http://localhost:3000/docs)! (service must be running)
