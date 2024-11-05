import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Icon } from '@iconify/react';
import { useNavigate  } from 'react-router-dom';

// Components
import Header from "../../components/Header";
import Footer from "../../components/Home/Footer";
import Menu from "../../components/Home/Menu";

// Styles
import './Importacao.scss';
import 'react-tooltip/dist/react-tooltip.css'
import { useNavigationIdz } from '../../context/useNavigation';


function Importacao() {

    const navigate = useNavigate();

    const { navigation, idzOrigin, idzEvent, loading } = useNavigationIdz()
    useEffect(() => {
        if (!loading) {
            idzOrigin(window.location.href)
            idzEvent("paginas_acessadas", "404 Not Found")
        } 
    }, [loading])

    return (
        <>
            <Menu />
            <Header />
            <section className='Importacao'>
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <h3>Estamos construindo</h3>
                            <h4>algo incrível</h4>
                            <p><strong>Essa página ainda não existe,</strong> mas em breve, sua jornada para o carro dos sonhos será global</p>
                            <a onClick={() => navigate(`/faleconosco`)} className="btn btn-primary">Seja o primeiro a saber <Icon className="icons" icon="basil:arrow-up-outline" /></a>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>

    );
}

export default Importacao;
