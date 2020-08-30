import React from 'react';
import PropTypes from 'prop-types';
import './Tracker.css';

class Tracker extends React.Component {
    render() {
        let results = [];
        for (let i = 0; i < this.props.questionCount; i++) {
            if (i >= this.props.runningResults.length) {
                // Append default (unanswered, inactive) item state
                results.push({
                    number: i + 1,
                    isActive: i + 1 === this.props.currNumber,
                    wasAnswered: false
                });
            } else {
                // Append given running item state
                const wasAnswered = i + 1 < this.props.currNumber || 
                    (i + 1 === this.props.currNumber && this.props.currWasAnswered);
                results.push({
                    number: i + 1,
                    isActive: i + 1 === this.props.currNumber,
                    wasAnswered: wasAnswered,
                    wasCorrect: this.props.runningResults[i]
                });
            }
        }

        return (
            <aside className="Tracker">
                {results.map(itemProps => <TrackerItem {...itemProps} />)}
            </aside>
        );
    }
}

Tracker.propTypes = {
    currNumber: PropTypes.number.isRequired,
    runningResults: PropTypes.arrayOf(Boolean).isRequired,
    questionCount: PropTypes.number.isRequired,
    currWasAnswered: PropTypes.bool.isRequired
};

const TrackerItem = props => {
    let classExpr = "Tracker__Item";
    if (props.isActive && !props.wasAnswered) classExpr += " Tracker__Item--Active";
    else if(props.wasAnswered && props.wasCorrect) classExpr += " Tracker__Item--Correct";
    else if(props.wasAnswered && !props.wasCorrect) classExpr += " Tracker__Item--Incorrect";
    else classExpr += " Tracker__Item--Unvisited";

    return (
        <div className={classExpr}>
            <p>Q{props.number}</p>
            {props.isActive && <div className="Tracker__Tab"></div>}
        </div>
    );
};

TrackerItem.propTypes = {
    number: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    wasAnswered: PropTypes.bool.isRequired,
    wasCorrect: PropTypes.bool
}

export default Tracker;
