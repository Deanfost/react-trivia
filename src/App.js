import React from 'react';
import './App.css';
import Nav from './components/Nav';
import GamePane from './components/GamePane';
import Footer from './components/Footer';
import Loader from './components/Loader';
import GameFinished from './components/GameFinished';
import Problem from './components/Problem';

const triviaEndpoint = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy';
const questionCount = 10;

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = { pending: true, error: null };

		this.handlePlayAgain = this.handlePlayAgain.bind(this);
		this.fetchQuestions = this.fetchQuestions.bind(this);
		this.nextQuestion = this.nextQuestion.bind(this);
		this.handleEndOfGame = this.handleEndOfGame.bind(this);
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
					questionGenerator: this.questionGenerator(jsonData.results),
					finalScore: null
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

			// Parse HTML entities
			const parser = new DOMParser();
			const decodedPrompt = parser.parseFromString(questionItem["question"], "text/html")
				.documentElement.textContent;
			const decodedAnswer = parser.parseFromString(questionItem["correct_answer"], "text/html")
				.documentElement.textContent;
			const decodedIncorrectAnswers = questionItem["incorrect_answers"].map(value => {
				return parser.parseFromString(value, "text/html").documentElement.textContent;
			});
			
			// Package and send
			let nextQuestion = {
				number: i + 1,
				prompt: decodedPrompt,
				correctAnswer: decodedAnswer,
				incorrectAnswers: decodedIncorrectAnswers
			};
			yield nextQuestion;
		};
	}

	handlePlayAgain() {
		this.fetchQuestions();
	}

	nextQuestion() {
		return this.state.questionGenerator.next();
	}

	handleEndOfGame(finalScore) {
		this.setState({finalScore});
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
		if (!this.state.pending && !this.state.error && this.state.finalScore === null) {
			content = <GamePane 
					nextQuestion={this.nextQuestion} 
					questionCount={questionCount} 
					endGame={this.handleEndOfGame} 
				/>;
		} else if (!this.state.pending && !this.state.error && this.state.finalScore !== null) {
			content = <GameFinished 
					score={this.state.finalScore} 
					totalQuestions={questionCount} 
					onClick={this.handlePlayAgain} 
					/>;
			classExpr += " App--Centered";
		} else if (this.state.pending) {
			content = <Loader />;
			classExpr += " App--Centered";
		} else {
			content = <Problem issue={this.state.error} onClick={this.fetchQuestions} />;
			classExpr += " App--Centered";
		}

		return (
			<div className={classExpr}>
				<Nav onClick={this.handlePlayAgain} />
					{content}
				<Footer />
			</div>
		);
	}
}

export default App;
