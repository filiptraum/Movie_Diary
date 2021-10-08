const onSwitch = (keyValue, value) => {
    return {
        type: 'ON_SWITCH',
        payload: {keyValue, value}
    }
};

const onSearchMovie = (movieAPI, searchValue) => {
    return dispatch => {
        const {transformToCorrectData} = movieAPI;

        const url = transformToCorrectData(searchValue.toLowerCase(), '+');

        movieAPI.getResource(url).then(data => {
            dispatch ({
                type: 'ON_SEARCH_MOVIE',
                payload: {data, transformToCorrectData}
            });
        });
    }
};

const onCheckDetails = linkTo => {
    return {
        type: 'ON_CHECK_DETAILS',
        payload: linkTo
    }
};

const onSwitchMovieStatus = (keyValue, status) => {
    return {
        type: 'ON_SWITCH_MOVIE_STATUS',
        payload: {keyValue, status}
    }
};

const onChangeMovieRating = (keyValue, newValue) => {
    return {
        type: 'ON_CHANGE_MOVIE_RATING',
        payload: {keyValue, newValue}
    }
};

export {
    onSwitch,
    onSearchMovie,
    onCheckDetails,
    onSwitchMovieStatus,
    onChangeMovieRating
};