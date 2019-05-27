# Carbon Intensity

![CIUR - Data Display](images/ciur_display_view.png)

This is a front-end JavaScript web app that uses the official Carbon Intensity API for Great Britain developed by National Grid to create request of the data.

##### Built With

CIUR (Carbon Intensity in UK Regions) has been built with JavaScript as the main programming language using PubSub pattern.

## MVP

* The application should display data from an API request.
* The application should have a clear separation of concerns using a model and views.

## Extensions

* Take input from the user to update the page. You could update the page by filtering or manipulating the data on user interaction, or you might make further API request to load more data that is then displayed.

## Advance Extensions

* Looking into a library to visual the data.

HighCharts is an open-source library for rendering charts. You will need to use the library's documentation to integrate it into your application.

## Getting Started

The following steps will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Befor starting, there are a few packages that are needed to be installed. For this, we will be using npm which is a package manager for JavaScript language. First npm init and npm install the followings:

  * Webpack
  * Webpack-cli
  
### Installing

First, let's initialise npm in the project folder.

```
npm init
```

Then, let's install Webpack which is a static module bundle for modern JavaScript applications. Once it is installed, a configuration file is require.

```
npm install -D webpack webpack-cli
```

### Running

In order to make the app running, there are required to add a script to package.json.

```
"build": "webpack -w"
```

This are the commands needed to start running the application in your local machine. In your command line, copy and paste the following:

```
mongod
```

In a new tab, copy and paste this:

```
mongo < server/db/seeds.js
```

This command will seed the mongo database. Then, in a new tab, type the following:

```
npm run build
```

Finally, in a new tab, copy and paste this:

```
npm run server:dev
```

You can view the app running at port <http://localhost:3000>.
