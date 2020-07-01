import React, { useState } from "react"
import { Row, Col, Form, Button, Spinner } from "react-bootstrap"
import { values, size } from 'lodash'
import { toast } from 'react-toastify'

import "./SignUpForm.scss"
import { isEmailValid } from "../../utils/validations"
import { signUpApi } from "../../api/auth"

export default function SignUpForm({ setShowModal }) {
  const [formData, setFormData] = useState(initialFormValue)
  const [signUpLoading, setSignUpLoading] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    let validCount = 0
    values(formData).some(value => {
      value && validCount++
      return null
    })


    //VALIDACIONES

    if (validCount !== size(formData)) {
      toast.warning("Completa todos los campos del formulario")
      return
    }
    if (!isEmailValid(formData.email)) {
      toast.warning("Email inválido")
      return
    }

    if (size(formData.password) < 6) {
      toast.warning("La contraseña debe de tener mas de 6 caracteres")
      return
    }

    if (formData.password !== formData.repeatPassword) {
      toast.warning("La contraseña debe de ser igual")
      return
    }

    setSignUpLoading(true)
    signUpApi(formData)
      .then(Response => {
        if (Response.code) {
          toast.warning(Response.message)
        } else {
          toast.success("Registro correcto")
          setShowModal(false)

        }
      })
      .catch(() => toast.error("Error del servidor"))
      .finally(() => setSignUpLoading(false))
  }






  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className="sign-up-form">
      <h2>Crea tu cuenta</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control type="text" placeholder="Nombres"
                name="nombres"
                defaultValue={formData.nombres}
              />
            </Col>
            <Col>
              <Form.Control type="text" placeholder="Apellidos"
                name="apellidos"
                defaultValue={formData.apellidos}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group>
          <Row>
            <Col>
              <Form.Control type="email" placeholder="Email"
                name="email"
                defaultValue={formData.email}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group>
          <Row>
            <Col>
              <Form.Control type="password" placeholder="Contraseña"
                name="password"
                defaultValue={formData.password}
              />
            </Col>
            <Col>
              <Form.Control type="password" placeholder="Repetir contraseña"
                name="repeatPassword"
                defaultValue={formData.repeatPassword}
              />
            </Col>
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit">
          {!signUpLoading ? 'Registro' : <Spinner animation="border" />}

        </Button>
      </Form>
    </div>
  )
}

function initialFormValue() {
  return {
    nombres: "",
    apellidos: "",
    email: "",
    password: "",
    repeatPassword: "",
  }
}
