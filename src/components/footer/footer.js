import React from 'react';

import './footer.scss';

const Footer = () => {
    return (
        <footer className = 'footer'>
          <div className = 'container'>
            <a href = 'http://www.omdbapi.com/' target = '_blank' rel = 'noreferrer'>API: http://www.omdbapi.com/</a>
          </div>
        </footer>
    )
}

export default Footer;