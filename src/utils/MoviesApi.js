class MoviesApi {
  constructor(data) {
    this.url = data.baseUrl;
    this.headers = data.headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getMovies() {
    return this._request(`${this.url}`, {
      headers: this.headers,
    });
  }
}

export const MoviesApiConst = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});
