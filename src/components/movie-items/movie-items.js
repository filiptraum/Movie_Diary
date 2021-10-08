import React from 'react';

import {connect} from 'react-redux';

import {onCheckDetails} from '../../actions/';

import MovieItem from '../movie-item/movie-item';
import Container from '../hoc/container';

import './movie-items.scss';

const MovieItems = ({moviesData, movieFilter, onCheckDetails}) => {
    const items = moviesData.map(data => {
        return (
            <MovieItem
                key = {data.Poster}
                movieData = {data}
                onCheckDetails = {onCheckDetails}
            />
        )
    });

    let visibleItems = movieFilter === 'all' ? items : items.filter(item => {
        return item.props.movieData.statuses.find(status => status.keyValue === movieFilter).status
    });

    if (movieFilter === 'watched') {
        visibleItems = visibleItems.sort((a, b) => {
            const _a = +a.props.movieData.Released.slice(-4);
            const _b = +b.props.movieData.Released.slice(-4);

            if (_a < _b) {
                return 1;
            }else {
                return -1;
            }
        });
    }else if(movieFilter === 'favorite' || movieFilter === 'next') {
        visibleItems.sort((a, b) => {
            const _a = +a.props.movieData.ratings[movieFilter];
            const _b = +b.props.movieData.ratings[movieFilter];

            if (_a < _b) {
                return -1;
            }else {
                return 1;
            }
        });
    }

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

const mapStateToProps = ({moviesData, movieFilter}) => {
  return {
    moviesData,
    movieFilter
  }
}

const mapDispatchToProps = {
  onCheckDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieItems);