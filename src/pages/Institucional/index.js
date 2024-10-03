import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { isMobile } from 'react-device-detect';
import { Icon } from '@iconify/react';
import { Link, useParams } from 'react-router-dom';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useNavigationIdz } from '../../context/useNavigation';

// Components
import Menu from "../../components/Home/Menu";
import Header from "../../components/Header";
import Footer from "../../components/Home/Footer";
import Banner from "../../components/Institucional/Banner";
import Contexto from "../../components/Institucional/Contexto";


// Styles
import './Institucional.scss';
import 'react-tooltip/dist/react-tooltip.css'
import api from '../../services/apiIdz';


function Institucional() {

    const { navigation, idzOrigin, idzEvent,loading } = useNavigationIdz()
    const [institucional, setInstitucional] = useState({})
    const { url } = useParams()
    useEffect(() => {
        if (!loading) {
            idzOrigin(window.location.href)
            idzEvent("paginas_acessadas", "Institucional")
        }

    }, [loading])

    const getInstitucional = async (query) => {
        let searchForId = true
        try {
            const response = await api.get(`/api/conteudo-institucional${searchForId ? `/${query}` : `?seo_url=${query}`}`);
            if (response.data) {
                setInstitucional(response.data);
            } else {
                console.log('Nenhum institucional recebido da API.');
            }
        } catch (error) {
            console.error('Erro ao buscar os institucionais:', error);
        }
    }

    useEffect(() => {
        if (url) {
            getInstitucional(url)
        }
    }, [])

    return (
        <>
            <Menu />
            <Header />
            <Banner subtitulo="" titulo={institucional['titulo']} frase="" background={institucional['banner']} />
            <Contexto texto={institucional['conteudo']} />
            <Footer />
        </>

    );
}

export default Institucional;
