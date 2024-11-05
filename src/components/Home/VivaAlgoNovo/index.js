import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import api from '../../../services/apiIdz';
import { useMediaQuery } from 'react-responsive';

// Style
import './VivaAlgoNovo.scss';

function VivaAlgoNovo() {

    return (
        <>
            <section className='VivaAlgoNovo'>
                <Container>
                <Row className='justify-content-md-center'>
                        <Col xs={12} sm={12} md={12} lg={6}>
                            <h2 className='titilos'><i></i> <br />Viva algo  <strong>novo.</strong> </h2>
                            <p>Entre em contato e descubra como podemos transformar seu sonho em realidade com os melhores carros do mundo!</p>
                            <a className='btn btn-tertiary'>Entre em Contato</a>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>                           
    );
}

export default VivaAlgoNovo;
