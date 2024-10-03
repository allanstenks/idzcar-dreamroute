import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import api from '../../../services/apiIdz';
import { useMediaQuery } from 'react-responsive';

// Style
import './Depoimentos.scss';
import 'react-tooltip/dist/react-tooltip.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Depoimentos() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    let sliderRef = useRef(null);
    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };
    var settings = {
        dots: false,
        arrow: false,
        speed: 500,
        slidesToShow: isMobile ? 1 : 3,
        slidesToScroll: 1 ,
        infinite: isMobile ? true : false
    };

    const [depoimentos, setDepoimentos] = useState([]);

    useEffect(() => {
        api.get('/api/depoimentos')
            .then(response => {
                setDepoimentos(response.data);
            })
            .catch(error => {
                console.error('Erro ao obter depoimentos:', error);
            });
    }, []);

    return (
        <>
            {depoimentos && depoimentos.length > 0 && (
                <section className='depoimentos'>
                    <Container>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                <h2 className='titilos'><span>depoimentos</span>o que nossos clientes dizem</h2>
                            </Col>
                        </Row>
                        <Row>
                            {depoimentos.length > 3 && (
                            <Col xs={12} sm={12} md={12} lg={12} className='SliderControl'>
                                <a className='nextSlider' onClick={next}><Icon className="icons" icon="ooui:previous-rtl"  /></a>
                                <a className='prevSlider' onClick={previous}><Icon className="icons" icon="ooui:previous-ltr" /></a>
                            </Col>
                            )}
                            <Col xs={12} sm={6} md={6} lg={12} className='sliderDepoimento'>
                                <Slider {...settings} ref={slider => {sliderRef = slider;}}>
                                    {depoimentos.map(depoimento => (
                                        <div className='itemDepoimento'>
                                            <p>{depoimento.depoimento}</p>
                                            <div className='avatar'>
                                                {depoimento.imagem ? (
                                                    <i style={{ background: `url(${api.defaults.baseURL + depoimento.imagem}) no-repeat center / cover` }}></i>
                                                ) : (
                                                    <div className='nome-avatar'>
                                                        {depoimento.nome.split(' ').map(nome => nome.charAt(0).toUpperCase()).join('')}
                                                    </div>
                                                )}
                                                <div className='desc'>
                                                    <h4>{depoimento.nome}</h4>
                                                    <h5>{depoimento.dt_inclusao}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </Col>

                        </Row>
                    </Container>
                </section>
            )}
        </>                           
    );
}

export default Depoimentos;
