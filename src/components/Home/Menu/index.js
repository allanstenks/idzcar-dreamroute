import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

// Style
import './Menu.scss';
import 'react-tooltip/dist/react-tooltip.css'


// Imagens
import imgZero from "./img/imgZero.webp";
import imgBlindados from "./img/imgBlindados.webp";
import imgSeminovos from "./img/imgSeminovos.webp";
import logo from './img/logoMenu.webp'

//Componentes
import api from '../../../services/apiIdz';

function Menu({ menuOpen, setMenuOpen }) {

    const navigate = useNavigate();

    useEffect(() => {
        const menu = document.querySelector('.menu');

        const menuTimeout = setTimeout(() => {
            if (menu) {
                if (menuOpen) {
                    menu.classList.add('menuOpen');
                } else {
                    menu.classList.remove('menuOpen');
                }
            }
        }, 100);
    }, [menuOpen]);

    const handleCloseMenu = () => {
        const menu = document.querySelector('.menu');
        menu.classList.remove('menuOpen');
        const menuTimeout = setTimeout(() => {
            setMenuOpen(false);
        }, 500);
    };


    const handleSubmitAndNavigate = async (nav) => {
        handleCloseMenu();
        navigate(nav);
    };

    // Redes Sociais
    const [data, setData] = useState({});

    const fetchData = async () => {
        try {
            const response = await api.get('/api/dados-gerais/1');
            setData(response.data); 
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Chame a função para buscar os dados da API quando o componente for montado
    }, []);



    return (
        <>
            {menuOpen   ? 

                <section className='menu'>
                    <Container fluid>
                        <Row className='justify-content-md-center'>
                            <Col xs={12} sm={12} md={12} lg={6} className='boxChamadas'>
                                <a onClick={handleCloseMenu} className="logoMenu"><img src={logo} /></a>
                                <div className='nossosVeiculos'>
                                    <div className='textVeiculos'>
                                        <span>nossos veículos</span>
                                        <h3>desempenho e emoção</h3>
                                        <h2>em cada escolha</h2>
                                    </div>
                                </div>
                                <div className='redes'>
                                    <span>Siga-nos nas redes sociais</span>
                                    <ul>
                                        {data.instagram && <li><a href={data.instagram} target='_black'><Icon className="icons" icon="ri:instagram-fill" /></a></li> }
                                        {data.youtube && <li><a href={data.youtube} target='_black'><Icon className="icons" icon="mingcute:youtube-fill" /></a></li> }
                                        {data.facebook && <li><a href={data.facebook} target='_black'><Icon className="icons" icon="mdi:facebook" /></a></li> }
                                        {data.linkedin && <li><a href={data.linkedin} target='_black'><Icon className="icons" icon="mdi:linkedin" /></a></li> }
                                    </ul>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={6} className='boxVeiculos'>
                                <Link onClick={handleCloseMenu} className="btn btn-close" to="/"><i><Icon className="icons" icon="line-md:close" /></i></Link>
                                <Row className='listVeiculos'>
                                    <Col xs={12} sm={12} md={4} lg={12}>
                                        <div onClick ={()=>handleSubmitAndNavigate(`/busca/todos/novo`)} className='itemNossosVeiculos'>
                                            <div className="foto">
                                                <img src={imgZero} />
                                            </div>
                                            <div className="desc">
                                                <div className='servico'>
                                                    <div className='textServico'>
                                                        <h6>nossos veículos</h6>
                                                        <h5> zero km</h5>
                                                    </div>
                                                </div>
                                                <div className="btn btn-plus" to="/"><Icon className="icons" icon="fe:plus" /></div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12}>
                                        <div onClick ={()=>handleSubmitAndNavigate(`/busca/blindados/`)} className='itemNossosVeiculos'>
                                            <div className="foto">
                                                <img src={imgBlindados} />
                                            </div>
                                            <div className="desc">
                                                <div className='servico'>
                                                    <div className='textServico'>
                                                        <h6>nossos veículos</h6>
                                                        <h5> blindados</h5>
                                                    </div>
                                                </div>
                                                <div className="btn btn-plus" to="/"><Icon className="icons" icon="fe:plus" /></div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12}>
                                        <div onClick ={()=>handleSubmitAndNavigate(`/busca/todos/`)}  className='itemNossosVeiculos'>
                                            <div className="foto">
                                                <img src={imgSeminovos} />
                                            </div>
                                            <div className="desc">
                                                <div className='servico'>
                                                    <div className='textServico'>
                                                        <h6>nossos veículos</h6>
                                                        <h5> seminovos</h5>
                                                    </div>
                                                </div>
                                                <div className="btn btn-plus" to="/"><Icon className="icons" icon="fe:plus" /></div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </section>
                
            : <></>}
        </>

    );
}

export default Menu;
