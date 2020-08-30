import React from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.css';

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);

        this.fillRef = React.createRef();
    }

    render() {
        const paddedString = String(Math.ceil(this.props.timeRemaining)).padStart(2, "0");
        let timerClassExpr = "ProgressBar__Timer";
        if (this.props.timeRemaining <= 0) timerClassExpr += " ProgressBar__Timer--End";
        return (
            <div className="ProgressBar">
                <p className={timerClassExpr}>0:{paddedString}</p>
                <div className="ProgressBar__Bar">
                    <div className="ProgressBar__Fill" ref={this.fillRef}></div>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        const fillNode = this.fillRef.current;
        let completion = (this.props.allotedTime - this.props.timeRemaining) / this.props.allotedTime;
        completion *= 100;
        completion = completion.toFixed(3);
        fillNode.setAttribute("style", `width: ${completion}%`);
    }
}

ProgressBar.propTypes = {
    allotedTime: PropTypes.number.isRequired,
    timeRemaining: PropTypes.number.isRequired
};

export default ProgressBar;
