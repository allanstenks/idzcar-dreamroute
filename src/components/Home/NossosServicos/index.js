import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate  } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Style
import './NossosServicos.scss';
import 'react-tooltip/dist/react-tooltip.css'


// Imagens
import imgBlindagem from "./img/imgBlindagem.webp";
import imgEstetica from "./img/imgEstetica.webp";
import imgFunalizaria from "./img/imgFunalizaria.webp";

function NossosServicos() {
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState([false, false, false]); // Array para controlar a visibilidade dos itens

    const handleScroll = () => {
        if (window.innerWidth <= 768) { 
            const itemElements = document.querySelectorAll('.itemNossosServicos');

            itemElements.forEach((item, index) => {
                const bounding = item.getBoundingClientRect();
                const top = bounding.top;
                const bottom = bounding.bottom;

                const isVisible = (top >= 0) && (bottom <= window.innerHeight);
                if (isVisible && !item.classList.contains('active')) {
                    setIsVisible(prevState => {
                        const newState = [...prevState];
                        newState[index] = true;
                        return newState;
                    });
                    item.classList.add('active'); // Adiciona a classe active ao elemento visível
                    setTimeout(() => {
                        item.classList.remove('active'); // Remove a classe active após 2 segundos
                    }, 2000);
                }
            });
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <section className='nossosServicos'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <h2 className='titilos'><span>conheça</span>nossos serviços</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <a onClick ={()=>navigate(`/estetica`)} className={`itemNossosServicos ${isVisible[0] ? 'active' : ''}`}>
                                <div className="foto fotoEstetica">
                                    <h3>Estética</h3>
                                    <img src={imgEstetica} />
                                    <span className='rodaTraseira'></span>
                                    <span className='rodaFrente'></span>
                                </div>
                                <div className="desc">
                                    <div className='servico'>
                                        <div className='textServico'>
                                            <h6>nossos serviços</h6>
                                            <h5>estética automotiva</h5>
                                        </div>
                                    </div>
                                    <div className="btn btn-plus" to="/"><Icon className="icons" icon="fe:plus" /></div>
                                </div>
                            </a>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <a onClick ={()=>navigate(`/blindagem`)} className={`itemNossosServicos ${isVisible[1] ? 'active' : ''}`}>
                                <div className="foto fotoBlindagem">
                                    <h3>Blindagem</h3>
                                    <img src={imgBlindagem} />
                                    <span className='rodaTraseira'></span>
                                    <span className='rodaFrente'></span>
                                </div>
                                <div className="desc">
                                    <div className='servico'>
                                        <div className='textServico'>
                                            <h6>nossos serviços</h6>
                                            <h5>blindagem de alta performance</h5>
                                        </div>
                                    </div>
                                    <div className="btn btn-plus" to="/"><Icon className="icons" icon="fe:plus" /></div>
                                </div>
                            </a>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <a onClick ={()=>navigate(`/funilaria`)} className={`itemNossosServicos ${isVisible[2] ? 'active' : ''}`}>
                                <div className="foto fotoFunilaria">
                                    <h3>funilaria</h3>
                                    <img src={imgFunalizaria} />
                                    <span className='rodaTraseira'></span>
                                    <span className='rodaFrente'></span>
                                </div>
                                <div className="desc">
                                    <div className='servico'>
                                        <div className='textServico'>
                                            <h6>nossos serviços</h6>
                                            <h5>funilaria premium</h5>
                                        </div>
                                    </div>
                                    <div className="btn btn-plus" to="/"><Icon className="icons" icon="fe:plus" /></div>
                                </div>
                            </a>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default NossosServicos;
