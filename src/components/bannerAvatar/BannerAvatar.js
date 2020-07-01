import React, { useState, useEffect } from 'react'
import { API_HOST, AVATAR_NOT_FOUND } from '../../utils/constants'
import "./BannerAvatar.scss"
import { Button } from 'react-bootstrap'
import ConfigModal from '../modal/configModal'
import EditUserForm from '../user/editUserForm/EditUserForm'
import { checkFollowApi, followUserApi, unfollowUserApi } from '../../api/follow'


export default function BannerAvatar({ user, userLogged }) {

    const [showModal, setShowModal] = useState(false)
    const [following, setFollowing] = useState(null)
    const [reloadFollow, setReloadFollow] = useState(false)
    const bannerURL = user?.banner ? API_HOST + "/obtener-banner?id=" + user.id : null
    const avatarURL = user?.avatar ? API_HOST + "/obtener-avatar?id=" + user.id : AVATAR_NOT_FOUND


    useEffect(() => {
        checkFollowApi(user?.id)
            .then(response => {
                if (response?.status) {
                    setFollowing(response.status)
                } else {
                    setFollowing(false)
                }
            })
        setReloadFollow(false)
    }, [user, reloadFollow])


    const onFollow = () => {
        followUserApi(user.id).then(() => {
            setReloadFollow(true)
        })
    }

    const onUnFollow = () => {
        unfollowUserApi(user.id).then(() => {
            setReloadFollow(true)
        })
    }



    return (
        <div className="banner-avatar"
            style={{ backgroundImage: 'url(' + bannerURL + ')' }}>
            <div className="avatar"
                style={{ backgroundImage: 'url(' + avatarURL + ')' }}
            />
            <div className="options">
                {user && user.id === userLogged._id && (
                    <Button onClick={() => setShowModal(true)}>Editar perfil</Button>
                )}

                {user && user.id !== userLogged._id && (
                    following !== null && (
                        (following ?
                            <Button onClick={onUnFollow} className="unfollow">
                                <span>Siguiendo</span>
                            </Button> :
                            <Button onClick={onFollow}>Seguir</Button>)
                    )
                )}
            </div>

            <ConfigModal
                show={showModal}
                setShow={setShowModal}
                title="Editar Perfil"
            >

                <EditUserForm user={user} setShowModal={setShowModal} />
            </ConfigModal>
        </div>
    )
}
