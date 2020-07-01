import React from "react";
import { Modal } from "react-bootstrap";
import LogoWhite from "../../../assets/png/logow.png";
import "./BasicModal.scss";

export default function BasicModal({ show, setShow, children }) {
  return (
    <Modal className="basic-modal" show={show}
    onHide={()=>setShow(false)}
    centered
    size="lg">
      <Modal.Header>
          <Modal.Title>
              <img src={LogoWhite} alt="Twittor" />
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
