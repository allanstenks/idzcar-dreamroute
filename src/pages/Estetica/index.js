import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { isMobile } from 'react-device-detect';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Tooltip as ReactTooltip } from "react-tooltip";

// Components
import Header from "../../components/Header";
import Footer from "../../components/Home/Footer";
import Banner from "../../components/Estetica/Banner";
import Conceito from "../../components/Estetica/Conceito";
import Servicos from "../../components/Estetica/Servicos";
import Insufilm from "../../components/Estetica/Insufilm";
import CeramicPro from "../../components/Estetica/CeramicPro";
import PPF from "../../components/Estetica/PPF";
import Orcamento from "../../components/Estetica/Orcamento";

// Styles
import './Estetica.scss';
import { useNavigationIdz } from '../../context/useNavigation';

function Estetica() {

    const { navigation, idzOrigin, idzEvent, loading } = useNavigationIdz()
    useEffect(() => {
        if (!loading) {
            idzOrigin(window.location.href)
            idzEvent("paginas_acessadas", "Estética")
        }
    }, [loading])

    return (
        <>
            <Header />
            <Banner />
            <Conceito />
            <Servicos />
            <Insufilm />
            <CeramicPro />
            <PPF />
            
            <Orcamento />
            <Footer />
        </>

    );
}

export default Estetica;
