import React from 'react'
import './ConfigModal.scss'
import { Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function ConfigModal({ show, setShow, title, children }) {
    return (
        <Modal
            className="config-modal"
            show={show}
            onHide={() => setShow(false)}
            centered
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <FontAwesomeIcon icon={faTimes}
                        onClick={() => setShow(false)} />
                    <h2>{title}</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}
