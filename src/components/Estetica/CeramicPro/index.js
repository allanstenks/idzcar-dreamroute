import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";


// Style
import './CeramicPro.scss';


//Imagens
import imgCeramicPro from './img/imgCeramicPro.webp'

function CeramicPro() {

    return (
        <>
            <section className='CeramicPro'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={6} className='boxCeramicPro'>
                            <div className='textConceito'>
                                <h4>CONHEÇA</h4>
                                <h2>produtos <strong>ceramic pro</strong></h2>
                                <h3>Ceramic Pro 9H</h3>
                                <p>
                                A proteção Ceramic Pro 9H é uma proteção química que tem 5 anos de garantia na pintura do seu carro. Ela cria ma barrera avançada contra microrriscos, contaminates e raios UV. Garante um Brilho duradouro e defesa robusta para manter seu veículo impecável
                                    Nós somos credenciados Ceramic Pro, trazendo todas as proteções disponíveis na linha e o que há de mais tecnológico quando o assunto é estética automotiva.
                                </p>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={6} className='imgCeramicPro'>
                            <img src={imgCeramicPro} />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default CeramicPro;
