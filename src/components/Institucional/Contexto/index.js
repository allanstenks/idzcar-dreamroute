import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";

// Style
import './Contexto.scss';
import 'react-tooltip/dist/react-tooltip.css'

function Contexto({texto, titulo }) {

    return (
        <>
            <section className='Contexto'>
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <div className='textContexto'>
                                <p>{texto}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default Contexto;
