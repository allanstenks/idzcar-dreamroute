import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Style
import './Banner.scss';
import 'react-tooltip/dist/react-tooltip.css'

function BuscaBanner() {

    return (
        <>
            <section className='buscaBanner'>
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={12} md={12} lg={8} className='boxBuscaBanner'>
                            <div className='textBuscaBanner'>
                                <h2><i></i> <br/>Viva algo <strong>novo.</strong></h2>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default BuscaBanner;
