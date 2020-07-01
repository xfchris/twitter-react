import React from 'react'
import { Container, Row, Col } from "react-bootstrap"

import './BasicLayout.scss'
import LeftMenu from '../../components/LeftMenu/LeftMenu'

export default function BasicLayout({className, children}) {
    return (
        <Container className={"basic-layout "+className}>
            <Row>
                <Col xs="3" className="basic-layout__menu">
                    <LeftMenu />
                </Col>
                <Col xs="9" className="basic-layout__content">
                    {children}
                </Col>
            </Row>
        </Container>
    )
}
