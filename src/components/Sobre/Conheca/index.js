import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useNavigate  } from 'react-router-dom';

// Style
import './Conheca.scss';
import 'react-tooltip/dist/react-tooltip.css';

// Imagens
import imgSobre from "./img/imgSobre.png";

function Conheca() {
    const navigate = useNavigate();
    return (
        <>
            <section className='Conheca'>
                <Container>
                    <Row>
                        
                        <Col xs={12} sm={12} md={12} lg={5}>
                            <div className='textConheca'>
                                <i></i>
                                <h2>Sua Experiência Automotiva <strong>Inesquecível Começa Agora</strong></h2>
                                <p>A Dream Route nasceu em 2015 como um evento exclusivo para amantes de supercarros, reunindo clientes e amigos da marca. Em 2023, ampliamos nossa atuação e lançamos uma nova fase com uma plataforma dedicada à venda de carros de luxo, oferecendo uma experiência única e completa para quem busca exclusividade e alta performance.</p>
                                <a onClick={() => navigate(`/faleconosco`)} className="btn btn-primary">Entre em contato <Icon className="icons" icon="basil:arrow-up-outline" /></a>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6}>
                            <div className='imgConheca'>
                                <img src={imgSobre} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default Conheca;
