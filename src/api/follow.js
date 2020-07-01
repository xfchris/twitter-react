
import { getTokenApi } from './auth'
import { API_HOST } from '../utils/constants'

export function checkFollowApi(idUser){
    const url = API_HOST + '/consultar-seguidor?id=' + idUser

    const params = {
        headers: {
            Authorization: 'Bearer' + getTokenApi()
        }
    }

    return fetch(url, params)
        .then(Response => Response.json())
        .then(result => result)
        .catch(err => err)
}


export function followUserApi(idUser){
    const url = API_HOST + '/seguir-usuario?id=' + idUser

    const params = {
        method: "POST",
        headers: {
            Authorization: 'Bearer' + getTokenApi()
        }
    }

    return fetch(url, params)
        .then(Response => Response.json())
        .then(result => result)
        .catch(err => err)
}

export function unfollowUserApi(idUser){
    const url = API_HOST + '/borrar-seguidor?id=' + idUser

    const params = {
        method: "DELETE",
        headers: {
            Authorization: 'Bearer' + getTokenApi()
        }
    }

    return fetch(url, params)
        .then(Response => Response.json())
        .then(result => result)
        .catch(err => err)
}