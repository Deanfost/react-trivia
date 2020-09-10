import React from 'react';
import PropTypes from 'prop-types';
import './Tracker.css';

class Tracker extends React.Component {
    constructor(props) {
        super(props);

        this.activeItemRef = React.createRef();
        this.trackerRef = React.createRef();
    }

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
            <aside className="Tracker" ref={this.trackerRef}>
                {results.map(itemProps => {
                    return <TrackerItem {...itemProps} refProp={this.activeItemRef} />;
                })}
            </aside>
        );
    }

    componentDidUpdate() {
        // Scroll to the active tracker item
        const activeItemNode = this.activeItemRef.current;
        const trackerNode = this.trackerRef.current;
        const activeItemBoundingRect = activeItemNode.getBoundingClientRect();
        const trackerBoundingRect = trackerNode.getBoundingClientRect();
        if (activeItemBoundingRect.right > trackerBoundingRect.right) {
            const scrollDiff = activeItemBoundingRect.right - trackerBoundingRect.right;
            trackerNode.scrollLeft += scrollDiff;
        }
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
        <div className={classExpr} ref={props.isActive? props.refProp : null}>
            <p>Q{props.number}</p>
            {props.isActive && <div className="Tracker__Tab"></div>}
        </div>
    );
};

TrackerItem.propTypes = {
    number: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    wasAnswered: PropTypes.bool.isRequired,
    wasCorrect: PropTypes.bool,
    refProp: PropTypes.any.isRequired
}

export default Tracker;
