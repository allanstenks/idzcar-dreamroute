import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";


// Style
import './BannerEstetica.scss';


//Imagens
import bannerEstetica from './img/bannerEstetica.webp'

function BannerEstetica() {

    return (
        <>
            <section className='BannerEstetica'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={12}>
                            <div className='itemBannerEstetica'>
                                <div className='imgBannerEstetica' style={{ background: `url(${bannerEstetica})  no-repeat center top`}}></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='ChamadaEstetica'>
            <Container>
                <Row className='justify-content-md-center'>
                        <Col xs={12} sm={6} md={12} lg={7}>
                            <h4>ESTÉTICA AUTOMOTIVA</h4>
                            <p>NA 1021 MOTORS</p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default BannerEstetica;
