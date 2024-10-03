import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import api from '../../../services/apiIdz';

// Style
import './BannerInstitucional.scss';
import 'react-tooltip/dist/react-tooltip.css'

function BannerInstitucional({subtitulo, titulo, frase, background}) {

    return (
        <>
            <section className='BannerInstitucional'  style={background ? { background: `url(${api.defaults.baseURL}${background}) no-repeat center/cover` } : null}>
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={12} md={12} lg={8} className='boxBannerInstitucional'>
                            <div className='textBannerInstitucional'>
                                <h3>{subtitulo}</h3>
                                <h2>{titulo}</h2>
                                <p>{frase}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default BannerInstitucional;
