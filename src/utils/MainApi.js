import { MY_URL, MOVIE_URL } from "../utils/constants";
class MainApi {
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

  authorizate = (email, password) => {
    return this._request(`${this.url}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    });
  };

  registrate(name, email, password) {
    return this._request(`${this.url}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name, email, password }),
    });
  };

  checkToken(jwt) {
    return this._request(`${this.url}/users/me`, {
      method: "GET",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${jwt}`,
      },
    });
  }

  getInfoAboutMe() {
    const token = localStorage.getItem('token');
    return this._request(`${this.url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  }

  updateProfileData(data) {
    const token = localStorage.getItem('token');
    return this._request(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: data.name, email: data.email }),
    });
  }

  getMovies() {
    const token = localStorage.getItem('token');
    return this._request(`${this.url}/movies`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  }

  addMovie(data) {
    const token = localStorage.getItem('token');
    return this._request(`${this.url}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co/${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `${MOVIE_URL}/${data.image.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    });
  }

  deleteMovie(id) {
    const token = localStorage.getItem('token');
    return this._request(`${this.url}/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  }
}

export const ApiConst = new MainApi({
  baseUrl: `${MY_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});
