import React, { useState, useEffect } from 'react'
import { Spinner, ButtonGroup, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import queryString from 'query-string'
import { useDebouncedCallback } from 'use-debounce'

import BasicLayout from '../../layout/BasicLayout'
import { getUsersApi } from '../../api/user'
import ListUsers from '../../components/listUsers/ListUsers'
import './Users.scss'
import { isEmpty } from 'lodash'


function Users({ location, history }) {

    const [users, setUsers] = useState(null)
    const params = useUserQuery(location)
    const [typeUsers, setTypeUsers] = useState(params.type || 'follow')
    const [txtSearch, setTxtSearch] = useState(params.search || '')
    const [btnLoading, setBtnLoading] = useState(false)



    useEffect(() => {
        getUsersApi(queryString.stringify(params))
            .then(response => {

                // eslint-disable-next-line eqeqeq
                if (params.page == 1){
                    if (isEmpty(response)) {
                        setUsers([])
                        setBtnLoading(0)

                    } else {
                        setUsers(response)
                        setBtnLoading(false)
                    }
                }else{
                    if (isEmpty(response)) {
                        setBtnLoading(0)
                    } else {
                        setUsers([...users, ...response])
                        setBtnLoading(false)
                    }
                }
                

            }).catch(
                (err) => toast.error("Error al obtener usuarios")
            )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])


    const onChangeType = type => {
        setUsers(null)
        if (type === 'new') {
            setTypeUsers('new')
        } else {
            setTypeUsers('follow')
        }

        setTxtSearch('')
        history.push({
            search: queryString.stringify({ type: type, page: 1, search: "" })
        })
    }

    //Para buscar despues de un tiempo
    const [onSearch] = useDebouncedCallback(v => {
        setUsers(null)

        history.push({
            search: queryString.stringify({ ...params, page: 1, search: v })
        })
    }, 500)

    const moreData = () => {
        setBtnLoading(true)
        const newPage = parseInt(params.page) + 1
        history.push({
            search: queryString.stringify({ ...params, page: newPage })
        })
    }


    return (
        <BasicLayout className="users">
            <div className="users__title">
                <h2>Usuarios</h2>
                <input type="text"
                    value={txtSearch}
                    onChange={(e) => {
                        onSearch(e.target.value)
                        setTxtSearch(e.target.value)
                    }}
                    placeholder="Busca un usuario..." />
            </div>

            <ButtonGroup className="users__options">
                <Button onClick={() => onChangeType("follow")}
                    className={typeUsers === 'follow' && 'active'}>Siguiendo</Button>
                <Button onClick={() => onChangeType("new")}
                    className={typeUsers === 'new' && 'active'}>Nuevos</Button>
            </ButtonGroup>

            {!users ? (
                <div className="users__loading">
                    <Spinner animation="border" variant="auto" />
                    Buscando usuarios
                </div>
            ) : <>
                    <ListUsers users={users} />
                    <Button onClick={moreData} className="load-more">
                        {!btnLoading ? (
                            btnLoading !== 0 && "Cargar mas usuarios"
                        ) : (
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true" />
                            )}
                    </Button>
                </>}

        </BasicLayout>
    )
}

function useUserQuery(location) {
    const { page = 1, type = "follow", search } = queryString.parse(location.search)
    return { page, type, search }
}

export default withRouter(Users)