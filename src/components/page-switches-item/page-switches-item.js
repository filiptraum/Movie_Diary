import React from 'react';
import {Link} from "react-router-dom";

import './page-switches-item.scss';

const PageSwitchesItem = ({text, active, onSwitch, keyValue}) => {
    return (
        <Link
            to = {`/${keyValue}`}
            className = {active ? 'item active' : 'item'}
            onClick = {() => { onSwitch('page', keyValue) }}
        >{text}</Link>
    )
}

export default PageSwitchesItem;