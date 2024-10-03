import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";


// Style
import './Desgaste.scss';


//Imagens
import imgDesgaste from './img/imgDesgaste.webp'

function Desgaste() {

    return (
        <>
            <section className='Desgaste'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={6}>
                            <div className='imgDesgaste'>
                                <img src={imgDesgaste} />
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={6}  className='boxDesgaste'>
                            <div className='textDesgaste'>
                                <i></i>
                                <h3><strong>Menor Desgaste</strong><br /> do Veículo</h3>
                                <ul>
                                    <li>Eliminamos furos e soldas desnecessários</li>
                                    <li>Menor desgaste de suspensão e freios</li>
                                    <li>Estudos e testes para garantir a maior durabilidade das máquinas de vidros</li>
                                    <li>Material não agride as partes elétricas do veículo (chicote e módulos)</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default Desgaste;
