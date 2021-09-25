import React from 'react';

import './movie-filters-item.scss';

const MovieFiltersItem = ({text, active, keyValue, onSwitch}) => {
    return (
        <button
            className = {active ? 'item active' : 'item'}
            onClick = {() => {onSwitch('movieFilter', keyValue)}}
        >{text}</button>
    )
}

export default MovieFiltersItem;