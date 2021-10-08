import React from 'react';
import {Link} from "react-router-dom";

import {connect} from 'react-redux';

import {onSwitchMovieStatus, onChangeMovieRating} from '../../actions/';

import './movie-status-switches-item.scss';

const MovieStatusSwitchesItem = ({keyValue, text, status, onSwitchMovieStatus, ratings, onChangeMovieRating}) => {
    let btn = (
        <button
            className = {status ? 'item active' : 'item'}
            onClick = {() => onSwitchMovieStatus(keyValue, !status)}
        >{text}</button>
    );

    if (keyValue === 'delete') {
        btn = (
            <Link
                to = '/'
                className = 'item active delete'
                onClick = {() => onSwitchMovieStatus(keyValue, !status)}
            >{text}</Link>
        );
    }

    let ratingItem = null;

    if (keyValue !== 'delete' && keyValue !== 'watched' && status) {
        const rating = ratings[keyValue];

        ratingItem = (
            <div className = 'rating'>
                <button
                    className = {rating > 1 ? '' : 'disabled'}
                    onClick = {() => onChangeMovieRating(keyValue, (rating - 1))}
                >—</button>

                <input
                    type = 'number'
                    value = {rating}
                    onChange = {e => onChangeMovieRating(keyValue, +e.target.value)}
                />

                <button
                    className = {rating < 99 ? '' : 'disabled'}
                    onClick = {() => onChangeMovieRating(keyValue, (rating + 1))}
                >+</button>
            </div>
        );
    }

    return (
        <div className = 'box'>
            {btn}
            {ratingItem}
        </div>
    );
}

const mapDispatchToProps = {
  onSwitchMovieStatus,
  onChangeMovieRating
}

export default connect(() => ({}), mapDispatchToProps)(MovieStatusSwitchesItem);