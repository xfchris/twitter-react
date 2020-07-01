
import { getTokenApi } from './auth'
import { API_HOST } from '../utils/constants'

export function addTweetApi(mensaje) {
    const url = API_HOST + '/crear-tweet'

    const params = {
        method: "POST",
        headers: {
            Authorization: 'Bearer' + getTokenApi()
        },
        body: JSON.stringify({
            mensaje
        })
    }

    return fetch(url, params)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json()
            }
            return { code: 500, message: "Error del servidor" }
        })
        .then(result => {
            return { code: 200, data: result }
        })
        .catch(err => err)
}

export function getUserTweetsApi(idUser, page = 0) {
    const url = API_HOST + "/leer-tweet?id=" + idUser + "&page=" + page

    const params = {
        headers: {
            Authorization: 'Bearer' + getTokenApi()
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        // .then(res=>res)
        .catch(err => err)
}

export function getTweetsFollowersApi(page = 1) {
    const url = API_HOST + '/leer-seguidores?page=' + page
    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer' + getTokenApi()
        }
    }

    return fetch(url, params)
        .then(response => response.json())
        .catch(err => err)
}