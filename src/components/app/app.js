import React, {Component} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";

import {connect} from 'react-redux';

import Header from '../header/header';
import MovieFilters from '../movie-filters/movie-filters';
import MovieItems from '../movie-items/movie-items';
import SearchPanel from '../search-panel/search-panel';
import MovieDetails from '../movie-details/movie-details';
import Footer from '../footer/footer';

import './app.scss';

class App extends Component {
  redirectionDone = false;

  componentDidUpdate() {
    localStorage.setItem('movieDiary', JSON.stringify(this.props));
  }

  render() {
    const {selectedMovie, page} = this.props;

    const Redirection = () => {
      this.redirectionDone = true;

      if (selectedMovie.linkTo !== null && page === 'details') {
        return <Redirect to = {`/details/${selectedMovie.linkTo}`}/>
      }else {
        return <Redirect to = {`/${page}`}/>
      }
    }

    return (
      <>
        <div className = 'app'>
          <Header/>

          {!this.redirectionDone ? <Redirection/> : null}

          <Switch>
            <Route path = "/searching">
              <SearchPanel/>
            </Route>

            <Route path = {`/details/${selectedMovie.linkTo}`}>
              <MovieDetails selectedMovie = {selectedMovie}/>
            </Route>

            <Route>
              <MovieFilters/>

              <MovieItems/>
            </Route>
          </Switch>

        </div>

        <Footer/>
      </>
    )
  }
}

const mapStateToProps = (store) => {
  return store
}

export default connect(mapStateToProps)(App);