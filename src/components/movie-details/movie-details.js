import React from 'react';

import MovieStatusSwitches from '../movie-status-switches/movie-status-switches';
import Container from '../hoc/container';

import './movie-details.scss';

const MovieDetails = ({selectedMovie}) => {
    const {Poster, statuses, ratings} = selectedMovie;

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
            key = {keys[index] + selectedMovie[keys[index]]}
            className = 'box'>
                <b>{keys[index]}: </b>
                <p>{selectedMovie[keys[index]]};</p>
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
                statuses = {statuses}
                ratings = {ratings}
            />
        </Container>
    );
}

export default MovieDetails;