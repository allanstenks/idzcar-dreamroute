import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

//Imagens
import logo from './img/logo.svg'
import logoidz from './img/logo-idz.webp'

// Style
import './Footer.scss';
import 'react-tooltip/dist/react-tooltip.css'

//Componentes
import api from '../../../services/apiIdz';
import { useNavigationIdz } from '../../../context/useNavigation';

function Footer() {

    const { idzEvent } = useNavigationIdz()

    const [data, setData] = useState({});
    const [whatsappBlindagem, setWhatsappBlindagem] = useState(null);

    const fetchData = async () => {
        try {
            const response = await api.get('/api/dados-gerais/1');
            setData(response.data);
            const url = window.location.href;
            if (url.includes('blindagem')) {
                const numeroWhatsApp = response.data.whatsapp[2].whatsapp; // blindagem
                const numeroFormatado = formatarNumeroWhatsApp(numeroWhatsApp);
                setWhatsappBlindagem(numeroFormatado);
            }
            else if (url.includes('detalhe')) {
                const numeroWhatsApp = response.data.whatsapp[1].whatsapp; // Assumindo que o WhatsApp da blindagem está na segunda posição do array
                const numeroFormatado = formatarNumeroWhatsApp(numeroWhatsApp);
                setWhatsappBlindagem(numeroFormatado);
            }
            else if (url.includes('estetica')) {
                const numeroWhatsApp = response.data.whatsapp[3].whatsapp; // Assumindo que o WhatsApp da blindagem está na segunda posição do array
                const numeroFormatado = formatarNumeroWhatsApp(numeroWhatsApp);
                setWhatsappBlindagem(numeroFormatado);
            }
            else if (url.includes('funilaria')) {
                const numeroWhatsApp = response.data.whatsapp[4].whatsapp; // Assumindo que o WhatsApp da blindagem está na segunda posição do array
                const numeroFormatado = formatarNumeroWhatsApp(numeroWhatsApp);
                setWhatsappBlindagem(numeroFormatado);
            }
            else {
                const numeroWhatsApp = response.data.whatsapp[0].whatsapp; // Assumindo que o WhatsApp da blindagem está na segunda posição do array
                const numeroFormatado = formatarNumeroWhatsApp(numeroWhatsApp);
                setWhatsappBlindagem(numeroFormatado);
            }
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const formatarNumeroWhatsApp = (numero) => {
        const numeroSemEspacos = numero.replace(/\s/g, '').replace(/-/g, '').replace("(", '').replace(")", '');
        const numeroFormatado = '55' + numeroSemEspacos;
        return numeroFormatado;
    };

    useEffect(() => {
        fetchData();
    }, []);


    const gtagSendEventWhatsApp = (url) => {
        const callback = () => {
        };

        if (window.gtag) {
            window.gtag('event', 'conversion_event_contact_1', {
                'event_callback': callback,
                'event_timeout': 2000, // Tempo limite em milissegundos para o callback ser chamado
                // Outros parâmetros de evento, se houver
            });
        }
    };


    const handleClickWhat = () => {
        idzEvent("whatsapp", "Whatsapp Clicado");
        gtagSendEventWhatsApp(window.location.href);
    };



    return (
        <>
            {whatsappBlindagem && (
                <div className='flut-atendimento' onClick={handleClickWhat}>
                    <a className='WhatsAppFlutuante' target='_black' href={`https://api.whatsapp.com/send?phone=${whatsappBlindagem}`}>
                        <Icon className="icons" icon="ic:sharp-whatsapp" />
                    </a>
                </div>
            )}
            <footer>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={6} lg={2}>
                            <a className="navbar-brand" href="#"><img className="logo" src={logo} /></a>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={4}>
                            <div className='locais'>
                                <h3>Onde Estamos</h3>
                                <p>Av. Ver. José Diniz 3707 - Loja<br />Campo Belo - São Paulo - SP <br /> CEP 04603-003</p>
                                <ul>
                                    {data.instagram && <li><a href={data.instagram} target='_black'><Icon className="icons" icon="ri:instagram-fill" /></a></li>}
                                    {data.youtube && <li><a href={data.youtube} target='_black'><Icon className="icons" icon="mingcute:youtube-fill" /></a></li>}
                                    {data.facebook && <li><a href={data.facebook} target='_black'><Icon className="icons" icon="mdi:facebook" /></a></li>}
                                    {data.linkedin && <li><a href={data.linkedin} target='_black'><Icon className="icons" icon="mingcute:linkedin-fill" /></a></li>}
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <nav className="mr-auto sitemap">
                                <h3> Páginas</h3>
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/sobre">Sobre Nós</Link></li>
                                    <li><Link to="/vendaseucarro">Venda seu Carro</Link></li>
                                    <li><Link to="/faleconosco">Fale Conosco</Link></li>
                                </ul>
                            </nav>
                        </Col>
                    </Row>
                </Container>
            </footer>
            <div className='copy'>
                <Container>
                    <Row>
                        <Col>
                            <span>Todos os direitos reservados <i>&reg;</i> Dream Route | 2024</span>
                            <a href="https://www.idzagencia.com.br" target='_black'><img src={logoidz} /></a>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>

    );
}

export default Footer;
