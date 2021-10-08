import updateMovieData from './update-movie'; 

const onSwitchMovieStatus = (state, {keyValue, status}) => {
    const {moviesData, selectedMovie} = state;
    const {statuses} = selectedMovie;
    
    const statusIndex = statuses.findIndex(status => status.keyValue === keyValue);
    const updatedStatus = {...statuses[statusIndex], status};
    const updatedStatuses = updateMovieData(statuses, updatedStatus, statusIndex);
    
    const updatedMovie = {
        ...selectedMovie,
        statuses: updatedStatuses
    };

    const movieIndex = moviesData.findIndex(({linkTo}) => linkTo === updatedMovie.linkTo);

    if (keyValue !== 'delete') {
        return {
            moviesData: updateMovieData(moviesData, updatedMovie, movieIndex),
            selectedMovie: updatedMovie
        } 
    }else {
        return {
            moviesData: updateMovieData(moviesData, null, movieIndex),
            page: '',
            selectedMovie: {linkTo: null}
        }
    } 
}

export default onSwitchMovieStatus;