import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import { useNavigate  } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

// Style
import './EsteticaServicos.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


//Imagens
import imgLavagem from './img/imgLavagem.webp'
import imPolimento from './img/imPolimento.webp'
import imgPpf from './img/ppf.webp'
import imgInsufilm from './img/insufilm.webp'
import imgCeramic from './img/ceramic.webp'



function EsteticaServicos() {
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
            <section className='EsteticaServicos'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={12}>
                            <h2>Conheça nossos <br /><strong>SERVIÇOS DE estética</strong></h2>
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={12} >
                            <Slider {...settings} ref={slider => {sliderRef = slider;}}>
                                <div className='itemServicos'>
                                   <div className='imgServicos' style={{ background: `url(${imgLavagem})  no-repeat center / cover `}}></div>
                                   <div className='textoServicos'>
                                        <div className='textoIncluirServicos'>
                                            <h4>nossos serviços</h4>
                                            <h2>Lavagem detalhada</h2>
                                            <p>A lavagem detalhada é o primeiro passo para deixar o seu carro brilhando. Nossos profissionais utilizam técnicas e produtos especiais para remover toda a sujeira, poeira e detritos do seu carro.</p>
                                            <a onClick={() => navigate(`/faleconosco`)} className="btn btn-primary">FALE CONOSCO</a>
                                        </div>
                                   </div>
                                </div>
                                <div className='itemServicos'>
                                   <div className='imgServicos' style={{ background: `url(${imPolimento})  no-repeat center / cover`}}></div>
                                   <div className='textoServicos'>
                                        <div className='textoIncluirServicos'>
                                            <h4>nossos serviços</h4>
                                            <h2>Polimento técnico</h2>
                                            <p>O polimento técnico é o procedimento que remove os riscos e arranhões da pintura do carro, deixando-a com um brilho intenso e uma aparência mais nova. Aqui na 1021 só utilizamos os produtos high end do mercado, com compostos e boinas alemãs para não agredir o verniz do seu carro.</p>
                                            <a onClick={() => navigate(`/faleconosco`)} className="btn btn-primary">FALE CONOSCO</a>
                                        </div>
                                   </div>
                                </div>
                                <div className='itemServicos'>
                                   <div className='imgServicos' style={{ background: `url(${imgPpf})  no-repeat center / cover`}}></div>
                                   <div className='textoServicos'>
                                        <div className='textoIncluirServicos'>
                                            <h4>nossos serviços</h4>
                                            <h2>APLICAÇÃO DE PPF</h2>
                                            <p>Proteja a pintura do seu veículo com a aplicação de PPF. Aqui na 1021, dobramos as pontas sem colocar o estilete no seu carro, evitando possíveis riscos na sua pintura. Essa é uma película transparente de alta tecnologia e oferece uma extrema resistência contra arranhões, pedras e outros danos do dia a dia. Mantenha o brilho e a beleza do seu carro por mais tempo com o PPF.</p>
                                            <a onClick={() => navigate(`/faleconosco`)} className="btn btn-primary">FALE CONOSCO</a>
                                            
                                        </div>
                                   </div>
                                </div>
                                <div className='itemServicos'>
                                   <div className='imgServicos' style={{ background: `url(${imgInsufilm})  no-repeat center / cover`}}></div>
                                   <div className='textoServicos'>
                                        <div className='textoIncluirServicos'>
                                            <h4>nossos serviços</h4>
                                            <h2>INSTALAÇÃO DE INSULFILME</h2>
                                            <p>Controle a entrada de luz e calor no seu veículo com a aplicação de Insulfilm. Esta película de alta qualidade oferece privacidade, reduz o brilho excessivo e bloqueia os raios UV prejudiciais. Mantenha o interior do seu carro mais fresco e protegido com Insulfilm.</p>
                                            <a onClick={() => navigate(`/faleconosco`)} className="btn btn-primary">FALE CONOSCO</a>
                                        </div>
                                   </div>
                                </div>
                                <div className='itemServicos'>
                                   <div className='imgServicos' style={{ background: `url(${imgCeramic})  no-repeat center / cover`}}></div>
                                   <div className='textoServicos'>
                                        <div className='textoIncluirServicos'>
                                            <h4>nossos serviços</h4>
                                            <h2>Ceramic Pro</h2>
                                            <p>Dê ao seu carro uma proteção de nível superior com CeramicPro. Esta nanotecnologia revolucionária cria uma barreira resistente contra os elementos, protegendo a pintura contra raios UV, sujeira, insetos e manchas. Experimente o brilho duradouro e a facilidade de limpeza com CeramicPro.</p>
                                            <a onClick={() => navigate(`/faleconosco`)} className="btn btn-primary">FALE CONOSCO</a>
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

export default EsteticaServicos;
