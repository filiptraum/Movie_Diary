import React from 'react';

import MovieStatusSwitchesItem from '../movie-status-switches-item/movie-status-switches-item';

import './movie-status-switches.scss';

const MovieStatusSwitches = ({statuses, ratings}) => {
    const items = statuses.map(data => {
        const {keyValue, text, status} = data;

        return (
            <MovieStatusSwitchesItem
                key = {keyValue + text}
                keyValue = {keyValue}
                text = {text}
                status = {status}
                ratings = {ratings}
            />
        )
    });

    return <div className = 'movieStatusSwitches'>{items}</div>;
}

export default MovieStatusSwitches;