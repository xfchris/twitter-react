import React, { useState, useEffect } from 'react'
import { Spinner, Button } from 'react-bootstrap'
import './Home.scss'
import BasicLayout from '../../layout/BasicLayout'
import { getTweetsFollowersApi } from '../../api/tweets'
import ListTweets from '../../components/listTweets'

export default function Home() {

    const [tweets, setTweets] = useState(null)
    const [page, setPage] = useState(1)
    const [loadingTweets, setLoadingTweets] = useState(false)

    useEffect(() => {
        getTweetsFollowersApi(page)
            .then(res => {

                if (!tweets && res) {
                    setTweets(formatModel(res))
                } else {
                    if (!res) {
                        setLoadingTweets(0)
                    } else {
                        setTweets([...tweets, ...formatModel(res)])
                        setLoadingTweets(false)
                    }
                }

            }).catch(()=>{})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const moreData = () => {
        setLoadingTweets(true)
        setPage(page + 1)

    }

    return (
        <BasicLayout className="home">
            <div className="home__title">
                <h2>Inicio</h2>
            </div>
            <ListTweets tweets={tweets} />
            <Button onClick={moreData}
                className="load-more">
                {!loadingTweets ? (
                    loadingTweets !== 0 ? "Obtener más tweets" : "No hay mas tweets"
                ) : (
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true" />
                    )}
            </Button>

        </BasicLayout>
    )
}


function formatModel(tweets) {
    const tweetsTemp = []
    tweets.forEach(obj => {
        tweetsTemp.push({
            id: obj.Tweet.id,
            mensaje: obj.Tweet.mensaje,
            fecha: obj.Tweet.fecha,
            user_id: obj.usuarioseguido_id
        })
    })
    return tweetsTemp
}