const updateMovieData = (state, item, index) => {
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

export default updateMovieData;