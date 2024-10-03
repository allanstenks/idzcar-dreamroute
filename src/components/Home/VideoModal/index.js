import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col, Row, ModalBody } from "react-bootstrap";
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

// Styles
import './VideoModal.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

//Imagens
import logo from '../../../img/logo.png'

const VideoModal = ({ show, handleClose, videoId }) => {


  return (
    <Modal className='VideoModal' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <img className="logo" src={logo} />
      </Modal.Header>
      <ModalBody>
      <iframe 
          width="100%" 
          height="500" 
          src={`https://www.youtube.com/embed/${videoId}`} 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </ModalBody>
    </Modal>
  );
};

export default VideoModal;