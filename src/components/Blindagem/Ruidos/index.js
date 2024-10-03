import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";


// Style
import './Ruidos.scss';


//Imagens
import imgRuidos from './img/imgRuidos.webp'

function Ruidos() {

    return (
        <>
            <section className='Ruidos'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={6}  className='boxRuidos'>
                            <div className='textRuidos'>
                                <i></i>
                                <h3><strong>DIMINUIÇÃO</strong><br /> DOS RUÍDOS</h3>
                                <ul>
                                    <li>Treinamento de profissionais especializados na montagem do veículo, minimizando ruídos internos</li>
                                    <li> Ausência de ruídos de torção de carroceria</li>
                                    <li>Material acústico garantindo menor ruído no habitáculo do veículo</li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={6}>
                            <div className='imgRuidos'>
                                <img src={imgRuidos} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default Ruidos;
