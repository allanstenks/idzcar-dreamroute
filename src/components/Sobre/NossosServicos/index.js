import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useNavigate  } from 'react-router-dom';

// Style
import './NossosServicos.scss';
import 'react-tooltip/dist/react-tooltip.css'


// Imagens
import imgBlindagem from "./img/imgBlindagem.webp";
import imgEstetica from "./img/imgEstetica.webp";
import imgFunalizaria from "./img/imgFunalizaria.webp";
import imgVenda from "./img/imgVenda.webp";

function NossosServicos() {
    const navigate = useNavigate();
    return (
        <>
            <section className='nossosServicosSobre'>
                <Container>
                <Row className='justify-content-md-center'>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <h3>conheça</h3>
                            <h2>nossos serviços</h2>
                            <p>Na 1021 Motors, oferecemos uma gama completa de serviços projetados para superar suas expectativas e elevar sua experiência automotiva.</p>
                        </Col>
                    </Row>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={12} md={4} lg={5}>
                            <div className='itemNossosServicos'>
                                <div className="foto fotoBlindagem">
                                    <h3>Blindagem</h3>
                                    <img src={imgBlindagem} />
                                    <span className='rodaTraseira'></span>
                                    <span className='rodaFrente'></span>
                                </div>
                                <div className="desc">
                                    <div className='servico'>
                                        <div className='textServico'>
                                            <h6>nossos serviços</h6>
                                            <h5>Blindagem de Alta Performance</h5>
                                            <p>Sua segurança é nossa prioridade. Conte conosco para proporcionar a mais avançada tecnologia em blindagem, mantendo-o protegido sem comprometer o desempenho do seu carro. </p>
                                        </div>
                                    </div>
                                    <a onClick={() => navigate(`/blindagem`)} className="btn btn-primary">Saiba mais</a>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={5}>
                            <div className='itemNossosServicos'>
                                <div className="foto fotoEstetica">
                                    <h3>Estética</h3>
                                    <img src={imgEstetica} />
                                    <span className='rodaTraseira'></span>
                                    <span className='rodaFrente'></span>
                                </div>
                                <div className="desc">
                                    <div className='servico'>
                                        <div className='textServico'>
                                            <h6>nossos serviços</h6>
                                            <h5>ESTÉTICA AUTOMOTIVA</h5>
                                            <p>Cuidamos do seu veículo como se fosse nosso. Com uma experiência de mais de 15 anos e uma equipe especializada em estética automotiva, a 1021 te oferece tudo o que existe de mais avançado no mercado desde uma lavagem detalhada até a aplicação de um PPF.</p>
                                        </div>
                                    </div>
                                    <a onClick={() => navigate(`/estetica`)} className="btn btn-primary">Saiba mais</a>
                                </div>
                            </div>
                        </Col>   
                        <Col xs={12} sm={12} md={4} lg={5}>
                            <div className='itemNossosServicos'>
                                <div className="foto fotoFunilaria">
                                    <h3>funilaria</h3>
                                    <img src={imgFunalizaria} />
                                    <span className='rodaTraseira'></span>
                                    <span className='rodaFrente'></span>
                                </div>
                                <div className="desc">
                                    <div className='servico'>
                                        <div className='textServico'>
                                            <h6>nossos serviços</h6>
                                            <h5>Funilaria Premium</h5>
                                            <p>Para aqueles pequenos imprevistos que a vida nos traz, nossa funilaria premium restaura seu veículo nos padrões originais de fábrica, com detalhes que fazem toda a diferença.</p>
                                        </div>
                                    </div>
                                    <a onClick={() => navigate(`/funilaria`)} className="btn btn-primary">Saiba mais</a>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={5}>
                            <div className='itemNossosServicos'>
                                <div className="foto fotoVendas">
                                    <h3>Venda</h3>
                                    <img src={imgVenda} />
                                    <span className='rodaTraseira'></span>
                                    <span className='rodaFrente'></span>
                                </div>
                                <div className="desc">
                                    <div className='servico'>
                                        <div className='textServico'>
                                            <h6>nossos serviços</h6>
                                            <h5>Venda de Veículos Zero Km e Seminovos</h5>
                                            <p>Seja o primeiro a desbravar novos caminhos ou escolher a confiança de um seminovo certificado. Trabalhamos com as melhores montadoras do mercado, garantindo qualidade e variedade em nossa seleção.</p>
                                        </div>
                                    </div>
                                    <a onClick={() => navigate(`/busca/`)} className="btn btn-primary">Saiba mais</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default NossosServicos;
