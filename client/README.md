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
$ npm start
```
Wait until the project is successfully built and server is started. You should see something similar to:
```
[at-loader] Ok, 1.566 sec.
chunk    {0} vendor.js (vendor) 2.81 MB {2} [initial] [rendered]
chunk    {1} app.js (app) 228 kB {0} [initial] [rendered]
chunk    {2} polyfills.js (polyfills) 605 kB [entry] [rendered]
Child html-webpack-plugin for "index.html":
    chunk    {0} index.html 1 kB [entry] [rendered]
webpack: Compiled successfully.
```

You will find `dist` folder is created, and this is where the compiled scripts are. Please **DO NOT** commit this folder into gitlab.

Navigate to `http://localhost:9090`. The app will automatically reload if you change any of the source file.

You can configure the default HTTP port in below script in `package.json` file.
```
"start": "webpack-dev-server --inline --progress --port 9090"
```

Note: you need to run `npm install` again if you change `package.json` file.
