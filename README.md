# Software Engineering Project

Web app that extracts text from an image/pdf.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software.
* [Node.js and NPM](https://www.npmjs.com/get-npm) - The JS run time environment.

### Installing

#### 1. Open the directory you want to work in and clone the source.
```Shell
git clone https://github.com/BrandonRush/Project.git
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
* [Tesseract.js](https://github.com/naptha/tesseract.js)
* Webpack

## Contributing

### Versioning

* [git](https://git-scm.com/downloads) - Git source control.

Clone the source with:
```Shell
git clone https://github.com/BrandonRush/Project.git
```
Create a new branch to work in locally, and send a pull request to me to merge with your work. 

## Todo

* Implement PWA features.
* Implement local storage to save previous runs.
* Implement PDF conversion.
* Implement or remove language checkboxes.
* Implement security features.
* Allow URL links to images.
* Set size limits for uploads.
* Create drag and drop region for file
* Clean up and improve CSS.
* Allow user to crop image before submitting. 
* Think of better name.
* ...

## Authors

* **Brandon** - *Programming*
* ...

## Notes
* Right now the language checkboxes don't do anything.
* The tesseract.js library loads the necessary files from a CDN. These files could be installed locally instead. 
