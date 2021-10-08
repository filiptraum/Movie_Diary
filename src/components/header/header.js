import React from 'react';

import PageSwitches from '../page-switches/page-switches';

import './header.scss';

const Header = () => {
    return (
        <header className = 'header'>
            <div className = 'container'>
                <div className = 'content'>
                    <h1>Movie Diary</h1>

                    <PageSwitches/>
                </div>
            </div>
        </header>
    )
}

export default Header;