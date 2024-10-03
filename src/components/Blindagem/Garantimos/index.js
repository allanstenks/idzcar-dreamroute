import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

// Style
import './Garantimos.scss';
import 'react-tooltip/dist/react-tooltip.css'

function Garantimos() {
    const navigate = useNavigate();
    return (
        <>
            <section className='Garantimos'>
                <Container>
                    <div className='boxGarantimos'>
                    <Row className='justify-content-md-center'>
                            <Col xs={12} sm={12} md={12} lg={8}>
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={6}></Col>
                                    <Col xs={12} sm={12} md={12} lg={6}>
                                        <h3>A 1021 ESTARÁ AO SEU LADO</h3>
                                        <h2>GARANTIMOS EXCELÊNCIA E CUIDADO COM VOCÊ</h2>
                                        <p>Estamos prontos para atendê-lo!</p>
                                        <a onClick={() => navigate(`/faleconosco/`)} className="btn btn-secondary" to="/">Entre em contato!</a>
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

export default Garantimos;
