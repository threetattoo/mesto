export default class Api {
    constructor({ baseUrl, token }) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
                headers: {
                    authorization: `${this._token}`
                }
            })
            .then(response => this._checkApiRequest(response))
            .catch(error => this._handleApiError(error));
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                headers: {
                    authorization: `${this._token}`
                }
            })
            .then(response => this._checkApiRequest(response))
            .catch(error => this._handleApiError(error));
    }

    changeUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: `${this._token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then(response => this._checkApiRequest(response))
            .catch(error => this._handleApiError(error));
    }

    addNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: {
                    authorization: `${this._token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(response => this._checkApiRequest(response))
            .catch(error => this._handleApiError(error));
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: `${this._token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => this._checkApiRequest(response))
            .catch(error => this._handleApiError(error));
    }

    likeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: {
                    authorization: `${this._token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => this._checkApiRequest(response))
            .catch(error => this._handleApiError(error));
    }

    dislikeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: `${this._token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => this._checkApiRequest(response))
            .catch(error => this._handleApiError(error));
    }

    changeUserAvatar(avatarUrl) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: `${this._token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: avatarUrl
                })
            })
            .then(response => this._checkApiRequest(response))
            .catch(error => this._handleApiError(error));
    }

    _checkApiRequest(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка запроса: ${response.status}`);
    }

    _handleApiError(error) {
        console.log(error);
    }
}