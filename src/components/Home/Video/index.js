import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Style
import './Video.scss';
import 'react-tooltip/dist/react-tooltip.css'

//Imagens
import VideoDream  from './img/VideoDream.png'



function Video() {

    const navigate = useNavigate();

    return (
        <>
            <section className='Video'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <h2>Entre no Mundo dos <strong>Carros Premium</strong></h2>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={12}>
                           <div className='VideoDream'>
                                <i></i>
                                <span>conheça nosso <strong>showroom</strong></span>
                           </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default Video;
