# Carbon Intensity

![CIUR - Data Display](images/ciur_display_view.png)

This is a front-end JavaScript web app that uses the official Carbon Intensity API for Great Britain developed by National Grid to create request of the data.

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

## Built with
