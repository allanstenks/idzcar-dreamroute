import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import api from '../../../services/apiIdz';
import { useMediaQuery } from 'react-responsive';

// Style
import './Destaques.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigationIdz } from '../../../context/useNavigation';

// Componente
import LoadingRing from '../../../components/Loading';

function Destaques() {
    const [destaques, setDestaques] = useState([]);
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const { idzEvent } = useNavigationIdz();

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
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: isMobile ? true : false
    };

    const fetchDestaques = async () => {
        try {
            const response = await api.get('/api/destaques?status=ativo&origem=site');
            if (response.data) {
                setDestaques(response.data);
                console.log("Destaques", "response.data", response.data);
            } else {
                console.log('Nenhum destaque recebido da API.');
            }
        } catch (error) {
            console.error('Erro ao buscar os destaques:', error);
        }
    };

    useEffect(() => {
        fetchDestaques();
    }, []);

    // Função para agrupar os destaques em blocos de 6
    const chunkArray = (arr, chunkSize) => {
        const results = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            results.push(arr.slice(i, i + chunkSize));
        }
        return results;
    };

    const groupedDestaques = chunkArray(destaques, isMobile ? 1 : 6);
    
    return (
        <>
            {destaques && destaques.length > 0 ? (
                <section className='Destaques'>
                    <Container>
                        <Row>
                            <Col xs={12} sm={6} md={6} lg={12}>
                                <h2 className='titilos'><i></i><span>seleções <strong>especiais</strong></span></h2>
                            </Col>
                            
                            <Col xs={12} sm={12} md={12} lg={12} className='sliderDestaques'>
                                <Slider {...settings} ref={slider => { sliderRef = slider; }}>
                                    {groupedDestaques.map((group, index) => (
                                        <div className='group-slide' key={index}>
                                            <Row>
                                                {group.map((destaque, idx) => (
                                                    <Col xs={12} sm={4} md={4} key={idx} >
                                                        <div className='itemVeiculos'>
                                                            <div 
                                                                onClick={() => { 
                                                                    idzEvent("paginas_acessadas", `/detalhe/${destaque.seo_url}`)
                                                                    navigate(`/detalhe/${destaque.seo_url}`)
                                                                }}>
                                                                <div className="foto" style={{ background: `url(${api.defaults.baseURL}${destaque.imagem}) no-repeat center` }}>
                                                                    {destaque.blindado === 1 && <span>Blindados</span>}
                                                                    {parseInt(destaque.km.toString().replace('.', '')) < 10000 && (
                                                                        <span className='baixo'>
                                                                            <strong>BAIXA</strong> QUILOMETRAGEM
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="desc">
                                                                    <div className='modelo'>
                                                                        <h3>{destaque.titulo}<span> {destaque.ano_modelo} / {destaque.ano_fabricacao}</span></h3>
                                                                        <div className='marca' style={{ background: `url(${api.defaults.baseURL}${destaque.logomarca}) no-repeat center / contain` }}></div>
                                                                    </div>
                                                                    <div className='galeria'>
                                                                        <ul>
                                                                            {destaque.imagens.slice(0, 3).map((img, i) => (
                                                                                <li key={i}><img src={`${api.defaults.baseURL}/${img.imagem}`} /></li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                    <div className="btn btn-plus"><Icon className="icons" icon="basil:arrow-up-outline" /></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    ))}
                                </Slider>
                            </Col>

                            <Col xs={12} sm={6} md={6} lg={12}>
                                <div className='headerAction'>
                                    <a onClick={() => navigate(`/Busca/`)} className="btn btn-quaternary">
                                        Veja todos <Icon className="icons" icon="basil:arrow-up-outline" />
                                    </a>
                                </div>
                            </Col>

                            {destaques.length > 6 && (
                                <Col xs={12} sm={12} md={12} lg={12} className='SliderControl'>
                                    <a className='nextSlider' onClick={next}><Icon className="icons" icon="ooui:previous-rtl" /></a>
                                    <a className='prevSlider' onClick={previous}><Icon className="icons" icon="ooui:previous-ltr" /></a>
                                </Col>
                            )}
                        </Row>
                    </Container>
                </section>
            ) : <LoadingRing height='630' background='' />}
        </>
    );
}

export default Destaques;
