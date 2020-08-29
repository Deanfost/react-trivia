import React from 'react';
import PropTypes from 'prop-types';
import './Problem.css';

const Problem = props => (
    <div className="Problem">
        <p className="Problem__Oops">Something went wrong!</p>
        <p className="Problem__Issue">{props.issue.message}</p>
        <div className="Problem__Button" onClick={props.onClick}>Try again</div>
    </div>
);

Problem.propTypes = {
    issue: PropTypes.instanceOf(Error).isRequired,
    onClick: PropTypes.func.isRequired
};

export default Problem;
