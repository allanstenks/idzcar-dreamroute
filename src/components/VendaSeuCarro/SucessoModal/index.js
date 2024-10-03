import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
// Styles
import './SucessoModal.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

const SucessoModal = ({ show, handleClose }) => {

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        handleClose();
      }, 4000); 

      return () => clearTimeout(timer);
    }
  }, [show, handleClose]);


  return (
    <Modal className='SucessoModal' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      <i><Icon icon="simple-line-icons:check" /></i>
        <Modal.Title>Proposta enviada!</Modal.Title>
        <p>Sua proposta foi recebida com sucesso e entraremos em contato em breve. Estamos comprometidos em superar suas expectativas durante todo o processo de compra.</p>
        <Link className='btn btn-secondary' variant="primary" onClick={handleClose}>OBRIGADO!</Link>
      </Modal.Header>
    </Modal>
  );
};

export default SucessoModal;