import React from 'react';

import MovieFiltersItem from '../movie-filters-item/movie-filters-item';
import Container from '../../hoc/container';

import './movie-filters.scss';

const MovieFilters = ({movieFilter, onSwitch}) => {
    const itemsData =  [
      {text: 'all movies', keyValue: 'all'},
      {text: 'favorite', keyValue: 'favorite'},
      {text: 'watched', keyValue: 'watched'},
      {text: 'next to watch', keyValue: 'next'}
    ];

    const items = itemsData.map(data => {
        const {text, keyValue} = data;

        return (
            <MovieFiltersItem
                key = {keyValue}
                text = {text}
                keyValue = {keyValue}
                active = {movieFilter === keyValue ? true : false}
                onSwitch = {onSwitch}
            />
        )
    });

    return (
        <Container classNames = 'movieFilters'>
            {items}
        </Container>
    )
}

export default MovieFilters;