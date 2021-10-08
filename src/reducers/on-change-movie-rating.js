import updateMovieData from './update-movie';

const onChangeMovieRating = (state, {keyValue, newValue}) => {
    let value = newValue;

    if (newValue <= 0) {
        value = 1;
    }else if(newValue >= 100) {
        value = 99;
    }

    const {moviesData, selectedMovie} = state;

    const updatedRatings = {...selectedMovie.ratings, [keyValue]: value};

    const updatedMovie = {
        ...selectedMovie,
        ratings: updatedRatings
    };

    const movieIndex = moviesData.findIndex(({linkTo}) => linkTo === updatedMovie.linkTo);

    return {
        moviesData: updateMovieData(moviesData, updatedMovie, movieIndex),
        selectedMovie: updatedMovie
    }
}

export default onChangeMovieRating;