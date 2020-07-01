import React, { useState, useEffect } from 'react'
import { Image } from 'react-bootstrap'
import { map } from 'lodash'
import './ListTweets.scss'
import { getUserApi } from '../../api/user'
import { AVATAR_NOT_FOUND, API_HOST } from '../../utils/constants'
import moment from 'moment'
import { replaceURLWithHTMLLinks } from '../../utils/functions'

export default function ListTweets({ tweets }) {
    return (
        <div className="list-tweets">
            {map(tweets, tweet => (
                <Tweet key={tweet.id} tweet={tweet} />
            ))}
        </div>
    )
}


function Tweet({ tweet }) {
    const [userInfo, setUserInfo] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(null)

    useEffect(() => {
        getUserApi(tweet.user_id)
            .then(response => {
                setUserInfo(response)

                setAvatarUrl(
                    response?.avatar
                        ? API_HOST + '/obtener-avatar?id=' + response.id
                        : AVATAR_NOT_FOUND
                )
            })
    }, [tweet])




    return (
        <div className="tweet">
            <Image className="avatar" src={avatarUrl}
                roundedCircle />
            <div>
                <div className="name">
                    {userInfo?.nombres} {userInfo?.apellidos}
                    <span>{moment(tweet.fecha).calendar()}</span>
                </div>
                <div
                    dangerouslySetInnerHTML={{
                        __html: replaceURLWithHTMLLinks(tweet.mensaje)
                    }} />
            </div>

        </div>
    )
}