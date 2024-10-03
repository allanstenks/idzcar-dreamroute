import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import { useMediaQuery } from 'react-responsive';
import Lightbox from 'react-image-lightbox'; // Importe o componente Lightbox

// Style
import './GaleriaProfilm.scss';

// Imagens
import ImgGaleria1 from "./img/imgProfilm01.webp";
import ImgGaleria2 from "./img/imgProfilm02.webp";
import ImgGaleria3 from "./img/imgProfilm03.webp";

function GaleriaProfilm() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const [lightboxIsOpen, setLightboxIsOpen] = useState(false); // Estado para controlar a abertura do Lightbox
    const [photoIndex, setPhotoIndex] = useState(0); // Índice da imagem a ser exibida no Lightbox

    let sliderRef = useRef(null);
    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };

    var settings = {
        dots: isMobile ? false : false,
        infinite: true,
        speed: 500,
        slidesToShow: isMobile ? 1 : 3,
        slidesToScroll: isMobile ? 1 : 3,
        centerMode: true,
        centerPadding: '0px',
    };

    // Função para abrir o Lightbox com a imagem clicada
    const openLightbox = (index) => {
        setPhotoIndex(index);
        setLightboxIsOpen(true);
    };

    // Array com as URLs das imagens
    const images = [
        ImgGaleria1, ImgGaleria2, ImgGaleria3
    ];

    return (
        <>
            <section className='GaleriaProfilm'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={12}>
                            <Slider {...settings} ref={slider => { sliderRef = slider; }}>
                                {images.map((image, index) => (
                                    <div className='itemGaleriaCeramicPro' key={index} onClick={() => openLightbox(index)}>
                                        <div className='imgGaleriaCeramicPro' style={{ background: `url(${image}) no-repeat center / cover` }}></div>
                                    </div>
                                ))}
                            </Slider>
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={12} className='controlSlider'>
                            <a className='nextSlider' onClick={next}><Icon className="icons" icon="ooui:previous-rtl" /></a>
                            <a className='prevSlider' onClick={previous}><Icon className="icons" icon="ooui:previous-ltr" /></a>
                        </Col>
                    </Row>
                </Container>
            </section>

            {lightboxIsOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setLightboxIsOpen(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                />
            )}
        </>
    );
}

export default GaleriaProfilm;