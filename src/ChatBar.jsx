import React, {Component} from 'react';


// const defaultState = {
//   username: ,
//   content: ''
// }


class ChatBar extends Component {
  constructor(props){
    super(props);
    console.log(this.props)
    this.state = {username: this.props.user, content: ""};
  }


  render() {
    console.log("Rendering ChatBar");
     // Getting the username from the currentUser from app.jsx
    return (
      <div>
        <footer className="chatbar">
          <input className="chatbar-username" placeholder={this.props.user} onChange = {this._usernameChange} onKeyPress = {this._onUserEnter}/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange = {this._contentChange} onKeyPress={this._onContentEnter}/>
        </footer>

      </div>
    );
  }
  _usernameChange = (e) => {
    console.log("usernamefunction is called")
    this.setState({username: e.target.value})
  }

  _contentChange = (e) => {
    console.log("contentchange is called")
    this.setState({content: e.target.value})
  }

  _onUserEnter = (e) => {
    if (e.key === 'Enter') {
      console.log("on User Enter is pressed");
      this.props.enterUser(this.props.user, this.state.username)
    }
  }

  _onContentEnter = (e) => {
     if (e.key === 'Enter') {
       console.log("Entered was pressed.")
       this.props.enterMessage(this.state)
       this.setState({content: ""});
     }
  }





}
export default ChatBar;
