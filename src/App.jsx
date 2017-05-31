import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

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
    this.state = data;
  }

  enterMessage = (message) => {
    console.log("Messages", this.state.messages)
    console.log("Uername", this.state.currentUser.name)
    console.log("New Message", message)
    const newMessage = {key: this.state.messages.length + 2, username: message.username, content: message.content};
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
    }

    componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {key: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
  }
  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <MessageList msgs = {this.state.messages} />
        <ChatBar user={this.state.currentUser.name} enterMessage={this.enterMessage} />

      </div>
    );
  }
}
export default App;
