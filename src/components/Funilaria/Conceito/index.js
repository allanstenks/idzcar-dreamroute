import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";


// Style
import './FunilariaConceito.scss';


//Imagens
import imgFunilariaConceito from './img/imgFunilariaConceito.webp'

function FunilariaConceito() {

    return (
        <>
            <section className='FunilariaConceito'>
                <Container>
                    <Row>
                    <Col xs={12} sm={6} md={12} lg={6}>
                            <img src={imgFunilariaConceito} />
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={5} className='boxFunilariaConceito'>
                            <div className='textConceito'>
                                <h2><strong>Funilaria Premium 1021 Motors:</strong> SEU CARRO COMO NOVO</h2>
                                <p>Seu carro sofreu um acidente? Ou precisa de um retoque na pintura?
                                    A 1021 Motors oferece serviços de funilaria e pintura premium para deixar o seu carro como novo.
                                    <br />
                                    Com profissionais experientes e equipamentos de última geração como pistolas Pininfarina e a melhor tinta disponível do mercado Sikkens Plus com 5 anos de garantia em peças de metal sem repintura prévia.
                                 </p>
                                   <a href="#nossaEstrutura"><button className="btn btn-primary">CONHEÇA NOSSA ESTRUTURA</button></a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default FunilariaConceito;
