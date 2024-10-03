import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import { useMediaQuery } from 'react-responsive';
import Lightbox from 'react-image-lightbox'; // Importe o componente Lightbox

// Style
import './GaleriaCeramicPro.scss';

// Imagens
import ImgGaleria1 from "./img/IMG_2200.webp";
import ImgGaleria2 from "./img/IMG_7269.webp";
import ImgGaleria3 from "./img/IMG_7139.webp";
import ImgGaleria4 from "./img/IMG_7134.webp";
import ImgGaleria5 from "./img/IMG_7137.webp";
import ImgGaleria7 from "./img/IMG_6987.webp";
import ImgGaleria8 from "./img/IMG_0137.webp";
import ImgGaleria9 from "./img/IMG_3212.webp";
import ImgGaleria10 from "./img/IMG_2236.webp";
import ImgGaleria11 from "./img/IMG_7602.webp";
import ImgGaleria12 from "./img/IMG_6983.webp";
import ImgGaleria13 from "./img/IMG_8645.webp";
import ImgGaleria14 from "./img/IMG_8600.webp";
import ImgGaleria15 from "./img/IMG_8632.webp";
import ImgGaleria16 from "./img/IMG_6130.webp";
import ImgGaleria17 from "./img/IMG_6122.webp";
import ImgGaleria18 from "./img/IMG_6133.webp";
import ImgGaleria19 from "./img/IMG_4230.webp";
import ImgGaleria20 from "./img/IMG_4029.webp";
import ImgGaleria21 from "./img/IMG_4030.webp";
import ImgGaleria22 from "./img/IMG_7601.webp";
import ImgGaleria23 from "./img/IMG_7600.webp";
import ImgGaleria24 from "./img/IMG_8457.webp";

function GaleriaImgGaleria() {
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
        slidesToScroll: 3,
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
        ImgGaleria1, ImgGaleria2, ImgGaleria3, ImgGaleria4, ImgGaleria5, 
        ImgGaleria7, ImgGaleria8, ImgGaleria9, ImgGaleria10, 
        ImgGaleria11, ImgGaleria12, ImgGaleria13, ImgGaleria14, ImgGaleria15,
        ImgGaleria16,  ImgGaleria17,  ImgGaleria18,  ImgGaleria19, ImgGaleria20,
        ImgGaleria21,  ImgGaleria22,  ImgGaleria23,  ImgGaleria24
    ];

    return (
        <>
            <section className='GaleriaCeramicPro'>
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

export default GaleriaImgGaleria;