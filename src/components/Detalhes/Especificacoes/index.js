import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Col, Row, Container } from "react-bootstrap";
import { Dropdown } from 'primereact/dropdown';
import InputMask from 'react-input-mask';
import Slider from 'react-slick';
import api from '../../../services/apiIdz';
import { Icon } from '@iconify/react';
// Styles
import './Especificacoes.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

const Especificacoes = ({  opcionais = [], destaques, detalhesEspecificacoes = []}) => {

  const [mostrarOpcionais, setMostrarOpcionais] = useState(opcionais.length > 1 ? true : false);
  const [mostrarDestaques, setMostrarDestaques] = useState(opcionais.length > 1 ? false : true);

  const toggleMostrarOpcionais = () => {
    setMostrarOpcionais(true);
    setMostrarDestaques(false);
  };

  const toggleMostrarDestaques = () => {
    setMostrarOpcionais(false);
    setMostrarDestaques(true);
  };


  return (
    <>
      <section className='especificacoesVeiculo'>
    <Container>
        <Row className='justify-content-md-center'>
            {console.log("opcionais: ", Array.isArray(destaques))}
            <Col 
                xs={12} 
                sm={12} 
                md={12} 
                lg={(opcionais.length > 0 || (Array.isArray(destaques) && destaques.length > 0)) ? 6 : 12} 
                className='color'
                style={{
                    minHeight: (opcionais.length === 0 && (!Array.isArray(destaques) || destaques.length === 0)) ? 'auto' : 'inherit'
                }}
            >
                <div className='boxColor'>
                    <h2>Descrição</h2>
                    <p>{detalhesEspecificacoes.descricao}</p>
                </div>
            </Col>
            {(opcionais.length > 0 || (Array.isArray(destaques) && destaques.length > 0)) ? (
                <Col xs={12} sm={12} md={12} lg={6} className='color segundo'>
                    <div className='boxColor'>
                        <h2>Diferenciais</h2>
                        {mostrarOpcionais && (
                            <ul>
                                {opcionais.map((item, index) => (
                                    <li key={index}><span>{item}</span></li>
                                ))}
                                {Array.isArray(destaques) && destaques.map((item, index) => (
                                    <li key={index}><span>{item}</span></li>
                                ))}
                            </ul>
                        )}
                    </div>
                </Col>
            ) : null}
        </Row>
    </Container>
</section>


    </>
  );
};

export default Especificacoes;