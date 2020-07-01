import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./SingInSingUp.scss";
import LogoWhiteTwittor from "../../assets/png/logow.png";
import LogoTwittor from "../../assets/png/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUsers,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../components/modal/basicModal";
import SignUpForm from "../../components/signUpForm";
import SignInForm from "../../components/signInForm";

export default function SingInSingUp({ setRefreshCheckLogin }) {
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState("SDASDFASDF");

  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };

  return (
    <>
      <Container className="singin-singup" fluid>
        <Row>
          <LeftComponent />
          <RightComponent
          setRefreshCheckLogin={setRefreshCheckLogin} 
          openModal={openModal} setShowModal={setShowModal} />
        </Row>
      </Container>
      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}

function LeftComponent() {
  return (
    <Col className="singin-singup__left" xs={6}>
      <img src={LogoTwittor} alt="Twittor" />
      <div>
        <h2>
          <FontAwesomeIcon icon={faSearch} />
          Sigue lo que te interesa
        </h2>
        <h2>
          <FontAwesomeIcon icon={faUsers} />
          Enterate de lo que esta pasando aqui
        </h2>
        <h2>
          <FontAwesomeIcon icon={faComments} />
          Unete a la conversación
        </h2>
      </div>
    </Col>
  );
}

function RightComponent({ openModal, setShowModal, setRefreshCheckLogin }) {
  return (
    <Col className="singin-singup__right" xs={6}>
      <div>
        <img src={LogoWhiteTwittor} alt="Twittor" />
        <h2>Mira lo que está pasando en el mundo en este momento</h2>
        <h3>Únete a twittor ahora mismo</h3>
        <Button
          onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)}
          variant="primary"
        >
          Regístrate
        </Button>
        <Button
          onClick={() => openModal(<SignInForm 
            setRefreshCheckLogin={setRefreshCheckLogin} />)}
          variant="outline-primary"
        >
          Iniciar sesión
        </Button>
      </div>
    </Col>
  );
}
