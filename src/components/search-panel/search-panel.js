import React from 'react';

import {connect} from 'react-redux';

import {onSwitch, onSearchMovie, onCheckDetails} from '../../actions/';

import MovieItem from '../movie-item/movie-item';
import Container from '../hoc/container';

import MovieAPI from '../../api/movieAPI';

import './search-panel.scss';

const SearchPanel = ({searchValue, onSwitch, onSearchMovie, selectedMovie, searchMessageStatus, onCheckDetails}) => {
    return (
        <Container classNames = 'searchPanel'>
            <div className = 'block'>
                <input
                    type = 'text'
                    placeholder = 'Movie name...'
                    value = {searchValue}
                    onChange = {e => onSwitch('searchValue', e.target.value)}
                />
                <button onClick = {() => onSearchMovie(new MovieAPI(), searchValue)}>Search</button>
            </div>

            <div className = 'box'>
                {
                    (selectedMovie.linkTo !== null)
                    ? <MovieItem movieData = {selectedMovie} onCheckDetails = {onCheckDetails}/>
                    : <p>{searchMessageStatus}</p>
                }
            </div>
        </Container>
    )
}

const mapStateToProps = ({searchValue, selectedMovie, searchMessageStatus}) => {
  return {
    searchValue,
    selectedMovie,
    searchMessageStatus
  }
}

const mapDispatchToProps = {
  onSwitch,
  onSearchMovie,
  onCheckDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);