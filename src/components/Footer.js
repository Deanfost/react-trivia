import React from 'react';
import './Footer.css';

const Footer = _ => (
    <footer className="Footer">
        <a href="https://github.com/Deanfost/react-trivia">
            <ion-icon name="logo-github"></ion-icon>
            <p>View on Github</p>
        </a>
        <a href="https://ionicons.com">
            <ion-icon name="logo-ionic"></ion-icon>
            <p>Icons by Ionic</p>
        </a>
    </footer>
);

export default Footer;