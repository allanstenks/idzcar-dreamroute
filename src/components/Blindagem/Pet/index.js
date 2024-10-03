import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";


// Style
import './Pet.scss';


//Imagens
import imgPet from './img/imgPet.webp'

function Pet() {

    return (
        <>
            <section className='Pet'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={6}  className='boxPet'>
                            <div className='textPet'>
                                <i></i>
                                <h3><strong>BLINDAGEM</strong><br /> PET FRIENDLY</h3>
                                <ul>
                                    <li>Com a opção de abertura dos vidros traseiros, seu pet continuará com a sensação de liberdade mesmo dentro do seu carro blindado. <br /> *consulte carros disponíveis para abertura de vidros traseiros.</li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={6}>
                            <div className='imgPet'>
                                <img src={imgPet} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default Pet;
