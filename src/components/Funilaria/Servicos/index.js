import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import { useNavigate  } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

// Style
import './FunilariaServicos.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


//Imagens
import imgReparos from './img/imgReparos.webp'
import imgPinturas from './img/imgPinturas.webp'

function FunilariaServicos() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const navigate = useNavigate();
    let sliderRef = useRef(null);
    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };

    var settings = {
        dots: isMobile ? false : true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1 
    };

    return (
        <>
            <section className='FunilariaServicos'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={12}>
                            <h2>Conheça nossos <br /><strong>SERVIÇOS DE FUNILARIA</strong></h2>
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={12} >
                            <Slider {...settings} ref={slider => {sliderRef = slider;}}>
                                <div className='itemServicos'>
                                   <div className='imgServicos' style={{ background: `url(${imgReparos})  no-repeat center / cover `}}></div>
                                   <div className='textoServicos'>
                                        <div className='textoIncluirServicos'>
                                            <h4>nossos serviços</h4>
                                            <h2>Reparo de colisões</h2>
                                            <p>Somos especialistas em reparo de colisões. Utilizamos técnicas e equipamentos de última geração para reparar o seu carro de forma rápida e eficaz, sem comprometer a qualidade da pintura.</p>
                                            <a onClick={() => navigate(`/faleconosco`)} className="btn btn-primary" to="/blindagem/cotacao">FALE CONOSCO</a>
                                        </div>
                                   </div>
                                </div>
                                <div className='itemServicos'>
                                   <div className='imgServicos' style={{ background: `url(${imgPinturas})  no-repeat center / cover`}}></div>
                                   <div className='textoServicos'>
                                        <div className='textoIncluirServicos'>
                                            <h4>nossos serviços</h4>
                                            <h2>RETOQUES NA PINTURA</h2>
                                            <p>Se o seu carro sofreu pequenos danos na pintura, como arranhões ou amassados, oferecemos serviços de retoque na pintura para devolver a ele a aparência de novo.</p>
                                            <a onClick={() => navigate(`/faleconosco`)} className="btn btn-primary" to="/blindagem/cotacao">FALE CONOSCO</a>
                                        </div>
                                   </div>
                                </div>
                            </Slider>
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={12} className='controlSlider'>
                            <a className='nextSlider' onClick={next}><Icon className="icons" icon="ooui:previous-rtl"  /></a>
                            <a className='prevSlider' onClick={previous}><Icon className="icons" icon="ooui:previous-ltr" /></a>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default FunilariaServicos;
