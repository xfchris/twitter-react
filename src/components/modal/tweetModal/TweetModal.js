import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './TweetModal.scss'
import { addTweetApi } from '../../../api/tweets'
import { toast } from 'react-toastify'

export default function TweetModal({ show, setShow }) {

    const [message, setMessage] = useState("")
    const maxLength = 28

    const onSubmit = (e) => {
        e.preventDefault()

        if (message.length > 0 && message.length <= maxLength) {
            addTweetApi(message)
                .then(response => {
                    if (response.code === 500) {
                        toast.error("Error al enviar el tweet")
                    } else {
                        toast.success("Tweet enviado")
                        setShow(false)
                        window.location.reload()
                    }
                })
                .catch(err => toast.error("Error del servidor"))
        }
    }

    const onChange = e => {
        setMessage(e.target.value)
    }
    return (
        <Modal
            className="tweet-modal"
            show={show}
            onHide={() => setShow(false)}
            centered
            size="lg"
        >

            <Modal.Header>
                <Modal.Title>
                    <FontAwesomeIcon icon={faTimes}
                        onClick={() => setShow(false)} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}
                    onChange={onChange}>
                    <Form.Control
                        defaultValue={message}
                        as="textarea"
                        rows="3"
                        placeholder="Que estas pensando?" />

                    <span className={
                        classNames("count", {
                            error: message.length > maxLength
                        })
                    }>
                        {message.length}
                    </span>

                    <Button type="submit"
                        disabled={message.length > maxLength || message.length < 5} >
                        Twittear
                    </Button>

                </Form>
            </Modal.Body>
        </Modal>

    )
}
