import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Style
import './BannerCotacaoEstetica.scss';
import 'react-tooltip/dist/react-tooltip.css'

function BannerCotacaoEstetica() {

    return (
        <>
            <section className='BannerCotacaoEstetica'>
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={8} className='boxBannerCotacaoEstetica'>
                            <div className='textBannerCotacaoEstetica'>
                                <h3>Orçamento</h3>
                                <h2>estética veicular</h2>
                                <p>Preencha o passo-a passo e receba seu orçamento <strong>automaticamente</strong></p>
                                <a href="#CotacaoEstetica" className='btn btn-secondary'>Iniciar meu orçamento</a><br />
                                <a href="#CotacaoEstetica" className='btn btn-down'><i><Icon className="icons" icon="iconoir:arrow-down" /></i></a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default BannerCotacaoEstetica;
