import React from 'react';
import './App.css';
import Nav from './components/Nav';
import GamePane from './components/GamePane';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Problem from './components/Problem';

const triviaEndpoint = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {pending: true, error: null};

    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleQuestionAnswered = this.handleQuestionAnswered.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
}

  async fetchQuestions() {
    this.setState({pending: true, error: null});
    try {
      let response = await fetch(triviaEndpoint);
      if (response.ok) {
        let jsonData = await response.json();
        this.setState({pending: false, gameData: jsonData.results});
        console.log(this.state.gameData);
      } else {
        throw new Error(`Fetch operation failed: ${response.status}`);
      }
    } catch (e) {
      this.setState({pending: false, error: e})
      console.log(e);
    }
  }

  handleNavClick() {
    console.log('hello!');
  }

  handleQuestionAnswered(wasCorrect) {
    
  }

  * nextQuestion() {
    let index = 0;
    let nextQuestion = {};
    index++;
    yield nextQuestion;
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  render() {
    let content;
    if (!this.state.pending && !this.state.error) {
      content = <div className="App">
          <Nav onClick={this.handleNavClick} />
          <GamePane />
          <Footer />
        </div>;
    } else if (this.state.pending) {
      content = <Loader />;
    } else {
      content = <Problem issue={this.state.error} onClick={this.fetchQuestions} />;
    }

    return content;
  }
}

export default App;
