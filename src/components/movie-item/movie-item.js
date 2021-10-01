import React from 'react';
import {Link} from "react-router-dom";

import './movie-item.scss';

const MovieItem = ({movieData, onCheckDetails}) => {
    const {Poster, linkTo} = movieData;

    return (
        <Link 
            to = {`/details/${linkTo}`}
            className = 'movieItem'
            onClick = {() => onCheckDetails(linkTo)}
        >
            <img src = {Poster} alt = 'poster' width = '240' height = '360'/>
        </Link>
    )
}

export default MovieItem;