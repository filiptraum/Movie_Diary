import React from 'react';

import PageSwitches from '../page-switches/page-switches';

import './header.scss';

const Header = ({page, onSwitch}) => {
    return (
        <header className = 'header'>
            <div className = 'container'>
                <div className = 'content'>
                    <h1>Movie Diary</h1>

                    <PageSwitches 
                        page = {page}
                        onSwitch = {onSwitch}
                    />
                </div>
            </div>
        </header>
    )
}

export default Header;