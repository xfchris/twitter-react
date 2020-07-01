import React, { useState, useEffect } from 'react'
import { Media, Image } from "react-bootstrap"
import { Link } from 'react-router-dom'

import { map, isEmpty } from 'lodash'
import { getUserApi } from '../../api/user'
import { API_HOST, AVATAR_NOT_FOUND } from '../../utils/constants'
import './ListUsers.scss'


export default function ListUsers({ users }) {

    if (isEmpty(users)) {
        return <h2>No hay resultados</h2>
    }
    return (
        <div className="list-users">
            {map(users, user => (
                <User key={user.id} user={user} />
            ))}
        </div>
    )
}


function User({ user }) {

    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        getUserApi(user.id)
            .then(res => {
                setUserInfo(res)
            })
    }, [user])

    return (
        <Media as={Link} to={'/' + user.id}
            className="list-users__user">
            <Image
                width="64"
                height="64"
                roundedCircle
                className="mr-3"
                src={
                    userInfo?.avatar
                        ? API_HOST + '/obtener-avatar?id=' + user.id
                        : AVATAR_NOT_FOUND
                }
                alt={user.nombres + ' ' + user.apellidos}
            />
            <Media.Body>
                <h5>{user.nombres} {user.apellidos} </h5>
                <p>{userInfo?.biografia}</p>
            </Media.Body>
        </Media>
    )
}


