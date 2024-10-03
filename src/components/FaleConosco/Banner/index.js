import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Style
import './FaleConosco.scss';
import 'react-tooltip/dist/react-tooltip.css'

function FaleConosco() {

    return (
        <>
            <section className='FaleConosco'>
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={12} md={12} lg={8} className='boxFaleConosco'>
                            <div className='textFaleConosco'>
                                <h3>ENTRE</h3>
                                <h2>EM CONTATO</h2>
                                <p>Ficou com alguma dúvida? Entre em contato</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default FaleConosco;
