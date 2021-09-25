import React from 'react';

import MovieItem from '../movie-item/movie-item';
import Container from '../../hoc/container';

import './movie-items.scss';

const MovieItems = ({moviesData, movieFilter, onCheckDetails}) => {
    const items = moviesData.map(data => {
        return (
            <MovieItem
                key = {data.Poster}
                moviesData = {data}
                onCheckDetails = {onCheckDetails}
            />
        )
    });

    let visibleItems = movieFilter === 'all' ? items : items.filter(item => {
        return item.props.moviesData.statuses.find(status => status.keyValue === movieFilter).status
    });

    if (visibleItems.length === 0) {
        visibleItems = (
            <div>
                {
                    movieFilter === 'all'
                    ? null
                    : <>
                        <p>No matching movies found.</p>
                        <p>Edit your selected films, activate '{movieFilter === 'next' ? 'next to watch' : movieFilter}'.</p>
                    </>
                }
                <p>If you have not yet selected a movie, then find them by going to the page 'Find a movie'.</p>
            </div>
        )
    }
    
    return (
        <Container classNames = 'movieItems'>
            {visibleItems}
        </Container>
    )
}

export default MovieItems;