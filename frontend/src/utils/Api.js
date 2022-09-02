class Api {
    constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getUserInfo() {
      return fetch(this._url + '/users/me', {
        credentials: 'include',
        method: 'GET',
        headers: this._headers
      })
        .then(this._checkResponse)
        .then((user) => user.data)
    }
  
    getInitialCards() {
      return fetch(this._url + '/cards', {
        credentials: 'include',
        method: 'GET',
        headers: this._headers
      })
      .then(this._checkResponse)
      .then((cards) => cards.data)
    }
  
    sendUserInfo(userData) {
      return fetch(this._url + '/users/me', {
        credentials: 'include',
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: userData.name,
          about: userData.about
        })
      })
      .then(this._checkResponse)
      .then((user) => user.data)
    }
  
    addUserCard(data) {
      return fetch(this._url + '/cards', {
        credentials: 'include',
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(this._checkResponse)
      .then((card) => {
        return card})
    }

    changeLikeCardStatus(id, isLiked) {
      return fetch(this._url + `/cards/likes/${id}`, {
        credentials: 'include',
        method: `${isLiked ? 'PUT' : 'DELETE'}`,
        headers: this._headers
      })
      .then(this._checkResponse)
      .then((card) => card.data)
    }
  
    delete(id) {
      return fetch(this._url + `/cards/${id}`, {
        credentials: 'include',
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse)
    }
  
    handleUserAvatar(data) {
      return fetch(this._url + `/users/me/avatar`, {
        credentials: 'include',
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        })
      })
      .then(this._checkResponse)
      .then((user) => user.data)
    }
  
    getAllNeededData() {
      return Promise.all([this.getInitialCards(), this.getUserInfo()])
    }
  }

 export const api = new Api({
    url: "https://api.alexandergninenko.nomoredomains.sbs",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  });