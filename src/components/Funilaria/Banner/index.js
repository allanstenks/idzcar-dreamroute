import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";


// Style
import './BannerFunilaria.scss';


//Imagens
import bannerFunilaria from './img/bannerFunilaria.png'

function BannerFunilaria() {

    return (
        <>
            <section className='BannerFunilaria'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={12}>
                            <div className='itemBannerFunilaria'>
                                <div className='imgBannerFunilaria' style={{ background: `url(${bannerFunilaria})  no-repeat center top`}}></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='ChamadaFunilaria'>
            <Container>
                <Row className='justify-content-md-center'>
                        <Col xs={12} sm={6} md={12} lg={7}>
                            <h4>Funilaria E pintura PREMIUM </h4>
                            <p>QUE contam com os melhores profissionais e os equipamentos mais modernos do mercado.</p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default BannerFunilaria;
