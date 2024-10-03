import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate  } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import api from '../../../services/apiIdz';
import { useMediaQuery } from 'react-responsive';


// Style
import './Blindados.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Componentes
import { useNavigationIdz } from '../../../context/useNavigation';

function Blindados() { 
    const navigate = useNavigate();
    const { idzEvent } = useNavigationIdz()
    const [blindados, setBlindados] = useState([]);
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
        infinite: false ,
        slidesToShow: isMobile ? 1 : 3,
        slidesToScroll: 1,
        infinite: (blindados.length > 1 && isMobile) ? true : false,
    };

    const fetchBlindados = async () => {
        try {
            const response = await api.get('/api/veiculos?origem=site&status=ativo&blindado=1');
            if (response.data) {
                setBlindados(response.data);
            } else {
                console.log('Nenhum destaque recebido da API.');
            }
        } catch (error) {
            console.error('Erro ao buscar os destaques:', error);
        }
    };

    useEffect(() => {
        fetchBlindados();
    }, []);


    return (
        <>
            {blindados && blindados.length > 0 && (
                <section className='Destaques blindados'>
                    <Container>
                        <Row>
                            <Col xs={12} sm={6} md={6} lg={6}>
                                <h2 className='titilos'><span>nossos carros</span>BLINDADOS</h2>
                            </Col>
                            <Col xs={12} sm={6} md={6} lg={6}>
                                <div className='headerAction'>
                                    <a onClick ={()=>navigate(`/Busca/`)} className="btn btn-primary" to="/">veja todos os modelos</a>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} className='sliderDestaques' style={{ width: blindados.length > 1 ? '80%' : '100%' }}>
                                <Slider {...settings} ref={slider => {sliderRef = slider;}}>
                                    {blindados.map((blindados,index) => (
                                        <div onClick={() => {
                                            idzEvent("paginas_acessadas", `/detalhe/${blindados.seo_url}`)
                                            navigate(`/detalhe/${blindados.seo_url}`)
                                        }} className='itemVeiculos' key={index}> 
                                            <div className="foto" style={{ background: `url(${api.defaults.baseURL}${blindados.imagem})  no-repeat center`}}>
                                                <span>Blindados</span>
                                            </div>
                                            <div className="desc">
                                                <div className='modelo'>
                                                    <h3><span>ano {blindados.ano_fabricacao}</span>{blindados.titulo}</h3>
                                                    <div className='marca'></div>
                                                </div>
                                                
                                                <div className='valor'>
                                                    <div className='valorAno'>
                                                        <span>valor</span>
                                                        <h5>{blindados.preco}</h5>
                                                        <h6>{blindados.ano_fabricacao} / {blindados.ano_modelo}</h6>
                                                    </div>
                                                    <div className="btn btn-plus"><Icon className="icons" icon="fe:plus" /></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                
                                </Slider>
                            </Col>
                            {blindados.length > 3 && (
                                <Col xs={12} sm={12} md={12} lg={12} className='SliderControl'>
                                    <a className='nextSlider' onClick={next}><Icon className="icons" icon="ooui:previous-rtl"  /></a>
                                    <a className='prevSlider' onClick={previous}><Icon className="icons" icon="ooui:previous-ltr" /></a>
                                </Col>
                            )}
                        </Row>
                    </Container>
                </section>
            )}
        </>

    );
}

export default Blindados;
