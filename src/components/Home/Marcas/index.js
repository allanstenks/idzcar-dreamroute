import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import api from '../../../services/apiIdz';
import { useMediaQuery } from 'react-responsive';

// Style
import './Marcas.scss';
import 'react-tooltip/dist/react-tooltip.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Marcas() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    let sliderRef = useRef(null);
    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };
    var settings = {
        dots: true,
        arrow: false,
        speed: 500,
        slidesToShow: isMobile ? 1 : 5,
        slidesToScroll: 1 ,
        infinite: isMobile ? true : false
    };

    const [marcas, setMarcas] = useState([]);

    useEffect(() => {
      api.get('/api/marcas?origem=site&existentes=1')
            .then(response => {
                console.log("Marcas", response.data);
                setMarcas(response.data);
            })
            .catch(error => {
                console.error('Erro ao obter marcas:', error);
                
            });
    }, []);

    return (
        <>
            {marcas && marcas.length > 0 && (
                <section className='marcas'>
                    <Container>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                <h2 className='titilos'>As marcas mais <strong>lendárias</strong> estão aqui.</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6} md={6} lg={12} className='sliderMarcas'>
                                <Slider {...settings} ref={slider => {sliderRef = slider;}}>
                                    {marcas.map(marca => (
                                        <div className='itemMarcas'>
                                            <img src={`https://api.dreamroute.com.br${marca.logo}`} alt=""  />
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

export default Marcas;
