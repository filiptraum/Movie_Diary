const onSearchMovie = (state, {data, transformToCorrectData}) => {
    const {searchValue} = state;

    if (searchValue.length > 0) {
        if (data.Response === 'True') {
            const isMovieSelected = state.moviesData.find(({Poster}) => Poster === data.Poster);

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

                const countTheActivityOfTheRating = key => {
                    return (state.moviesData.filter(({statuses}) => {
                        return statuses.find(({keyValue}) => keyValue === key).status
                    }).length + 1);
                };

                const linkTo = transformToCorrectData(Title.toLowerCase(), '_');

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
        }else {
            return {
                searchMessageStatus: 'You entered the wrong name of the movie or the movie is not in the API...',
                selectedMovie: {linkTo: null}
            };
        }
    }else {
      return {
          searchMessageStatus: 'You haven\'t entered anything!...',
          selectedMovie: {linkTo: null}
        };
    }
}

export default onSearchMovie;