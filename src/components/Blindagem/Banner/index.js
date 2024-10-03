import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";


// Style
import './BannerBlindagem.scss';


//Imagens
import bannerBlindagem from './img/bannerBlindagem.webp'

function BannerBlindagem() {

    return (
        <>
            <section className='BannerBlindagem'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={12}>
                            <div className='itemBannerBlindagem'>
                                <div className='imgBannerBlindagem' style={{ background: `url(${bannerBlindagem})  no-repeat center top`}}></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='NumerosBlindagem'>
            <Container>
                    <Row>
                        <Col xs={6} sm={6} md={12} lg={3}>
                            <h4>10 anos</h4>
                            <span>DE GARANTIA</span>
                        </Col>
                        <Col xs={6} sm={6} md={12} lg={3}>
                            <h4>80%</h4>
                            <span>mais leve</span>
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={3}>
                            <h4>BLINDAGEM HOMOLOGADA</h4>
                            <span>Exército Brasileiro Nível IIIA</span>
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={3}>
                            <h4>AUSÊNCIA DE RUÍDOS</h4>
                            <span>MELHOR ACÚSTICA</span>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default BannerBlindagem;
