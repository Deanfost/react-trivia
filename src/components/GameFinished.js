import React from 'react';
import PropTypes from 'prop-types';
import './GameFinished.css';

const GameFinished  = props => (
    <div className="GameFinished">
        <p className="GameFinished__Caption">Game finished!</p>
        <h1 className="GameFinished__Score">Your score: {props.score}/{props.totalQuestions}</h1>
        <div className="GameFinished__Button" onClick={props.onClick}>Play again</div>
    </div>
);

GameFinished.propTypes = {
    score: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default GameFinished;
