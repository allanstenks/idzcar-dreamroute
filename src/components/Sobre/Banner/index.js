import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Style
import './SobreBanner.scss';
import 'react-tooltip/dist/react-tooltip.css'

function SobreBanner() {

    return (
        <>
            <section className='SobreBanner'>
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={6} className='boxSobreBanner'>
                            <div className='textSobreBanner'>
                                <h3></h3>
                                <h2></h2>
                                <Link className='btn btn-down'><i><Icon className="icons" icon="iconoir:arrow-down" /></i></Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default SobreBanner;
