import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate  } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import api from '../../../services/apiIdz';

// Style
import './PodeGostar.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PodeGostar() {
    const [relacionados, setRelacionados] = useState([]);
    const navigate = useNavigate();

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
        infinite: false ,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const fetchRelacionados = async () => {
        try {
            const response = await api.get(`/api/veiculos`);
            if (response.data) {
                setRelacionados(response.data);
            } else {
                console.log('Nenhum destaque recebido da API.');
            }
        } catch (error) {
            console.error('Erro ao buscar os destaques:', error);
        }
    };

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        fetchRelacionados();
        scrollToTop();
    }, []);
    return (
        <>
            <section className='PodeGostar'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <h2 className='titilos'><span>nossos carros</span>você também pode gostar</h2>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <div className='headerAction'>
                                <a onClick={() => navigate(`/Busca/`)} className="btn btn-primary" to="/">veja nossas sugestões</a>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12} className='sliderDestaques'>
                            <Slider {...settings} ref={slider => {sliderRef = slider;}}>
                                {relacionados.map((relacionado) => (
                                    <div className='itemVeiculos'>
                                        <div className="foto" style={{ background: `url(${api.defaults.baseURL}${relacionado.imagem})  no-repeat center`}}>
                                                {relacionado.blindado === 1 && (
                                                <span>Blindados</span> 
                                                )} 
                                        </div>
                                        <div className="desc">
                                            <div className='modelo'>
                                                <h3><span>ano 2021</span>{relacionado.titulo}</h3>
                                                <div className='marca'></div>
                                            </div>
                                            
                                            <div className='valor'>
                                                <div className='valorAno'>
                                                    <span>valor</span>
                                                    <h5>{relacionado.preco}</h5>
                                                    <h6>{relacionado.ano_fabricacao} / {relacionado.ano_modelo}</h6>
                                                </div>
                                                <a onClick ={()=>navigate(`/detalhe/${relacionado.relacionado_id}`)} className="btn btn-plus"><Icon className="icons" icon="fe:plus" /></a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} className='SliderControl'>
                            <a className='nextSlider' onClick={next}><Icon className="icons" icon="ooui:previous-ltr"/></a>
                            <a className='prevSlider' onClick={previous}><Icon className="icons"  icon="ooui:previous-rtl"/></a>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default PodeGostar;
