import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import api from '../../../services/apiIdz';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import LoadingRing from '../../../components/Loading';

function ListaImportados() {
    const [importados, setImportados] = useState([]);
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    let sliderRef = useRef(null);
    const next = () => sliderRef.slickNext();
    const previous = () => sliderRef.slickPrev();

    const settings = {
        dots: false,
        arrow: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: isMobile ? true : false
    };

    const fetchImportados = async () => {
        try {
            const response = await api.get('/api/importacao');
            if (response.data) {
                console.log("response.data", response.data)
                setImportados(response.data);
            }
        } catch (err) {
            console.error('Erro ao buscar importações:', err);
        }
    };

    useEffect(() => {
        fetchImportados();
    }, []);

    const chunkArray = (arr, chunkSize) => {
        const results = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            results.push(arr.slice(i, i + chunkSize));
        }
        return results;
    };

    const grouped = chunkArray(importados, isMobile ? 1 : 6);

    return (
        <>
            {importados.length > 0 ? (
                <section className='Destaques'>
                    <Container>
                        <Row>
                            <Col xs={12}>
                                <h2 className='titilos'>
                                    <i></i><span>importações <strong>novas</strong></span>
                                </h2>
                            </Col>

                            <Col xs={12} className='sliderDestaques'>
                                <Slider {...settings} ref={slider => { sliderRef = slider; }}>
                                    {grouped.map((group, index) => (
                                        <div className='group-slide' key={index}>
                                            <Row>
                                                {group.map((carro, idx) => (
                                                    <Col xs={12} sm={4} md={4} key={idx}>
                                                        <div className='itemVeiculos'>
                                                            <div onClick={() => navigate(`/importado/${carro.id}`)}>
                                                                <div className="foto" style={{ background: `#FFFFFF url(${process.env.REACT_APP_API_URL}${carro.coverImage}) no-repeat center / cover` }} />
                                                                <div className="desc">
                                                                    <div className='modelo'>
                                                                        <h4 className='marca'>{carro.brand}</h4>
                                                                        <h3>{carro.model}</h3>
                                                                        <h4 className='marca'>{carro.version}</h4>
                                                                        <h3>
                                                                            <span>{carro.productionYear} / {carro.manufactureYear}</span>
                                                                        </h3>
                                                                    </div>
                                                                    <div className='valor'>
                                                                        <h4>R$ {parseFloat(carro.price).toLocaleString('pt-BR')}</h4>
                                                                        <div className='acao'>
                                                                            <div className="btn btn-plus"><Icon className="icons" icon="basil:arrow-up-outline" /></div>
                                                                        </div>
                                                                    </div>
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

                            <Col xs={12}>
                                <div className='headerAction'>
                                    <a onClick={() => navigate(`/importacoes`)} className="btn btn-quaternary">
                                        Ver todas <Icon className="icons" icon="basil:arrow-up-outline" />
                                    </a>
                                </div>
                            </Col>

                            {importados.length > 6 && (
                                <Col xs={12} className='SliderControl'>
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

export default ListaImportados;