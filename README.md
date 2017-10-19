## Running the admin tool locally

These intructions are for running the admin tool locally on your machine so you can test changes rapidly.

### Prerequisities

Make sure that you have node.js and npm installed on your machine (npm is automatically installed with node.js). Your node.js should be **6.3.1** or higher, and npm should be **3.10.3** or higher.

### Install dependencies

Run the following command to install all the necessary dependencies:

```
sudo npm install
```

Dependencies are read from package.json, then installed into a node_modules folder. The node_modules folder is git ignored, so don't check in anything in that folder.

### Run the server

Run the following command to starting the node server:

```
node server/server.js
```

You should see the following message:

```
Node app is running on port 8080
```

Your port_number might be different. Take note of the port_number, you'll need it.

### Access the admin tool locally

Launch any web browser and use the following url to access the admin tool:

```
localhost:<port_number>
```

That's it.

## Source code structure

The source code is split into two directories:
* `client`
* `server`

### Client

The client uses the AngularJS (1.5.8) framework to render how the admin tool webpage looks:
* `client.js` creates the main AngularJS module/app
* `index.html` main template to render
* `controller` directory, controllers determine how a view behaves
* `models` directory, models encapsulate data for ease of access
* `services` directory, primarily used for http services to communicate with the server
* `views` directory, view templates determine what is rendered, each view should be attached to a controller

### Server

The server uses the Express.js (4.13.3) framework to route calls from the client to PlayFab:
* `server.js` creates the Express app
* `handlers` directory, handlers route calls to PlayFab

## Adding new users

Add new users in `users.htpasswd` in the following format:

```
<user_name>:<password>
```

## Adding a new admin tool

### Point to the right PlayFab environment

The PlayFab environment is hardcoded to production in `server.js`. Change the following values to point to your target PlayFab environment.

```
PLAYFAB_TITLE_ID
PLAYFAB_SECRET_KEY
```

### Make changes

Most admin tool additions require only client-side implementation, using existing client-server routes. Say you want to add an endorsements tool:
* Create a new `endorsementsController.js`. This file should process most of the business logic.
* Create a new `endorsementsView.html`. This file determines how the tool should be rendered on the browser.
* Include the controller and view files in `index.html`.

If you require a new route (say, supporting a new PlayFab API call):
* Either create a new or leverage an existing service file. If you create a new service file, add it to `index.html`.
* Either create a new or leverage an existing handler file. Register the new route handler in `server.js`.

The tool uses the [PlayFab Admin API](https://api.playfab.com/Documentation/Admin).
