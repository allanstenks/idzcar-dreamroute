import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from "react-bootstrap";

// Style
import './SobreBanner.scss';

function SobreBanner() {

    return (
        <>
            <section className='SobreBanner'>
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={12} md={12} lg={6}>
                            <h2 className='titilos'><i></i> <br />Entre em  <strong>Contato</strong> </h2>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default SobreBanner;
