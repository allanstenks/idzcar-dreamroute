import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Style
import './BannerCotacaoBlindagem.scss';
import 'react-tooltip/dist/react-tooltip.css'

function BannerCotacaoBlindagem() {

    return (
        <>
            <section className='BannerCotacaoBlindagem'>
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={8} className='boxBannerCotacaoBlindagem'>
                            <div className='textBannerCotacaoBlindagem'>
                                <h3>Faça o orçamento</h3>
                                <h2>da sua blindagem</h2>
                                <p>Preencha o passo-a passo e receba seu orçamento automaticamente.</p>
                                <a href="#CotacaoBlindagem" className='btn btn-secondary'>Iniciar meu orçamento</a><br />
                                <a href="#CotacaoBlindagem" className='btn btn-down'><i><Icon className="icons" icon="iconoir:arrow-down" /></i></a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default BannerCotacaoBlindagem;
