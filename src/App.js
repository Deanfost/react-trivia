import React from 'react';
import './App.css';
import Nav from './components/Nav';
import GamePane from './components/GamePane';
import Footer from './components/Footer';
import Loader from './components/Loader';
import GameModal from './components/GameModal';
import Problem from './components/Problem';

const triviaEndpoint = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy';
const questionCount = 10;

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = { dataIsPending: false, error: null, showingTitleScreen: true};

		this.handleNavClick = this.handleNavClick.bind(this);
		this.fetchQuestions = this.fetchQuestions.bind(this);
		this.nextQuestion = this.nextQuestion.bind(this);
		this.handleEndOfGame = this.handleEndOfGame.bind(this);
	}

	async fetchQuestions() {
		this.setState({ dataIsPending: true, error: null, showingTitleScreen: false});
		// Poll the new game data
		try {
			let response = await fetch(triviaEndpoint);
			if (response.ok) {
				// Parse the data, attach and init a question generator
				let jsonData = await response.json();
				this.setState({
					dataIsPending: false,
					questionGenerator: this.questionGenerator(jsonData.results),
					finalScore: null
				});
			} else {
				throw new Error(`Fetch operation failed, received error code: ${response.status}`);
			}
		} catch (error) {
			this.setState({ dataIsPending: false, error})
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

	nextQuestion() {
		return this.state.questionGenerator.next();
	}

	handleNavClick() {
		this.setState({showingTitleScreen: true});
	}

	handleEndOfGame(finalScore) {
		this.setState({finalScore});
	}	

	static getDerivedStateFromError(error) {
		this.setState({error});
	}

	render() {
		let content;
		let classExpr = "App";
		const gameIsRunning = !this.state.dataIsPending && 
			!this.state.error && this.state.finalScore === null && 
			!this.state.showingTitleScreen;
		if (this.state.showingTitleScreen) {
			// Title screen
			content = <GameModal 
					shouldDisplayTitle={true}
					onClick={this.fetchQuestions} 
					/>;
			classExpr += " App--Centered";
		} else if (this.state.dataIsPending) {
			// Loading data
			content = <Loader />;
			classExpr += " App--Centered";
		} else if (gameIsRunning) {
			// Game is running
			content = <GamePane 
					nextQuestion={this.nextQuestion} 
					questionCount={questionCount} 
					endGame={this.handleEndOfGame} 
				/>;
		} else if (!this.state.dataIsPending && !this.state.error && this.state.finalScore !== null) {
			// Game is over
			content = <GameModal 
					shouldDisplayTitle={false}
					score={this.state.finalScore} 
					totalQuestions={questionCount} 
					onClick={this.fetchQuestions} 
					/>;
			classExpr += " App--Centered";
		} else {
			// There was an issue
			content = <Problem issue={this.state.error} onClick={this.fetchQuestions} />;
			classExpr += " App--Centered";
		}

		return (
			<div className={classExpr}>
				{gameIsRunning && <Nav onClick={this.handleNavClick} />}
					{content}
				<Footer />
			</div>
		);
	}
}

export default App;
