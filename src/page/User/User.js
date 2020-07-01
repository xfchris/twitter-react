import React, { useState, useEffect, useContext } from 'react'

import './User.scss'
import BasicLayout from '../../layout/BasicLayout'
import { Button, Spinner } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { getUserApi } from '../../api/user'
import { toast } from 'react-toastify'
import BannerAvatar from '../../components/bannerAvatar/Index'
import { AuthContext } from '../../utils/context'
import InfoUser from '../../components/user/infoUser'
import { getUserTweetsApi } from '../../api/tweets'
import ListTweets from '../../components/listTweets'

function User({ match }) {
    const [user, setUser] = useState(null)
    const [buscoUsuario, setBuscoUsuario] = useState(false)
    const [tweets, setTweets] = useState(null)
    const userLogged = (useContext(AuthContext)).user
    const [page, setPage] = useState(1)
    const [loadingTweets, setLoadingTweets] = useState(null)
    useEffect(() => {
        getUserApi(match.params.id)
            .then(response => {
                setBuscoUsuario(true)
                setUser(response)
                if (!response) {
                    toast.error("El usuario no existe")
                }
            })
            .catch(() => {
                toast.error("Error de conexion")
            })
    }, [match.params])

    useEffect(() => {
        if (match.params.id) {
            getUserTweetsApi(match.params.id, 1)
                .then(response => {
                    setTweets(response)
                })
                .catch(() => setTweets([]))
        }

    }, [match.params])

    const getMasTweets = () => {
        const pageTemp = page+1
        setLoadingTweets(true)

        getUserTweetsApi(match.params.id, pageTemp)
        .then(response => {
            if (!response){
                setLoadingTweets(0)
            }else{
                setTweets([...tweets, ...response])
                setPage(pageTemp)
                setLoadingTweets(false)
            }

        })
        .catch(err=>{
            toast.error("Error al cargar los tweets")
        })
    }

    return (
        <BasicLayout className="user">
            {!user ?
                (<>
                    {buscoUsuario ? <h2>Este usuario no existe</h2> : ''}
                </>)
                :
                (<>
                    <div className="user__title">
                        <h2>{user.nombres} {user.apellidos}</h2>
                    </div>

                    <BannerAvatar user={user} userLogged={userLogged} />

                    <InfoUser user={user} />
                    <div className="user__tweets">
                        <h3>Lista de tweets</h3>
                        {tweets && tweets.length > 0 &&
                            <ListTweets tweets={tweets} />}

                        <Button onClick={getMasTweets}>
                            {!loadingTweets ? (
                                loadingTweets !== 0 && 'Obtener mas twets'
                            ) :
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    arian-hidden="true" />
                            }
                        </Button>
                    </div>
                </>)}
        </BasicLayout>
    )
}

export default withRouter(User)