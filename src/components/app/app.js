import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

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
    pageSwitchesItemsData: [
      {text: 'main page', keyValue: ''},
      {text: 'find a movie', keyValue: 'searching'}
    ],
    page: JSON.parse(localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state')).page : '',

    movieFiltersItemsData: [
      {text: 'all movies', keyValue: 'all'},
      {text: 'favorite', keyValue: 'favorite'},
      {text: 'watched', keyValue: 'watched'},
      {text: 'next to watch', keyValue: 'next'}
    ],
    movieFilter: 'all',

    moviesData: JSON.parse(localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state')).moviesData : [],

    searchValue: JSON.parse(localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state')).searchValue : '',
    searchMessageStatus: JSON.parse(localStorage.getItem('state'))
                         ? JSON.parse(localStorage.getItem('state')).searchMessageStatus : 'Enter the name of the movie...',
    
    selectedMovie: JSON.parse(localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state')).selectedMovie : {linkTo: ''}
  }

  onSwitch = (keyValue, value) => {
    this.setState({
      [keyValue]: value,
      selectedMovie: {linkTo: ''},
      searchValue: '',
      searchMessageStatus: 'Enter the name of the movie...'
    });
  }

  onChangeValue = e => {
    this.setState({searchValue: e.target.value})
  }

  onSearchMovie = () => {
    const {searchValue} = this.state;

    if (searchValue.length > 0) {
      const movieAPI = new MovieAPI();

      const url = movieAPI.__transformToCorrectData(searchValue.toLowerCase(), '+');
      const linkTo = movieAPI.__transformToCorrectData(searchValue.toLowerCase(), '_');

      movieAPI.getResource(url)
        .then(movie => {
          if (movie.Response === 'True') {
            this.setState(prevState => {
              const newMovie = {
                ...movie,
                linkTo,
                statuses: [
                  {text: 'favorite', keyValue: 'favorite', status: false},
                  {text: 'watched', keyValue: 'watched', status: false},
                  {text: 'next to watch', keyValue: 'next', status: false},
                  {text: 'delete', keyValue: 'delete', status: true}
                ]
              };

              const isMovieSelected = prevState.moviesData.find(movie => movie.Poster === newMovie.Poster);

              if (isMovieSelected === undefined) {
                 return {
                   moviesData: [
                     ...prevState.moviesData,
                     newMovie
                   ],
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
              selectedMovie: {linkTo: ''},
              searchMessageStatus: 'You entered the wrong name of the film or the film is not in the API...'
            });
          }
        });
    }else {
      this.setState({
        selectedMovie: {linkTo: ''},
        searchMessageStatus: 'You haven\'t entered anything!...'
      });
    }
  }

  onCheckDetails = (linkTo) => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    const selectedMovie = this.state.moviesData.find(movie => movie.linkTo === linkTo)
    
    this.setState({
      page: 'details',
      selectedMovie
    });
  }

  onSwitchMovieStatus = (keyValue, status) => {
    if (keyValue !== 'delete') {
      this.setState(prevState => {
        const updatedStatus = prevState.selectedMovie.statuses.map(statusItem => {
          if (statusItem.keyValue === keyValue) {
            return {...statusItem, status}
          }else {
            return statusItem
          }
        });

        const updatedMovie = {
          ...prevState.selectedMovie,
          statuses: [
            ...updatedStatus
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
          selectedMovie: {linkTo: ''},
          page: ''
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.movieFilter === this.state.movieFilter) {
      localStorage.setItem('state', JSON.stringify(this.state));
    }
  }

  render() {
    const {
      pageSwitchesItemsData,
      page,
      movieFilter,
      movieFiltersItemsData,
      moviesData,
      searchValue,
      searchMessageStatus,
      selectedMovie
    } = this.state;

    return (
      <Router>
        <div className = 'app'>
          <Header 
            page = {page}
            itemsData = {pageSwitchesItemsData}
            onSwitch = {this.onSwitch}
          />

          <Switch>
            <Route path="/searching">
              <SearchPanel
                searchValue = {searchValue}
                searchMessageStatus = {searchMessageStatus}
                onChangeValue = {this.onChangeValue}
                onSearchMovie = {this.onSearchMovie}
                selectedMovie = {selectedMovie}
                onCheckDetails = {this.onCheckDetails}
              />
            </Route>
            <Route path = {`/${selectedMovie.linkTo}`}>
              {
                (selectedMovie.linkTo.length > 0)
                ? <MovieDetails 
                    movieData = {selectedMovie}
                    statuses = {selectedMovie.statuses}
                    onSwitchMovieStatus = {this.onSwitchMovieStatus}
                  />
                : <>
                    <MovieFilters
                      movieFilter = {movieFilter}
                      itemsData = {movieFiltersItemsData}
                      onSwitch = {this.onSwitch}
                    />

                    <MovieItems
                      moviesData = {moviesData}
                      movieFilter = {movieFilter}
                      onCheckDetails = {this.onCheckDetails}
                    />
                  </>
              }
            </Route>
          </Switch>
        </div>

        <Footer/>
      </Router>
    );
  }
}