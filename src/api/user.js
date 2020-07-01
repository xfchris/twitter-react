import { API_HOST } from '../utils/constants'
import { getTokenApi } from './auth'


export function getUserApi(id) {
    const url = `${API_HOST}/ver-perfil?id=${id}`

    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + getTokenApi()
        }
    }

    return fetch(url, params)
        .then(response => {
            if (response.status >= 400)
                return null
            return response.json()
        })
        .then(result => {
            return result
        })
        .catch(err => {
            return err
        })
}


export function uploadBannerApi(file) {
    const url = API_HOST + '/subir-banner'

    const formData = new FormData()
    formData.append("banner", file)
    const params = {
        method: "POST",
        headers: {
            Authorization: 'Bearer' + getTokenApi()
        },
        body: formData
    }

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(result => result)
        .catch(err => err)
}


export function uploadAvatarApi(file) {
    const url = API_HOST + '/subir-avatar'

    const formData = new FormData()
    formData.append("avatar", file)
    const params = {
        method: "POST",
        headers: {
            Authorization: 'Bearer' + getTokenApi()
        },
        body: formData
    }

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(result => result)
        .catch(err => err)
}

export function updateInfoApi(data) {
    const url = API_HOST + '/editar-perfil'

    const params = {
        method: "PUT",
        headers: {
            Authorization: 'Bearer' + getTokenApi()
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params)
        .then(response => response)
        .catch(err => err)
}


export function getUsersApi(paramsUrl) { //page, type, search
    const url = API_HOST + '/leer-usuarios?' + paramsUrl

    const params = {
        headers: {
            Authorization: 'Bearer' + getTokenApi()
        }
    }

    return fetch(url, params)
        .then(response => response.json())
        .catch(err => err)
}