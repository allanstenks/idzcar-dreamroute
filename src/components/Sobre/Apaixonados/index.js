import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Style
import './Apaixonados.scss';
import 'react-tooltip/dist/react-tooltip.css';

// Imagens
import iconSeta from "./img/iconSeta.webp";

function Apaixonados() {

    return (
        <>
            <section className='Apaixonados'>
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={12} md={12} lg={6}>
                            <div className='timeApaixonados'>
                                <div className='desdeApaixonados'>
                                    <h2>DESDE 2002</h2>
                                </div>
                                <div className='nextApaixonados'>
                                    <img src={iconSeta} />
                                </div>
                                <div className='textApaixonados'>
                                    <p>A 1021 é um grupo automotivo formado por <strong>apaixonados por carros</strong></p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default Apaixonados;
