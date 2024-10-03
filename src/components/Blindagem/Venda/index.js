import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";


// Style
import './Venda.scss';


//Imagens
import imgVenda from './img/imgVenda.webp'

function Venda() {

    return (
        <>
            <section className='Venda'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={6}>
                            <div className='imgVenda'>
                                <img src={imgVenda} />
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={6}  className='boxVenda'>
                            <div className='textVenda'>
                                <i></i>
                                <h3><strong>Além</strong><br /> da Venda</h3>
                                <h5>Nossa Promessa de Excelência Pós-Venda Diretamente em Sua Porta!</h5>
                                <ul>
                                    <li>Pós venda a domicílio no primeiro ano (gratuito nos 6 primeiros meses)</li>
                                    <li>Não é necessário fazer revisões anuais para manter a garantia da blindagem. Revisões são opcionais, com custo.</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default Venda;
