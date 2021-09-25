import React from 'react';
import {Link} from "react-router-dom";

import './movie-status-switches-item.scss';

const MovieStatusSwitchesItem = ({keyValue, text, status, linkTo, onSwitchMovieStatus}) => {
    let classNames = status ? 'item active' : 'item';
    classNames = keyValue === 'delete' ? classNames + ' delete' : classNames;

    return (
        <Link
            to = {`/${keyValue === 'delete' ? '' : linkTo}`}
            className = {classNames}
            onClick = {() => onSwitchMovieStatus(keyValue, !status)}
        >{text}</Link>
    );
}

export default MovieStatusSwitchesItem;