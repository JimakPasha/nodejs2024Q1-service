# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/JimakPasha/nodejs2024Q1-service
```

## Go to branch this task

```
git checkout feature/part-2/db-containerization
```

## Installing NPM modules

```
npm install
```

## Add change .env.example on .env

## Create and running docker container container

```
docker-compose:up
```

## Run app (no in docker)

```
npm start
```
or
```
npm run start:dev
```

After starting docker containers you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization (you can change in package.json "jest --testPathIgnorePatterns refresh.e2e.spec.ts --noStackTrace --runInBand" on "jest --testPathIgnorePatterns refresh.e2e.spec.ts auth --noStackTrace --runInBand" for run test without authorization)

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

## Scan Docker containers

```
npm run docker:scan
```

## Check docker images in Docker Hub. Images:

jimakpasha/home-library-service-app
jimakpasha/home-library-service-db

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
