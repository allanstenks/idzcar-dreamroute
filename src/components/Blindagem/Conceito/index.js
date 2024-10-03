import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import { useNavigate  } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

// Style
import './Conceito.scss';

//Imagens
import imgConceito from './img/imgConceito.webp'
import imgConceitoMobile from './img/bgBlindagemPageMobile.webp'

function Conceito() {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });


    return (
        <>
            <section className='Conceito'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={4} className='boxConceito'>
                            <div className='textConceito'>
                                <h2>Um <strong>novo conceito</strong> de prazer ao dirigir o seu blindado nível IIIA</h2>
                                <p>Com tecnologia de ponta, essa blindagem redefine o conceito de excelência. Imagine um produto que une segurança e estabilidade, mantendo o prazer de dirigir mesmo atrás do volante de um carro blindado. A blindagem de Alta Performance 1021 foi desenvolvida nos mínimos detalhes por apaixonados por carros ao longo de 15 anos e uma busca incessante por melhorias. Unimos tudo isso á um pós-venda extremamente preocupado com o bem-estar dos nossos clientes e amigos.</p>
                                <a onClick={() => navigate(`/blindagem/cotacao`)} className="btn btn-primary">FAÇA UM ORÇAMENTO</a> 
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={6}>
                            <img src={!isMobile ? imgConceito : imgConceitoMobile} />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default Conceito;
