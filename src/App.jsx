import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

const data = {
    currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [
    {
      key: "1",
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      key: "2",
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {currentUser: {name: "Bob"},
      messages: [],
      count : 0
    };
  }

  _enterMessage = (message) => {
    console.log("Messages", this.state.messages)
    console.log("Uername", this.state.currentUser.name)
    console.log("New Message", message)
    this.state.currentUser.name = message.username
    const newMessage = {username: message.username, content: message.content};
    this.socket.send(JSON.stringify(newMessage))
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
    }


  _enterUser = (userA, userB) => {
    console.log("userA", userA);
    console.log("userB", userB);
    const userChanged = {type: "postNotification", content: `${userA} has changed their name to ${userB}`}
    this.socket.send(JSON.stringify(userChanged))
    const userShow = {content: userChanged.content}
    const total = this.state.messages.concat(userShow);
    this.setState({ currentUser: {name : userB}, messages: total})
  }


    componentDidMount() {
      console.log("ComponentDidMount ran")

      this.socket = new WebSocket("ws://localhost:3001")



      this.socket.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        console.log("this.socket.onmessage", newMessage);
        // code to handle incoming message

        const data = JSON.parse(event.data);
        switch(data.type) {
          case "incomingMessage":
          // handle incoming message
          // const income = data
          // console.log("incoming message", income);
          // const incomTotal = this.state.messages.concat(income);
          // this.setState({messages:newTotal});


          break;
          case "incomingNotification":
          // handle incoming notification
          const displayUserChanged = data
          console.log("incomingNotification", displayUserChanged);
          this.state.messages.push(displayUserChanged)
          // this.setState({messages: newTotal})



          break;
          case "userCount":
          console.log("userCount function is sent");
          this.setState({count: data.count})

          default:

          this.state.messages.push(data)

          this.setState({messages: this.state.messages})
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
        }

        // this.state.messages.push(newMessage)
        //
        // this.setState({messages: this.state.messages})

        //this.setState(state => { state.messages.push(newMessage)}


        console.log("this.state.messages", this.state.messages)
      }


  }
  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <NavBar count = {this.state.count} />
        <MessageList msgs = {this.state.messages} />
        <ChatBar user={this.state.currentUser.name} enterMessage={this._enterMessage} enterUser={this._enterUser} />

      </div>
    );
  }
}
export default App;
