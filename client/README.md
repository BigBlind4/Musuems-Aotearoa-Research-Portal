# GLAMS

## Getting Started

This instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

This project has dependencies that require Node 6.11.0 or higher, together with NPM 3.10 or higher.

If you don't have NodeJS installed, please download and install it in your local machine from: https://nodejs.org/en/ (Recommended version).

Recommended code editor: Visual Studio Code (https://code.visualstudio.com/). There are many extensions that help formatting and debugging.

## Running the project

First, clone this repository
```
$ git clone https://gitlab.ecs.vuw.ac.nz/swen302-2017-p1-t9/Museums-Aotearoa-Research-Portal.git
```

Once you have cloned your repository, you should now see a directory called `Museums-Aotearoa-Research-Portal`, then go inside the `client` directory. This is your `working directory`.
```
$ cd client
```

Generate node packages
```
$ npm install
```

Once completed, you will see `node_module` folder generated in the `client` directory. Please **DO NOT** commit this folder into gitlab.

Build the project
```
$ npm run
```
Wait until the project is successfully built and server is started. You will find `dist` folder is created, and this is where the deployed scripts are. Please **DO NOT** commit this folder into gitlab.

Navigate to `http://localhost:8080`. The app will automatically reload if you change any of the source file.

You can configure the default HTTP port in below script in `package.json` file.
```
"start": "webpack-dev-server --inline --progress --port 8080"
```
