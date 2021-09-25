import React from 'react';
import {Link} from "react-router-dom";

import './movie-item.scss';

const MovieItem = ({moviesData, onCheckDetails}) => {
    const {Poster, linkTo} = moviesData;

    return (
        <Link 
            to = {`/${linkTo}`}
            className = 'movieItem'
            onClick = {() => onCheckDetails(linkTo)}
        >
            <img src = {Poster} alt = 'poster' width = '240' height = '360'/>
        </Link>
    )
}

export default MovieItem;