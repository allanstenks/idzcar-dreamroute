import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";


// Style
import './EsteticaConceito.scss';


//Imagens
import imgEsteticaConceito from './img/imgEsteticaConceito.webp'

function EsteticaConceito() {

    return (
        <>
            <section className='EsteticaConceito'>
                <Container>
                    <Row>
                    <Col xs={12} sm={6} md={12} lg={6}>
                            <img src={imgEsteticaConceito} />
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={5} className='boxEsteticaConceito'>
                            <div className='textConceito'>
                                <h2>Transforme Seu Carro em uma <strong>Obra de Arte em Movimento</strong></h2>
                                <p>
                                    Seu carro é o seu orgulho e sua alegria, não é mesmo? Você quer que ele esteja sempre brilhando e com a aparência de novo, mas não tem tempo ou habilidade para cuidar dele?<br />
                                    Oferecemos serviços de estética automotiva com o requinte 1021 para deixar o seu carro como novo. Com profissionais experientes e produtos de última geração, nós garantimos um resultado impecável.<br />
                                    Nós somos credenciados Ceramic Pro, trazendo todas as proteções disponíveis na linha e o que há de mais tecnológico quando o assunto é estética automotiva.
                                </p>
                                <Link className="btn btn-primary" to="/faleconosco">FAÇA UM ORçAMENTO</Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default EsteticaConceito;
