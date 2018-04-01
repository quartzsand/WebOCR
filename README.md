# Software Engineering Project

Web app that extracts text from an image/pdf.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them.
* [Node.js and NPM](https://www.npmjs.com/get-npm) - The JS run time environment.

```

```

### Installing

#### 1. Open the directory you want to work in and clone the source.
```Shell
git clone <link to this repo>
```
#### 2. Install all dependencies listed in the package.json file (see dependencies below). You will then have a 'node_modules' folder. 
```Shell
npm install
```

## Starting the server

Run a live instance of the app in your browser. 

### Use node to start server.

Server will be started on [127.0.0.1:3300](http://localhost:3300). This host and port can be changed in server.js.
```Shell
node server.js
Server running at 127.0.0.1 on port 3300.
```

### Or with nodemon for auto-restart on changes to source.

```Shell
npm install -g nodemon
nodemon server.js
[nodemon] starting `node server.js`
Server running at 127.0.0.1 on port 3300.
```

## Building

Webpack is used to create a new bundle.js when app.js is modified. A shortcut to build is present in package.json's scripts property.
This command **must** be run whenever the source is modified! If it's not working, check to see if the directory structure was altered.

```Shell
# This will run webpack for you
npm run build  
```
## Dependencies
* Express.js
* Tesseract.js
* Webpack

## Contributing

### Versioning

* [git](https://www.npmjs.com/get-npm) - Git source control.

Clone the source with:
```Shell
git clone <repo link>
```

## Todo

* Implement PWA features.
* Implement local storage to save previous runs.
* Clean up and improve CSS.
* ...

## Authors

* **Brandon Rush** - *Programming*
