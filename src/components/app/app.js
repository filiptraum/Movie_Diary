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

export default class App extends Component {
  state = {
    page: JSON.parse(localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state')).page : '',

    movieFilter: 'all',

    moviesData: JSON.parse(localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state')).moviesData : [],

    searchValue: JSON.parse(localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state')).searchValue : '',
    searchMessageStatus: JSON.parse(localStorage.getItem('state'))
                         ? JSON.parse(localStorage.getItem('state')).searchMessageStatus : 'Enter the name of the movie...',
    
    selectedMovie: JSON.parse(localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state')).selectedMovie : {linkTo: null}
  }

  redirectionDone = false;

  onSwitch = (keyValue, value) => {
    this.setState(prevState => {
      if (keyValue === 'page') {
        return {
          [keyValue]: value,
          selectedMovie: {linkTo: null},
          searchValue: '',
          searchMessageStatus: 'Enter the name of the movie...'
        }
      }else if ((keyValue === 'searchValue') || (keyValue === 'movieFilter')) {
        return {
          [keyValue]: value
        }
      }else {
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
              const isMovieSelected = prevState.moviesData.find(movie => movie.Poster === data.Poster);

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

                const calcLengthByKeyFromMoviesData = key => {
                  return (this.state.moviesData.filter(item => {
                    return item.statuses.find(status => status.keyValue === key).status
                }).length + 1);
  }

                const newMovie = {
                  ...movieData,
                  linkTo,
                  ratings: {
                    favorite: calcLengthByKeyFromMoviesData('favorite'),
                    next: calcLengthByKeyFromMoviesData('next')
                  },
                  statuses: [
                    {text: 'favorite', keyValue: 'favorite', status: false},
                    {text: 'watched', keyValue: 'watched', status: false},
                    {text: 'next to watch', keyValue: 'next', status: false},
                    {text: 'delete', keyValue: 'delete', status: true}
                  ]
                };

                return {
                  selectedMovie: newMovie
                }
              }else {
                return {
                  selectedMovie: isMovieSelected
                }
              }
            });
          }else {
            this.setState({
              searchMessageStatus: 'You entered the wrong name of the movie or the movie is not in the API...'
            });
          }
        });
    }else {
      this.setState({
        searchMessageStatus: 'You haven\'t entered anything!...'
      });
    }
  }

  onCheckDetails = linkTo => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    this.setState(prevState => {
      const isMovieSelected = this.state.moviesData.find(movie => movie.linkTo === linkTo);

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

  onSwitchMovieStatus = (keyValue, status) => {
    if (keyValue !== 'delete') {
      this.setState(prevState => {
        const updatedStatuses = prevState.selectedMovie.statuses.map(statusItem => {
          if (statusItem.keyValue === keyValue) {
            return {...statusItem, status}
          }else {
            return statusItem
          }
        });

        const updatedMovie = {
          ...prevState.selectedMovie,
          statuses: [
            ...updatedStatuses
          ]
        };

        const moviesData = prevState.moviesData.map(movie => {
          if (movie.linkTo === updatedMovie.linkTo) {
            return updatedMovie
          }else {
            return movie
          }
        });

        return {
          moviesData,
          selectedMovie: updatedMovie
        }
      }); 
    }else {
      this.setState(prevState => {
        const moviesData = prevState.moviesData.map(movie => {
          if (prevState.selectedMovie.linkTo === movie.linkTo) {
            return {linkTo: ''}
          } else {
            return movie
          }
        }).filter(movie => movie.linkTo.length > 0);

        return {
          moviesData,
          page: '',
          selectedMovie: {linkTo: null}
        }
      });
    }
  }

  onChangeMovieRating = (keyValue, value) => {
    this.setState(prevState => {
      let newValue = value;

      if (value <= 0) {
        newValue = 1;
      }else if(value >= 100) {
        newValue = 99;
      }

      const updatedRating = {...prevState.selectedMovie.ratings, [keyValue]: newValue};

      const updatedMovie = {
        ...prevState.selectedMovie,
        ratings: updatedRating
      };

      const moviesData = prevState.moviesData.map(movie => {
        if (movie.linkTo === updatedMovie.linkTo) {
          return updatedMovie
        }else {
          return movie
        }
      });

      return {
        moviesData,
        selectedMovie: updatedMovie
      }
    }); 
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.movieFilter === this.state.movieFilter) {
      localStorage.setItem('state', JSON.stringify(this.state));
    }
  }

  componentDidCatch() {
    localStorage.clear();
    alert('An error has occurred. The data was cleared...');
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