import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import api from '../../../services/apiIdz';

// Style
import './DetalhesVeiculo.scss';

// Components
import PropostaModal from '../PropostaModal';
import VideoModal from '../../Home/VideoModal';


function DetalhesVeiculo({ id, ano, km, blindagem, preco, imagem, detalhes, marca, idzEvent, navigation, videos, status, logomarca, som, imagembusca, videos_imagem, som_imagem }) {
    const [showModal, setShowModal] = useState(false);
    const [idVeiculo, setIdVeiculo] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar a reprodução do som
    const audioRef = useRef(null); // Ref para o elemento de áudio

    const handleShow = (id) => {
        setIdVeiculo(id);
        setShowModal(true);
    };
    const handleClose = () => setShowModal(false);

    const handleShareClick = async () => {
        try {
            // Verifica se o navegador suporta a API Web Share
            if (navigator.share) {
                await navigator.share({
                    title: 'Título do compartilhamento',
                    text: 'Texto do compartilhamento',
                    url: window.location.href
                });
            } else {
                // Se o navegador não suportar a API Web Share, você pode fornecer uma mensagem alternativa ou uma funcionalidade de compartilhamento alternativa
                console.log('Navegador não suporta API Web Share');
            }
        } catch (error) {
            console.error('Erro ao compartilhar:', error);
        }
    };

    const [showModalVideo, setShowModalVideo] = useState(false);
    const [videoId, setVideoId] = useState('');

    const closeModal = () => setShowModalVideo(false);

    const openModal = (id) => {
        console.log("video:", id);
        setVideoId(id);
        setShowModalVideo(true);
    };


    // Função para reproduzir ou pausar o som
    const togglePlaySound = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause(); // Pausa o som
            } else {
                audioRef.current.play(); // Reproduz o som
            }
            setIsPlaying(!isPlaying); // Alterna entre tocar e pausar
        }
    };

    return (
        <>
            <PropostaModal id={idVeiculo} showModal={showModal} idzEvent={idzEvent} navigation={navigation} handleClose={handleClose} />
            <section className='detalhesVeiculo'>
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <Row className='justify-content-md-center dados'>
                                <Col xs={12} sm={12} md={12} lg={5}>
                                    <h4><img src={`${api.defaults.baseURL}${logomarca}`} alt="Logomarca" /></h4>
                                    <h5>{detalhes && marca}</h5>
                                    <h3>{detalhes && detalhes.titulo} <span>{detalhes && detalhes.chamada}</span></h3>
                                    
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={3}>
                                    <ul>
                                        <li>
                                            <span>Ano</span>{ano}
                                        </li>
                                        <li>
                                            <span>KM</span>{km}
                                        </li>

                                        {blindagem && blindagem.blindado === 1 && (
                                            <>
                                                <li>
                                                    <span>Tipo de Blindagem</span>{blindagem.tipo_blindagem}
                                                </li>
                                                {blindagem.tipo_vidro &&
                                                <li>
                                                    <span>Tipo de Vidros</span>{blindagem.tipo_vidro} 
                                                   
                                                </li>
                                                }
                                            </>
                                        )}
                                    </ul>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={4}>
                                    {status != "Vendido" ? <>
                                    <div className="valor">
                                        <span>Valor</span>
                                        {preco === 'R$ 0,00' ? (
                                            <h3>Subconsulta</h3>
                                        ) : (
                                            <h3>{preco}</h3>
                                        )}
                                        <Link className='btn btn-primary' variant="primary" onClick={() => handleShow(id)}>{status != "Vendido" ? 'faça a sua proposta' : 'Curtiu? Encomende o seu!'} <Icon className="icons" icon="basil:arrow-up-outline" /></Link>
                                    </div>
                                    </> : ''}
                                </Col>
                            </Row>
                            {status === "Vendido" ? <span className='Vendido'><Icon className="icons" icon="lets-icons:check-fill" /> Veículo Vendido</span> : ''}
                        </Col>
                        
                    </Row>
                    {videos != "" &&
                    <Row className='justify-content-md-center videosSom'>
                        <Col xs={6} sm={12} md={12} lg={12}>
                            <h2>Veja mais <strong>detalhes</strong></h2>
                        </Col>
                        <Col xs={6} sm={12} md={12} lg={som ? 8 : 12}>
                            <div className="playVideos" onClick={() => openModal(videos)}>
                                <div className='play' style={{ background: `url(${api.defaults.baseURL}${videos_imagem})  no-repeat center / cover` }}></div>
                                <p>ASSISTA AO VÍDEO</p>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={4}>
                            <div className="playSom">
                                <h3>Escute o <strong>som do motor</strong></h3>
                                <div className={`play ${isPlaying ? 'playing' : ''}`} onClick={togglePlaySound} style={{ background: `url(${api.defaults.baseURL}${som_imagem})  no-repeat center / cover` }}>
                                </div>
                                <audio ref={audioRef} src={som}></audio>
                            </div>
                        </Col>
                    </Row>
                    }
                </Container>
            </section>
            <VideoModal show={showModalVideo} handleClose={closeModal} videoId={videoId} />
        </>

    );
}

export default DetalhesVeiculo;
