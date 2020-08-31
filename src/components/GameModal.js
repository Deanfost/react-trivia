import React from 'react';
import PropTypes from 'prop-types';
import './GameModal.css';

const GameModal  = props => {
    if (props.shouldDisplayTitle) {
        return (
            <div className="GameFinished">
                <h1 className="GameFinished__Score">Trivia!</h1>
                <p className="GameFinished__Caption">General knowledge</p>
                <div className="GameFinished__Button" onClick={props.onClick}>Start game</div>
            </div>
        );
    } else {
        return (
            <div className="GameFinished">
                <p className="GameFinished__Caption">Game finished!</p>
                <h1 className="GameFinished__Score">Your score: {props.score}/{props.totalQuestions}</h1>
                <div className="GameFinished__Button" onClick={props.onClick}>Play again</div>
            </div>
        );
    }
    
};

GameModal.propTypes = {
    shouldDisplayTitle: PropTypes.bool.isRequired,
    score: PropTypes.number,
    totalQuestions: PropTypes.number,
    onClick: PropTypes.func.isRequired
};

export default GameModal;
