import React from 'react';

import MovieStatusSwitches from '../movie-status-switches/movie-status-switches';
import Container from '../../hoc/container';

import './movie-details.scss';

const MovieDetails = ({movieData, statuses, onSwitchMovieStatus}) => {
    const {Poster, linkTo} = movieData;

    let keys = [
        'Title',
        'Released',
        'Genre',
        'Runtime',
        'Actors',
        'Director',
        'Production',
        'Country'
    ];

    let rightContent = [];

    for (let index = 0; index < keys.length; index++) {
        rightContent.push(
            <div
            key = {keys[index] + movieData[keys[index]]}
            className = 'box'>
                <b>{keys[index]}: </b>
                <p>{movieData[keys[index]]};</p>
            </div>
        );
    }

    const content = (
        <div className = 'info'>
            <div className = 'left'>
                <img src = {Poster} alt = 'poster' width = '300' height = '430'/>
            </div>
            <div className = 'right'>
                {rightContent}
            </div>
        </div>
    );

    return (
        <Container classNames = 'movieDetails'>
            {content}
                    
            <MovieStatusSwitches
                linkTo = {linkTo}
                statuses = {statuses}
                onSwitchMovieStatus = {onSwitchMovieStatus}
            />
        </Container>
    );
}

export default MovieDetails;