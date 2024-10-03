import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Style
import './ExperienciaPersonalizada.scss';
import 'react-tooltip/dist/react-tooltip.css'


// Imagens
import bgExperienciaPersonalizada from "./img/bgExperienciaPersonalizada.webp";
import imgExperienciaPersonalizada from "./img/logo-Dream.png";

function ExperienciaPersonalizada() {

    const navigate = useNavigate();

    return (
        <>
            <section className='experienciaPersonalizada'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <h2><i></i> <br />Exclusividade e 12 Anos<br/>de <strong>Excelência</strong>: nós somos a dream route. </h2>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6}>
                        <div className='img'>
                                <img src={imgExperienciaPersonalizada} />
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <ul>
                                <li>
                                    <h4><i><Icon className="icons" icon="file-icons:precision" /></i> <span>Seleção Exclusiva</span></h4> 
                                    <p>Oferecemos os carros de luxo mais desejados, cuidadosamente escolhidos para atender às suas maiores expectativas.</p>
                                </li>
                                <li>
                                    <h4><i><Icon className="icons" icon="ion:diamond-outline" /></i> <span>Experiência Personalizada</span></h4>
                                    <p>Proporcionamos um atendimento personalizado, garantindo que sua compra seja tão tranquila quanto satisfatória.</p>
                                </li>
                                <li>
                                    <h4><i><Icon className="icons" icon="carbon:security" /></i> <span>Expertise Confiável</span></h4>
                                    <p>Com mais de 12 anos de experiência, importamos e vendemos veículos premium com precisão e cuidado.</p>
                                    <a>Entre em Contato <Icon className="icons" icon="basil:arrow-up-outline" /></a>
                                </li>
                           </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default ExperienciaPersonalizada;
