import React from 'react';

import MovieItem from '../movie-item/movie-item';
import Container from '../hoc/container';

import './search-panel.scss';

const SearchPanel = ({searchValue, onSwitch, onSearchMovie, selectedMovie, onCheckDetails, searchMessageStatus}) => {
    return (
        <Container classNames = 'searchPanel'>
            <div className = 'block'>
                <input
                    type = 'text'
                    placeholder = 'Movie name...'
                    value = {searchValue}
                    onChange = {e => { onSwitch('searchValue', e.target.value) }}
                />
                <button onClick = {onSearchMovie}>Search</button>
            </div>

            <div className = 'box'>
                {
                    (selectedMovie.linkTo !== null)
                    ? <MovieItem 
                        movieData = {selectedMovie}
                        onCheckDetails = {onCheckDetails}
                    />
                    : <p>{searchMessageStatus}</p>
                }
            </div>
        </Container>
    )
}

export default SearchPanel;