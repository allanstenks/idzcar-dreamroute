import React, { useState } from 'react';
import Slider from 'react-slick';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import api from '../../../services/apiIdz';
import { useMediaQuery } from 'react-responsive';

// Styles
import './Galeria.scss';

function Galeria({ fotos }) {
    const fotosArray = fotos ?? [];
    const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const openLightbox = (index) => {
        setCurrentPhotoIndex(index);
        setLightboxIsOpen(true);
    };

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: fotosArray.length === 1 ? 1 : fotosArray.length === 2 ? 2 : 3,
        slidesToScroll: 1,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow:1,
                    slidesToScroll: 1,
                    variableWidth: false,
                    centerMode: true,
                    centerPadding: '60px',
                }
            }
        ]
    };

    return (
        <>
            <div className='galeriaContainer'>
                <Slider {...settings}>
                    {fotosArray.map((foto, index) => (
                        <div key={index} className="photo" onClick={() => openLightbox(index)}>
                            <img
                                src={`${api.defaults.baseURL}${fotosArray.length === 1 ? foto.imagem : foto.thumb}`}
                                alt={`Foto ${index + 1}`}
                                style={{
                                    width: '100%',
                                    maxWidth: 'none',
                                    height: isMobile ? '300px' : '500px',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                    ))}
                </Slider>
                <button className='btn btn-tertiary' onClick={() => openLightbox(0)}>Ver Todas as Fotos</button>
            </div>
            {lightboxIsOpen && (
                <Lightbox
                    mainSrc={`${api.defaults.baseURL}${fotosArray[currentPhotoIndex].imagem}`}
                    nextSrc={`${api.defaults.baseURL}${fotosArray[(currentPhotoIndex + 1) % fotosArray.length].imagem}`}
                    prevSrc={`${api.defaults.baseURL}${fotosArray[(currentPhotoIndex + fotosArray.length - 1) % fotosArray.length].imagem}`}
                    onCloseRequest={() => setLightboxIsOpen(false)}
                    onMovePrevRequest={() =>
                        setCurrentPhotoIndex((currentPhotoIndex + fotosArray.length - 1) % fotosArray.length)
                    }
                    onMoveNextRequest={() =>
                        setCurrentPhotoIndex((currentPhotoIndex + 1) % fotosArray.length)
                    }
                />
            )}
        </>
    );
}

export default Galeria;
