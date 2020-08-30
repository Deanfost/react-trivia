import React from 'react';
import './App.css';
import Nav from './components/Nav';
import GamePane from './components/GamePane';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Problem from './components/Problem';

const triviaEndpoint = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy';
const questionCount = 10;

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = { pending: true, error: null };

		this.handleNavClick = this.handleNavClick.bind(this);
		this.fetchQuestions = this.fetchQuestions.bind(this);
		this.nextQuestion = this.nextQuestion.bind(this);
	}

	async fetchQuestions() {
		this.setState({ pending: true, error: null });
		// Poll the new game data
		try {
			let response = await fetch(triviaEndpoint);
			if (response.ok) {
				// Parse the data, attach and init a question generator
				let jsonData = await response.json();
				this.setState({
					pending: false,
					questionGenerator: this.questionGenerator(jsonData.results)
				});
			} else {
				throw new Error(`Fetch operation failed, received error code: ${response.status}`);
			}
		} catch (error) {
			this.setState({ pending: false, error})
		}
	}

	* questionGenerator(gameData) {
		for (let i = 0; i < gameData.length; i++) {
			let questionItem = gameData[i];
			let nextQuestion = {
				number: i + 1,
				prompt: questionItem.question,
				correctAnswer: questionItem["correct_answer"],
				incorrectAnswers: questionItem["incorrect_answers"]
			};
			yield nextQuestion;
		};
	}

	handleNavClick() {
		this.fetchQuestions();
	}

	nextQuestion() {
		return this.state.questionGenerator.next().value;
	}

	static getDerivedStateFromError(error) {
		this.setState({error});
	}

	componentDidMount() {
		this.fetchQuestions();
	}

	render() {
		let content;
		let classExpr = "App";
		if (!this.state.pending && !this.state.error) {
			content = <GamePane nextQuestion={this.nextQuestion} questionCount={questionCount} />;
		} else if (this.state.pending) {
			content = <Loader />;
			classExpr += " App--Centered";
		} else {
			content = <Problem issue={this.state.error} onClick={this.fetchQuestions} />;
			classExpr += " App--Centered";
		}

		return (
			<div className="App">
				<Nav onClick={this.handleNavClick} />
					{content}
				<Footer />
			</div>
		);
	}
}

export default App;
