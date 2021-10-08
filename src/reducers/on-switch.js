const onSwitch = (state, action) => {
    const {keyValue, value} = action.payload;

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
            return state
    }
};

export default onSwitch;