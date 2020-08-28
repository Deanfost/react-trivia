import React from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.css';

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);

        this.barRef = React.createRef();
        this.fillRef = React.createRef();
    }

    render() {
        let paddedString = String(this.props.timeRemaining).padStart(2, "0");
        return (
            <div className="ProgressBar">
            <p className="ProgressBar__Timer">0:{paddedString}</p>
                <div className="ProgressBar__Bar" ref={this.barRef}>
                    <div className="ProgressBar__Fill" ref={this.fillRef}></div>
                </div>
            </div>  
        );
    }

    componentDidUpdate(prevProps, _) {
        const barNode = this.barRef.current;
        const completion = prevProps.timeRemaining / prevProps.allotedTime;
        const newWidth = completion * barNode.getBoundingClientRect().width;
        
        const fillNode = this.fillRef.current;
        fillNode.setAttribute("style", `width: ${newWidth}`);
    }
}

ProgressBar.propTypes = {
    allotedTime: PropTypes.number.isRequired,
    timeRemaining: PropTypes.number.isRequired
};

export default ProgressBar;
