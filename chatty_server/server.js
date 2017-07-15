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


// store users color
const users = {}


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
//ws is the (client)
let userCount = 0
wss.on('connection', (ws) => {

  const broadcastUser = (message) => {
    wss.clients.forEach(function (c) {
      c.send(JSON.stringify(message));
    });
  }
  console.log('Client connected');
  userCount += 1
  sendCount = {type: "userCount", count: userCount}
  console.log("sendCount", sendCount)
  broadcastUser(sendCount)

  const broadcast = (message) => {
    wss.clients.forEach((c) => {
      if(c != ws) {
        c.send(JSON.stringify(message));
      }
    });
  }

  const broadcastAll = (message) => {
    wss.clients.forEach((c) => {
      c.send(JSON.stringify(message));
    });
  }


  function randomColor() {
    const rand255 = () => {
      return Math.floor(Math.random() * 255);
    }
    return "rgb(" + rand255() + "," + rand255() + "," + rand255() + ")";
}
  ws.on('message', function incoming(message) {
    console.log("input is", message);
    let theMessage = JSON.parse(message);
    switch(theMessage.type){
      case "newMessage":
      console.log("newMessage", theMessage)
      if (!(users[theMessage.username])){
        theMessage.color = "black"
      } else {
      theMessage.color = users[theMessage.username]
      }

      case "postNotification":
      // Username changed
      console.log(theMessage);
      if (users[theMessage.user]){
        const userChanged = {type: "incomingNotification", content: theMessage.content, color: users[theMessage.user]}
      } else {
        const userColor = randomColor()
        users[theMessage.user] = userColor
        const userChanged = {type: "incomingNotification", content: theMessage.content, color: users[theMessage.user]}
      }

      // userChangeBroadcast(userChanged);

    default:
      theMessage.key = uuidV4();
      console.log(theMessage);
      broadcastAll(theMessage)
    }
  });
  // Set up a callback forf when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    userCount -= 1
    const lostUser = {type: "userCount", count: userCount}
    broadcastUser(lostUser);
  });
});
