import React, {Component} from 'react';


class NavBar extends Component {
  render() {
    console.log("Rendering NavBar");
    return (
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty </a>
      {this.props.count} users online
      </nav>
    )
  }
}
export default NavBar;
