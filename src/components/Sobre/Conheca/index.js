import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useNavigate  } from 'react-router-dom';

// Style
import './Conheca.scss';
import 'react-tooltip/dist/react-tooltip.css';

// Imagens
import imgSobre from "./img/imgSobre.webp";

function Conheca() {
    const navigate = useNavigate();
    return (
        <>
            <section className='Conheca'>
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={6}>
                            <div className='imgConheca'>
                                <img src={imgSobre} />
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6}>
                            <div className='textConheca'>
                                <h3>conheça a 1021</h3>
                                <h2>Sua Jornada Automotiva <strong>Começa Aqui</strong></h2>
                                <p>Bem-vindo à 1021, um grupo automotivo formado por apaixonados por carros. Aqui, a nossa paixão se encontra com a excelência em atendimento, oferecendo uma consultoria individualizada aos nossos clientes. Na 1021 você encontra blindagens de alta performance, uma estética automotiva completa, loja de novos e seminovos e uma funilaria premium para atender à todas as suas necessidades quando o assunto é o seu carro.</p>
                                <a onClick={() => navigate(`/faleconosco`)} className="btn btn-primary">entre em contato</a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default Conheca;
