import React from 'react';
import './Loader.css';

const Loader = _ => (
    <div className="Loader">
        <div className="Loader__Spinner">
            <div className="Loader__Circle"></div>
            <div className="Loader__Row">
                <div className="Loader__Circle"></div>
                <div className="Loader__Circle"></div>
            </div>
            <div className="Loader__Circle"></div>
        </div>
        <p className="Loader__Message">Loading a new game...</p>
    </div>
);

export default Loader;
