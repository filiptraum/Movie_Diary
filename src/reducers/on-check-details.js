const onCheckDetails = (state, activeLinkTo) => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    const isMovieSelected = state.moviesData.find(({linkTo}) => linkTo === activeLinkTo);

    if (isMovieSelected === undefined) {
        return {
            moviesData: [
                state.selectedMovie,
                ...state.moviesData
            ],
            page: 'details'
        }
    }else {
        return {
            page: 'details',
            selectedMovie: isMovieSelected
        }
    }
}

export default onCheckDetails;