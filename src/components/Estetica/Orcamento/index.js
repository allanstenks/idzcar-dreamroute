import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";


// Style
import './Orcamento.scss';



function Orcamento() {

    return (
        <>
            <section className='Orcamento'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={5} className='boxOrcamento'>
                            <div className='textConceito'>
                                <h4>ENTRE EM CONTATO CONOSCO</h4>
                                <h2>deixe seu carro <strong>brilhando como novo</strong></h2>
                                <Link className="btn btn-secondary" to="/faleconosco">solicite um orçamento</Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default Orcamento;
