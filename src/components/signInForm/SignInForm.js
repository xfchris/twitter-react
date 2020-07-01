import React, { useState } from 'react'
import { Form, Button, Spinner } from "react-bootstrap"
import { size, values } from 'lodash'
import { toast } from 'react-toastify'

import "./SignInForm.scss"
import { isEmailValid } from '../../utils/validations'
import { signInApi, setTokenApi } from '../../api/auth'


export default function SignInForm({ setRefreshCheckLogin }) {
    const [formData, setFormData] = useState(initialFDState)
    const [signUpLoading, setSignUpLoading] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        //Realizo validaciones
        let validCount = 0
        values(formData).some(value => {
            value && validCount++
            return null
        })

        if (validCount !== size(formData)) {
            toast.warning("Rellena todos los campos del formulario")
            return
        }

        if (!isEmailValid(formData.email)) {
            toast.warning("Email inválido")
            return
        }

        //Si llega hasta aqui, submit.
        setSignUpLoading(true)

        signInApi(formData)
            .then(Response => {
                if (Response.code) {
                    toast.warning(Response.message)
                } else {
                    setTokenApi(Response.token)
                    setRefreshCheckLogin(true)
                }
            })
            .catch(() => {
                toast.error("Error de conexion")
            })
            .finally(() => {
                setSignUpLoading(false)
            })
    }

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="sign-in-form">
            <h2>Entrar</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="email"
                        placeholder="Email"
                        defaultValue={formData.email}
                        required />
                </Form.Group>
                <Form.Group>

                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Escribe contraseña"
                        defaultValue={formData.password} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    {signUpLoading ? <Spinner animation="border" /> : "Iniciar sesión"}
                </Button>
            </Form>
        </div>
    )
}


function initialFDState() {
    return {
        email: "",
        password: ""
    }
}