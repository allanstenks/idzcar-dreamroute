import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Style
import './Contatos.scss';


//Imagens
import imgContatos from './img/imgContatos.webp'

//Componentes
import api from '../../../services/apiIdz';

function Contatos() {
    const [data, setData] = useState({}); // Estado para armazenar os dados da API

    // Função para buscar os dados da API
    const fetchData = async () => {
        try {
            const response = await api.get('/api/dados-gerais/1');
            setData(response.data); // Atualize o estado com os dados recebidos da API
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Chame a função para buscar os dados da API quando o componente for montado
    }, []);

    return (
        <>
            <section className='Contatos'>
                <Container>
                    <Row> 
                        <Col xs={12} sm={6} md={12} lg={6}>
                            <img src={imgContatos} />
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={5} className='boxContatos'>
                            <div className='textContatos'>
                                <h2>estamos prontos para <strong>te atender</strong></h2>
                                <h4>nosso endereço:</h4>
                                <p>{data.endereco}, {data.endnum} - {data.bairro} - {data.cidade} - {data.estado} <br/> CEP: {data.cep}</p>
                                <h4>horário de atendimento</h4>
                                <p>{data.horario}</p>
                                <h4>fale conosco</h4>
                                {data.whatsapp && Array.isArray(data.whatsapp) && data.whatsapp.length > 0 && (
                                    <p>{data.whatsapp[0].whatsapp}<br/>{data.whatsapp[0].destinatario}</p>
                                )}
                                <ul>
                                    {data.instagram && <li><a href={data.instagram} target='_black'><Icon className="icons" icon="ri:instagram-fill" /></a></li> }
                                    {data.youtube && <li><a href={data.youtube} target='_black'><Icon className="icons" icon="mingcute:youtube-fill" /></a></li> }
                                    {data.facebook && <li><a href={data.facebook} target='_black'><Icon className="icons" icon="mdi:facebook" /></a></li> }
                                    {data.linkedin && <li><a href={data.linkedin} target='_black'><Icon className="icons" icon="mdi:linkedin" /></a></li> }
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={12}>
                            <a href='#formFaleConosco' className='btn btn-down'><i><Icon className="icons" icon="iconoir:arrow-down" /></i></a>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default Contatos;
