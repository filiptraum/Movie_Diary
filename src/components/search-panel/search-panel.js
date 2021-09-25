import React from 'react';

import MovieItem from '../movie-item/movie-item';
import Container from '../../hoc/container';

import './search-panel.scss';

const SearchPanel = ({searchValue, onChangeValue, onSearchMovie, selectedMovie, onCheckDetails, searchMessageStatus}) => {
    return (
        <Container classNames = 'searchPanel'>
            <div className = 'block'>
                <input
                    type = 'text'
                    placeholder = 'Movie name...'
                    value = {searchValue}
                    onChange = {onChangeValue}
                />
                <button onClick = {onSearchMovie}>Search</button>
            </div>

            <div className = 'box'>
                {
                    (selectedMovie.linkTo.length > 0)
                    ? <MovieItem 
                        moviesData = {selectedMovie}
                        onCheckDetails = {onCheckDetails}
                    />
                    : <p>{searchMessageStatus}</p>
                }
            </div>
        </Container>
    )
}

export default SearchPanel;