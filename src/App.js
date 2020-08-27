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
        <main className="App__Flex">
          {/* <Question />
          <Tracker /> */}
        </main>
        <footer className="App__Footer">
          <a href="https://github.com/Deanfost/react-trivia">
            <ion-icon name="logo-github"></ion-icon>
            <p>View on Github</p>
          </a>
          <a href="https://ionicons.com">
            <ion-icon name="logo-github"></ion-icon>
            <p>Icons by Ionic</p>
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
