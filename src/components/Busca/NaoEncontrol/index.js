import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

// Style
import './NaoEncontrol.scss';
import 'react-tooltip/dist/react-tooltip.css'

function NaoEncontrol() {

    return (
        <>
            <section className='naoEncontrol'>
                <Container>
                    <div className='boxNaoEncontrol'>
                    <Row className='justify-content-md-center'>
                            <Col xs={12} sm={12} md={12} lg={8}>
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={6}>
                                        <h3>não encontrou</h3>
                                        <h2>o que estava procurando?</h2>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={6}>
                                        <Link className="btn btn-secondary" to="/faleconosco">encomende aqui</Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </>

    );
}

export default NaoEncontrol;
