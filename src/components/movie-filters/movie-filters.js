import React from 'react';

import MovieFiltersItem from '../movie-filters-item/movie-filters-item';
import Container from '../../hoc/container';

import './movie-filters.scss';

const MovieFilters = ({movieFilter, itemsData, onSwitch}) => {
    const items = itemsData.map(data => {
        const {text, keyValue} = data;

        return (
            <MovieFiltersItem
                key = {keyValue + text}
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