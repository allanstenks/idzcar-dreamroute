import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";

// Style
import './ComoFunciona.scss';
import 'react-tooltip/dist/react-tooltip.css'

//Imagens
import iconCadastro from "./img/icon-cadastro.png";
import iconAnaliseo from "./img/icon-analise.png";
import iconProposta from "./img/icon-proposta.png";
import iconValor from "./img/icon-valor.png";

function ComoFunciona() {

    return (
        <>
            <section className='ComoFunciona'>
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={12} md={12} lg={12} className='boxComoFunciona'>
                            <div className='textComoFunciona'>
                                <h3><strong>VEJA COMO FUNCIONA O PROCESSO</strong><br/> DE VENDA DO SEU VEÍCULO</h3>
                            </div>
                        </Col>
                        <Col xs={6} sm={12} md={12} lg={3}>
                            <div className='itemComoFunciona'>
                                <i><img src={iconCadastro} /></i>
                                <h4>Faça o cadastro <br/>do seu veículo</h4>
                            </div>
                        </Col>
                        <Col xs={6} sm={12} md={12} lg={3}>
                            <div className='itemComoFunciona'>
                                <i><img src={iconAnaliseo} /></i>
                                <h4>Analisaremos <br/>o seu veículo</h4>
                            </div>
                        </Col>
                        <Col xs={6} sm={12} md={12} lg={3}>
                            <div className='itemComoFunciona'>
                                <i><img src={iconProposta} /></i>
                                <h4>Enviamos <br/>uma proposta</h4>
                            </div>
                        </Col>
                        <Col xs={6} sm={12} md={12} lg={3}>
                            <div className='itemComoFunciona'>
                                <i><img src={iconValor} /></i>
                                <h4>Receba <br/>o valor</h4>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default ComoFunciona;
