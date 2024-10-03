import React, { useState, useRef } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import { useMediaQuery } from 'react-responsive';
import Lightbox from 'react-image-lightbox'; // Importe o componente Lightbox
import './FunilariaTecnologia.scss';

// Imagens
import ImgGaleria1 from "./img/IMG_0062.webp";
import ImgGaleria2 from "./img/IMG_1256.webp";
import ImgGaleria3 from "./img/IMG_1405.webp";
import ImgGaleria4 from "./img/IMG_3397.webp";
import ImgGaleria5 from "./img/IMG_3432.webp";
import ImgGaleria6 from "./img/IMG_3435.webp";
import ImgGaleria7 from "./img/IMG_3436.webp";
import ImgGaleria8 from "./img/IMG_3531.webp";
import ImgGaleria9 from "./img/IMG_4060.webp";
import ImgGaleria10 from "./img/IMG_4550.webp";
import ImgGaleria11 from "./img/IMG_4555.webp";
import ImgGaleria12 from "./img/IMG_4842.webp";
import ImgGaleria13 from "./img/IMG_4845.webp";
import ImgGaleria14 from "./img/IMG_4881.webp";
import ImgGaleria15 from "./img/IMG_8901.webp";
import ImgGaleria16 from "./img/IMG_1217.webp";
import ImgGaleria17 from "./img/IMG_1951.webp";
import ImgGaleria18 from "./img/IMG_1279.webp";
import ImgGaleria19 from "./img/IMG_1255.webp";
import ImgGaleria20 from "./img/IMG_7254.webp";
import ImgGaleria21 from "./img/IMG_1984.webp";
import ImgGaleria22 from "./img/IMG_3425.webp";
import ImgGaleria23 from "./img/IMG_3502.webp";
import ImgGaleria24 from "./img/IMG_1857.webp";
import ImgGaleria25 from "./img/IMG_2613.webp";
import ImgGaleria26 from "./img/IMG_1985.webp";
import ImgGaleria27 from "./img/IMG_1233.webp";
import ImgGaleria28 from "./img/IMG_1257.webp";


function FunilariaTecnologia() {
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
        dots: isMobile ? false : true,
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
        ImgGaleria6, ImgGaleria7, ImgGaleria8, ImgGaleria9, ImgGaleria10,
        ImgGaleria11, ImgGaleria12, ImgGaleria13, ImgGaleria14, ImgGaleria15,
        ImgGaleria16, ImgGaleria17, ImgGaleria18, ImgGaleria19, ImgGaleria20,
        ImgGaleria21, ImgGaleria22, ImgGaleria23, ImgGaleria24, ImgGaleria25,
        ImgGaleria26, ImgGaleria27, ImgGaleria28
    ];

    return (
        <>
            <section className='FunilariaTecnologia' id="nossaEstrutura">
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={12}>
                            <h4>NOSSA ESTRUTURA</h4>
                            <h2>TECNOLOGIA DE PONTA <br /><strong>E RESULTADOS IMPECÁVEIS</strong></h2>
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={12}>
                            <Slider {...settings} ref={slider => { sliderRef = slider; }}>
                                {images.map((image, index) => (
                                    <div className='itemTecnologia' key={index} onClick={() => openLightbox(index)}>
                                        <div className='imgTecnologia' style={{ background: `url(${image}) no-repeat center / cover` }}></div>
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

export default FunilariaTecnologia;