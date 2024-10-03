import React, { useState, useEffect } from 'react';
import { Modal, Button, Form} from "react-bootstrap";
import InputMask from 'react-input-mask';
import { Icon } from '@iconify/react';
import { useNavigate  } from 'react-router-dom';

// Styles
import './ValidacaoBlindagem.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';


const ValidacaoBlindagem = ({ showModal, enviarCodigo, email, alertModal, onResend }) => {
  const [codigo, setCodigo] = useState(['', '', '', '']);

  const handleChange = (index, value) => {
    const novoCodigo = [...codigo];
    novoCodigo[index] = value;
    setCodigo(novoCodigo);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const codigoCompleto = codigo.join('');
    enviarCodigo(codigoCompleto); 
  };

  const handleResend = () => {
    onResend(true); 
  };

  return (
    <>
      <Modal show={showModal}>
        <Modal.Header closeButton>
          <i><Icon className="icons" icon="bx:message-check"></Icon></i>
          <Modal.Title>DIGITE O CÓDIGO DE VERIFICAÇÃO</Modal.Title>
          <p>Enviamos um código para o e-mail {email}.<br/> Por favor insira o código recebido para continuar.</p>
        </Modal.Header>
        <Modal.Body>
          <Form  onSubmit={handleSubmit}>  
            <Form.Label className='errorLabel'>{alertModal ? null : "Código inválido"}</Form.Label>
            <Form.Group className="numberValidate">
            {[0, 1, 2, 3].map((index) => (
                <Form.Control
                  key={index}
                  type="text"
                  value={codigo[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className=""
                />
              ))}
            </Form.Group>

            <Form.Group className='text-center'>
              <p>Não recebeu o código? <a className='reenviar' onClick={(e) => handleResend()}><strong>Clique para reenviá-lo.</strong></a></p>
            </Form.Group>
            <Form.Group className='text-center'>
              <Button variant="primary" type="submit">Ver Orçamento</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ValidacaoBlindagem;