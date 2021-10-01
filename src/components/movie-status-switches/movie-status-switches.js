import React from 'react';

import MovieStatusSwitchesItem from '../movie-status-switches-item/movie-status-switches-item';

import './movie-status-switches.scss';

const MovieStatusSwitches = ({statuses, onSwitchMovieStatus, ratings, onChangeMovieRating}) => {
    const items = statuses.map(data => {
        const {keyValue, text, status} = data;

        return (
            <MovieStatusSwitchesItem
                key = {keyValue + text}
                keyValue = {keyValue}
                text = {text}
                status = {status}
                onSwitchMovieStatus = {onSwitchMovieStatus}
                ratings = {ratings}
                onChangeMovieRating = {onChangeMovieRating}
            />
        )
    });

    return <div className = 'movieStatusSwitches'>{items}</div>;
}

export default MovieStatusSwitches;