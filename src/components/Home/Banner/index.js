import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import api from '../../../services/apiIdz';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';


// Style
import './Banner.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


//Imagens
import video from './img/capa-video.png'
import estetica from './img/estetica.png'
import bmw from './img/bmw.png'
import marcabmw from './img/marcabmw.png'

//Componentes
import VideoModal from '../VideoModal';
import { useNavigationIdz } from '../../../context/useNavigation';
import LoadingRing from '../../../components/Loading';

function Banner() {
    const navigate = useNavigate();
    const [banners, setBanners] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [videoId, setVideoId] = useState('');
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const { navigation, idzEvent } = useNavigationIdz()


    const openModal = (id) => {
        console.log("video:", id);
        setVideoId(id);
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    useEffect(() => {
        api.get('/api/banners?status=ativo')
            .then(response => {
                console.log("banner", response.data)
                setBanners(response.data);
            })
            .catch(error => {
                console.error('Erro ao obter banners:', error);
            });
    }, []);

    const renderBannerItem = (banner) => {

        if (banner.tipo_banner === 2) {
            const videosString = banner.veiculo.videos;
            let videos = [];

            try {
                videos = JSON.parse(videosString);
            } catch (error) {
                console.error('Erro ao analisar os links dos vídeos:', error);
            }

            const firstVideoUrl = videos.length > 0 ? videos[0] : '';
            return (
                <div key={banner.id} className='itemBanner tipo2'>
                    <div onClick={() => {
                        navigate(`/detalhe/${banner.link}`);
                        idzEvent("banners_clicados", banner.titulo);
                    }} className='chamadaBanner'>
                        <div className='textoBanner'>
                            <div className='alignBanner'>
                                <h5>DESTAQUES DO MÊS </h5>
                                <h3>{banner.veiculo.marca}</h3>
                                <h2>{banner.veiculo.titulo}</h2>
                                <p>{banner.chamada}</p>

                                <a className='link'>Saiba mais</a>
                                <a>Entre em Contato <Icon className="icons" icon="basil:arrow-up-outline" /></a>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => {
                        navigate(`/detalhe/${banner.link}`);
                        idzEvent("banners_clicados", banner.titulo);
                    }} className='imgBanner'>
                        <span>{banner.veiculo.marca}</span>
                        <img src={isMobile ? api.defaults.baseURL + banner.imagem_mobile : api.defaults.baseURL + banner.imagem_desktop}></img>
                    </div>
                    <div className="descBanner">
                        
                        <div className='inclusoPreco'>
                            <ul className='ano'>
                                <li><span>ANO</span>{banner.veiculo.ano}</li>
                            </ul>
                            <ul className='km'>
                                <li><span>KM</span>{banner.veiculo.km}</li>
                            </ul>
                            <ul className='preco'>
                                <li><span>Valor</span>{banner.veiculo.preco}</li>
                            </ul>
                        </div>
                        <div className='descVideo'>
                            {videos[0] !== "" && (
                                <div className='video' onClick={() => openModal(firstVideoUrl)} style={{ background: `rgba(34, 34, 34, 1) url(${api.defaults.baseURL + banner.veiculo.imagem}) no-repeat center / cover` }}>
                                    <i></i>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        } else if (banner.tipo_banner === 1) {
            return (
                <div key={banner.id} className='itemBanner'
                    onClick={() => {
                        navigate(`${banner.link}`);
                        idzEvent("banners_clicados", banner.titulo);
                    }}>
                    <div className='imgBanner' style={{ background: `url(${isMobile ? api.defaults.baseURL + banner.imagem_mobile : api.defaults.baseURL + banner.imagem_desktop}) no-repeat center top` }}>
                        <span>Nossos serviços</span>
                        <div className='saiba'><i><Icon icon="ic:baseline-plus" /></i><span>saiba mais</span></div>
                    </div>
                    <div className="descBanner">
                        
                        <div className='inclusoPreco'>
                            <ul className='incluso'>
                                {
                                    (banner['campanha']['listagem'] && banner['campanha']['listagem'] != '') ? banner['campanha']['listagem'].map((item, index) => (
                                        <li key={index}>{item}</li>
                                    )) : <></>
                                }

                            </ul>
                            
                            <div className='preco'>
                                <span>A partir de</span>
                                <h3>{banner.campanha.preco_de != "R$ 0,00" ? banner.campanha.preco_de : "Sob Consulta"}</h3>
                            </div>
                            
                        </div>
                        <div className='descVideo'>
                            <div className='desc'>
                                <h4>{banner.chamada}</h4>
                                <h3>{banner.titulo}</h3>
                            </div>
                            {banner.campanha.videos && (
                                <div className='video' onClick={() => openModal(banner.campanha.video)}>
                                    <img className="video" src={video} />
                                    <i><Icon icon="heroicons-outline:play" /></i>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        } else if (banner.tipo_banner === 3) {
            return (
                <div key={banner.id} className='itemBanner tipo3'
                    onClick={() => {
                        navigate(`${banner.link}`);
                        idzEvent("banners_clicados", banner.titulo);
                    }}>
                    <div className='imgBanner' style={{ background: `url(${isMobile ? api.defaults.baseURL + banner.imagem_mobile : api.defaults.baseURL + banner.imagem_desktop}) no-repeat center / cover` }}>
                        <div className='itemBannerContent'>
                            <div className='textoBanner'>
                                <div className='alignBanner'>
                                    <h4>{banner.chamada}</h4>
                                    <h3>{banner.titulo}</h3>
                                    <p>{banner.descricao_banner}</p>
                                    <a href={banner.link} className='btn btn-secondary'>{banner.label_botao ? banner.label_botao : "Saiba Mais"}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="descBanner">
                        
                        <div className='inclusoPreco'>
                            {banner.campanha && banner.campanha.listagem && (
                                <ul className='incluso'>
                                    {
                                        (banner['campanha']['listagem'] && banner['campanha']['listagem'] != '') ? banner['campanha']['listagem'].map((item, index) => (
                                            <li key={index}>{item}</li>
                                        )) : <></>
                                    }

                                </ul>
                            )}
                            { isMobile && <a href={banner.link} className='btn btn-secondary'>{banner.label_botao ? banner.label_botao : "Saiba Mais"}</a> }
                        </div>
                        <div className='descVideo'>
                            <div className='desc'>
                                <h4>{banner.chamada}</h4>
                                <h3>{banner.texto_apoio}</h3>
                            </div>
                            {banner.campanha && banner.campanha.videos && (
                                <div className='video' onClick={() => openModal(banner.campanha.video)}>
                                    <img className="video" src={video} />
                                    <i><Icon icon="heroicons-outline:play" /></i>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );

        } else {
            return null;
        }
    };

    let sliderRef = useRef(null);
    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };


    var settingsBanner = {
        dots: true,
        infinite: banners.length >= 2 ? true : false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: isMobile ? true : false,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <>
            {banners && banners.length > 0 ?
                <>
                    <section className='Banner'>
                        <Container fluid>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <Slider {...settingsBanner} ref={slider => { sliderRef = slider; }}>
                                        {banners.map(banner => renderBannerItem(banner))}
                                    </Slider>
                                </Col>
                                {banners.length > 1 &&
                                    <Col xs={12} sm={12} md={12} lg={12} className='controlSlider'>
                                        <a className='nextSlider' onClick={next}><Icon className="icons" icon="ooui:previous-rtl" /></a>
                                        <a className='prevSlider' onClick={previous}><Icon className="icons" icon="ooui:previous-ltr" /></a>
                                    </Col>
                                }
                            </Row>
                        </Container>
                    </section>
                    <VideoModal show={showModal} handleClose={closeModal} videoId={videoId} />
                </>
            : <LoadingRing height='600' background='FFFFFF'/> }
        </>
    );
}

export default Banner;