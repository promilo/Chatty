// server.js

const express = require('express');
const SocketServer = require('ws').Server;

const uuidV4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });



// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
//ws is the (client)
wss.on('connection', (ws) => {
  console.log('Client connected');



  const broadcast = (message) => {
    wss.clients.forEach((c) => {
      if(c != ws) {
        c.send(JSON.stringify(message));
      }
    });
  }

  const userChangeBroadcast = (user) => {
    wss.clients.forEach((c) => {
      if (c != ws) {
        c.send(JSON.stringify(user));
      }
    });
  }

  const incomingBroadcast = (income) => {
    wss.clients.forEach((c) => {
      if (c != ws) {
        c.send(JSON.stringify(income));
      }
    });
  }


  ws.on('message', function incoming(message) {
    console.log("input is", message);
    console.log('received: %s', JSON.parse(message));
    let theMessage = JSON.parse(message);
    switch(theMessage.type){
      case "postNotification":
      console.log(theMessage);
      const userChanged = {type: "incomingNotification", content: theMessage.content}
      console.log("userChanged: ", userChanged)
      // userChangeBroadcast(userChanged);
    default:
      theMessage.key = uuidV4();
      console.log(theMessage);
      broadcast(theMessage);
    }


  });




  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
