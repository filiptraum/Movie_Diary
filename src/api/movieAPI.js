export default class MovieAPI {
  __urlAPI = 'https://www.omdbapi.com/?t=';
  __keyAPI = '&apikey=e11befaa';

  transformToCorrectData = (data, symb) => {
    let correctData = '';

    for (let i = 0; i < data.length; i++) {
      if (data[i] === ' ') {
        correctData += symb;
      } else if ((data[i] >= 'a' && data[i] <= 'z') || (data[i] >= 0 && data[i] <= 9)) {
        correctData += data[i];
      }
    }

    return correctData;
  }

  getResource = async url => {
    const res = await fetch(this.__urlAPI + url + this.__keyAPI);
  
    if (!res.ok) throw new Error('error')

    return await res.json()
  }
}