import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import { useMediaQuery } from 'react-responsive';

// Style
import './EsteticaInsufilm.scss';



function Insufilm() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    let sliderRef = useRef(null);
    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };

    var settings = {
        dots: isMobile ? false : true,
        infinite: true,
        speed: 500,
        slidesToShow: isMobile ? 1 : 3,
        slidesToScroll: 3,
        centerMode: true,
        centerPadding: '0px', 
    };

    return (
        <>
            <section className='Insufilm bg'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={6}>

                        </Col>
                        <Col xs={12} sm={6} md={12} lg={6}>
                            <h4>Nossos serviços</h4>
                            <h2>APLICAÇÃO DE INSUFILM</h2>
                            <p>
                            Aqui na 1021, a instalação de insulfilm é diferente do convencional. Temos moldes dos veículos para fazer os recortes dos insulfimes fora do carro, sem perigo de riscar o seu vidro ou as borrachas do seu carro. <br/><br/>
                            Além disso, durante a instalação, garantimos proteção extra nos módulos e parte elétrica para assegurar o bom funcionamento do veículo. Nossas películas anti vandalismo são aplicadas apenas com a desmontagem total do vidro para garantir a proteção máxima que essas películas oferecem.
                            </p>
                        </Col>
                    </Row>
                    </Container>
            </section>
            <section className='Insufilm'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={12}>
                            <Slider {...settings} ref={slider => {sliderRef = slider;}}>
                                
                                <div className='itemInsufilm'>
                                    <div className='imgInsufilm'>
                                        <h2>ANTI VANDALISMO PS8 </h2>
                                        <p>Insufilme de proteção com 200 microns de espessura. Mitiga riscos de estilhaço de vidros e conta com a proteção contra raios UV. Essa película é aplicada apenas com a desmontagem dos vidros para garantir maior proteção.</p>
                                   </div>
                                </div>
                                <div className='itemInsufilm'>
                                    <div className='imgInsufilm'>
                                        <h2>ANTI VANDALISMO PS12 </h2>
                                        <p>Insufilme de proteção com 300 microns de espessura. Mitiga riscos de estilhaço de vidros e conta com a proteção contra raios UV. Essa película é aplicada apenas com a desmontagem dos vidros para garantir maior proteção.</p>
                                   </div>
                                </div>
                                <div className='itemInsufilm'>
                                   <div className='imgInsufilm'>
                                        <h2>Profissional</h2>
                                        <p>Insulfilme de alta qualidade e transparência com tser de até 35% de rejeição de calor com 3 anos de garantia.</p>
                                   </div>
                                </div>
                                <div className='itemInsufilm'>
                                   <div className='imgInsufilm'>
                                        <h2>NANO CARBONO</h2>
                                        <p>Insufilme de base cerâmica de alta qualidade e transparência com até 46% de rejeição de energia solar com 7 anos de garantia.</p>
                                   </div>
                                </div>
                                <div className='itemInsufilm'>
                                    <div className='imgInsufilm'>
                                        <h2> Zivent Zv80 </h2>
                                        <p>Insulfilme com poliéster ótico de ultra definição, mesmo material usado em smartphones e tablets da apple e samsung. tser de redução de calor de até 67,9 %. 10 anos de garantia.</p>
                                   </div>
                                </div>
                                <div className='itemInsufilm'>
                                    <div className='imgInsufilm'>
                                        <h2>Zivent Zv90 </h2>
                                        <p>Insulfilme com poliéster ótico de ultra definição, mesmo material usado em smartphones e tablets da apple e samsung. tser de redução de calor de até 71,5 %. 10 anos de garantia. Possibilidade de ser transparente.</p>
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

export default Insufilm;
