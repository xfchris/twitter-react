import React, { useContext, useState } from 'react'
import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'

import LogoWhiteTwittor from "../../assets/png/logow.png";
//import LogoTwittor from "../../assets/png/logo.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faUsers,
    faUser,
    faPowerOff
} from '@fortawesome/free-solid-svg-icons'

import './LeftMenu.scss'
import { logoutApi } from '../../api/auth';

import { AuthContext } from '../../utils/context';
import TweetModal from '../modal/tweetModal/TweetModal';

export default function LeftMenu() {
    const context = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false)
    const logout = () => {
        logoutApi()
        context.setRefreshCheckLogin(true)
    }

    return (

        <div className="left-menu">
            <img className="logo" src={LogoWhiteTwittor} alt="twittor" />

            <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Inicio
            </Link>
            <Link to="/users">
                <FontAwesomeIcon icon={faUsers} /> Usuarios
            </Link>
            <Link to={'/'+context.user?._id}>
                
                <FontAwesomeIcon icon={faUser} /> Perfil
            </Link>
            <Link to="" onClick={logout}>
                <FontAwesomeIcon icon={faPowerOff} /> Cerrar sesión
            </Link>

            <Button variant="primary"
            onClick={() => setShowModal(true)}>
                Twittear
            </Button>

            <TweetModal
            show={showModal}
            setShow={setShowModal} />
        </div>
    )
}
