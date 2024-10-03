import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";


// Style
import './Diferenciais.scss';


//Imagens
import imgDiferenciais from './img/imgDiferenciais.webp'

function Diferenciais() {

    return (
        <>
            <section className='Diferenciais'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={6}>
                            <div className='imgDiferenciais'>
                                <img src={imgDiferenciais} />
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={6}  className='boxDiferenciais'>
                            <div className='textDiferenciais'>
                                <i></i>
                                <h3>PERFORMANCE</h3>
                                <ul>
                                    <li>Material 80% mais leve que o aço inoxidável</li>
                                    <li>Menor centro de gravidade do veículo, proporcionando maior estabilidade</li>
                                    <li>Torção original da carroceria</li>
                                    <li>Molas com as características originais de fábrica, garantindo segurança e estabilidade.</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default Diferenciais;
