import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Icon } from '@iconify/react';
import { useNavigate  } from 'react-router-dom';

// Components
import Header from "../../components/Header";
import Footer from "../../components/Home/Footer";
import Menu from "../../components/Home/Menu";
import ListaImportados from "../../components/Importacao/ListaImportados";

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
                <Row className='justify-content-md-center text-center'>
                <Col xs={12} md={10} lg={8}>
                    <h3>Confira os modelos importados disponíveis</h3>
                    <p className="lead">
                    Trabalhamos com veículos de alto padrão prontos para você.  
                    E se não encontrar o que procura, fale com nossa equipe – nós buscamos pra você.
                    </p>
                    <a onClick={() => navigate(`/faleconosco`)} className="btn btn-primary mt-3">
                    Quero um modelo sob medida <Icon className="icons" icon="basil:arrow-up-outline" />
                    </a>
                </Col>
                </Row>
            </Container>
            </section>
            <ListaImportados />
            <Footer />
        </>

    );
}

export default Importacao;
