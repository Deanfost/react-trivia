import React from 'react';
import PropTypes from 'prop-types';
import './Nav.css';

const Nav = props =>
    (
    <div className="Nav">
        <p className="Nav__Title">Trivia!</p>
        <div className="Nav__Button" onClick={props.onClick}>
            <ion-icon name="refresh"></ion-icon>
        </div>
    </div>
    );

Nav.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default Nav;