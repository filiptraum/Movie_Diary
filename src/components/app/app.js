import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import Header from '../header/header';
import MovieFilters from '../movie-filters/movie-filters';
import MovieItems from '../movie-items/movie-items';
import SearchPanel from '../search-panel/search-panel';
import MovieDetails from '../movie-details/movie-details';
import Footer from '../footer/footer';

import MovieAPI from '../../api/movieAPI';

import './app.scss';

const checkLocalStorage = keyValue => {
  return localStorage.hasOwnProperty('movieDiary') ? JSON.parse(localStorage.getItem('movieDiary'))[keyValue] : undefined;
}

export default class App extends Component {
  state = {
    page: checkLocalStorage('page') || '',

    movieFilter: 'all',

    moviesData: checkLocalStorage('moviesData') || [],

    searchValue: checkLocalStorage('searchValue') || '',
    searchMessageStatus: checkLocalStorage('searchMessageStatus') || 'Enter the name of the movie...',
    
    selectedMovie: checkLocalStorage('selectedMovie') || {linkTo: null}
  }

  redirectionDone = false;

  onSwitch = (keyValue, value) => {
    this.setState(prevState => {
      switch (keyValue) {
        case 'page':
          return {
            [keyValue]: value,
            selectedMovie: {linkTo: null},
            searchValue: '',
            searchMessageStatus: 'Enter the name of the movie...'
          }

        case 'searchValue':
        case 'movieFilter':
          return {
            [keyValue]: value
          }
      
        default:
          return prevState
      }
    });
  }

  onSearchMovie = () => {
    const {searchValue} = this.state;

    if (searchValue.length > 0) {
      const movieAPI = new MovieAPI();

      const url = movieAPI.transformToCorrectData(searchValue.toLowerCase(), '+');

      movieAPI.getResource(url)
        .then(data => {
          if (data.Response === 'True') {
            this.setState(prevState => {
              const isMovieSelected = prevState.moviesData.find(({Poster}) => Poster === data.Poster);

              if (isMovieSelected === undefined) {
                const {
                  Poster,
                  Title,
                  Released,
                  Genre,
                  Runtime,
                  Actors,
                  Director,
                  Production,
                  Country
                } = data;

                const movieData = {
                  Poster,
                  Title,
                  Released,
                  Genre,
                  Runtime,
                  Actors,
                  Director,
                  Production,
                  Country
                };

                const linkTo = movieAPI.transformToCorrectData(Title.toLowerCase(), '_');

                const countTheActivityOfTheRating = key => {
                  return (this.state.moviesData.filter(({statuses}) => {
                    return statuses.find(({keyValue}) => keyValue === key).status
                  }).length + 1);
                }

                const newMovie = {
                  ...movieData,
                  linkTo,
                  ratings: {
                    favorite: countTheActivityOfTheRating('favorite'),
                    next: countTheActivityOfTheRating('next')
                  },
                  statuses: [
                    {text: 'favorite', keyValue: 'favorite', status: false},
                    {text: 'watched', keyValue: 'watched', status: false},
                    {text: 'next to watch', keyValue: 'next', status: false},
                    {text: 'delete', keyValue: 'delete', status: true}
                  ]
                };

                return {selectedMovie: newMovie}
              }else {
                return {selectedMovie: isMovieSelected}
              }
            });
          }else {
            this.setState({
              searchMessageStatus: 'You entered the wrong name of the movie or the movie is not in the API...'
            });
          }
        });
    }else {
      this.setState({searchMessageStatus: 'You haven\'t entered anything!...'});
    }
  }

  onCheckDetails = activeLinkTo => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    this.setState(prevState => {
      const isMovieSelected = this.state.moviesData.find(({linkTo}) => linkTo === activeLinkTo);

      if (isMovieSelected === undefined) {
          return {
            moviesData: [
              prevState.selectedMovie,
              ...prevState.moviesData
            ],
            page: 'details'
          }
      }else {
        return {
          page: 'details',
          selectedMovie: isMovieSelected
        }
      }
    });
  }

  updateMovieData = (state, item, index) => {
    if (item === null) {
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]
    }

    return [
      ...state.slice(0, index),
      item,
      ...state.slice(index + 1)
    ]
  }

  onSwitchMovieStatus = (keyValue, status) => {
    this.setState(prevState => {
      const {moviesData, selectedMovie} = prevState;
      const {statuses} = selectedMovie;
      
      const statusIndex = statuses.findIndex(status => status.keyValue === keyValue);
      const updatedStatus = {...statuses[statusIndex], status};
      const updatedStatuses = this.updateMovieData(statuses, updatedStatus, statusIndex);
      
      const updatedMovie = {
        ...selectedMovie,
        statuses: updatedStatuses
      };

      const movieIndex = moviesData.findIndex(({linkTo}) => linkTo === updatedMovie.linkTo);

      if (keyValue !== 'delete') {
        return {
          moviesData: this.updateMovieData(moviesData, updatedMovie, movieIndex),
          selectedMovie: updatedMovie
        } 
      }else {
        return {
          moviesData: this.updateMovieData(moviesData, null, movieIndex),
          page: '',
          selectedMovie: {linkTo: null}
        }
      }
    }); 
  }

  onChangeMovieRating = (keyValue, newValue) => {
    this.setState(prevState => {
      let value = newValue;

      if (newValue <= 0) {
        value = 1;
      }else if(newValue >= 100) {
        value = 99;
      }

      const {moviesData, selectedMovie} = prevState;

      const updatedRatings = {...selectedMovie.ratings, [keyValue]: value};

      const updatedMovie = {
        ...selectedMovie,
        ratings: updatedRatings
      };

      const movieIndex = moviesData.findIndex(({linkTo}) => linkTo === updatedMovie.linkTo);

      return {
        moviesData: this.updateMovieData(moviesData, updatedMovie, movieIndex),
        selectedMovie: updatedMovie
      }
    }); 
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.movieFilter === this.state.movieFilter) {
      localStorage.setItem('movieDiary', JSON.stringify(this.state));
    }
  }

  render() {
    const {
      page,
      movieFilter,
      moviesData,
      searchValue,
      searchMessageStatus,
      selectedMovie
    } = this.state;

    const Redirection = () => {
      this.redirectionDone = true;

      if (selectedMovie.linkTo !== null && page === 'details') {
        return <Redirect to = {`/details/${selectedMovie.linkTo}`}/>
      }else {
        return <Redirect to = {`/${page}`}/>
      }
    }

    return (
      <Router>
        <div className = 'app'>
          <Header 
            page = {page}
            onSwitch = {this.onSwitch}
          />

          {!this.redirectionDone ? <Redirection/> : null}

          <Switch>
            <Route path = "/searching">
              <SearchPanel
                searchValue = {searchValue}
                searchMessageStatus = {searchMessageStatus}
                onSwitch = {this.onSwitch}
                onSearchMovie = {this.onSearchMovie}
                selectedMovie = {selectedMovie}
                onCheckDetails = {this.onCheckDetails}
              />
            </Route>
            <Route path = {`/details/${selectedMovie.linkTo}`}>
              <MovieDetails 
                movieData = {selectedMovie}
                onSwitchMovieStatus = {this.onSwitchMovieStatus}
                onChangeMovieRating = {this.onChangeMovieRating}
              />
            </Route>
            <Route>
              <MovieFilters
                movieFilter = {movieFilter}
                onSwitch = {this.onSwitch}
              />

              <MovieItems
                moviesData = {moviesData}
                movieFilter = {movieFilter}
                onCheckDetails = {this.onCheckDetails}
              />
            </Route>
          </Switch>
        </div>

        <Footer/>
      </Router>
    );
  }
}