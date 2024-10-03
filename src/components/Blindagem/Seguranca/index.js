import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";


// Style
import './Seguranca.scss';


//Imagens
import imgSeguranca from './img/imgSeguranca.webp'

function Seguranca() {

    return (
        <>
            <section className='Seguranca'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={6}  className='boxSeguranca'>
                            <div className='textSeguranca'>
                                <i></i>
                                <h3><strong>Sua família </strong><br /> sempre segura</h3>
                                <ul>
                                    <li>Maior facilidade de remoção e menor risco de ferimento dos ocupantes no caso de uma possível colisão</li>
                                    <li>Exaustivos testes para deflagração original dos airbags laterais</li>
                                    <li>Cola a base d’agua, sem componentes cancerígenos</li>
                                    <li>Estudo de pontos vulneráveis do veículo a partir de incessantes testes</li>
                                    <li>Proteção de tiros a 45 graus.</li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={6}>
                            <div className='imgSeguranca'>
                                <img src={imgSeguranca} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default Seguranca;
