import React from 'react';
import PropTypes from 'prop-types';
import './Question.css';

class Question extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div></div>
        );
    }
}

Question.propTypes = {
    question: PropTypes.object.isRequired
};

export default Question;