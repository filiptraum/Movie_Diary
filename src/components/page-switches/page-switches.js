import React from 'react';

import PageSwitchesItem from '../page-switches-item/page-switches-item';

import './page-switches.scss';

const PageSwitches = ({itemsData, page, onSwitch}) => {
    const items = itemsData.map(data => {
        const {text, keyValue} = data;

        return (
            <PageSwitchesItem
                key = {keyValue + text}
                text = {text}
                active = {keyValue === page ? true : false}
                keyValue = {keyValue}
                onSwitch = {onSwitch}
            />
        )
    });

    return <div className = 'pageSwitches'>{items}</div>;
}

export default PageSwitches;