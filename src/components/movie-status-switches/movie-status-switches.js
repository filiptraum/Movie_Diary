import React from 'react';

import MovieStatusSwitchesItem from '../movie-status-switches-item/movie-status-switches-item';

import './movie-status-switches.scss';

const MovieStatusSwitches = ({statuses, linkTo, onSwitchMovieStatus}) => {
    const items = statuses.map(data => {
        const {keyValue, text, status} = data;

        return (
            <MovieStatusSwitchesItem
                key = {keyValue + text}
                linkTo = {linkTo}
                keyValue = {keyValue}
                text = {text}
                status = {status}
                onSwitchMovieStatus = {onSwitchMovieStatus}
            />
        )
    });

    return <div className = 'movieStatusSwitches'>{items}</div>;
}

export default MovieStatusSwitches;