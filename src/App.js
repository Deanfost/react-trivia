import React from 'react';
import './App.css';
import Nav from './components/Nav';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleNavClick = this.handleNavClick.bind(this);
}

  /**
   * Handles <Nav /> click event.
   */
  handleNavClick() {
    console.log("hello!");
  }

  render() {
    return (
      <div className="App">
        <Nav onClick={this.handleNavClick} />
      </div>
    );
  }
}

export default App;
