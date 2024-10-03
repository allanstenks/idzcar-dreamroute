import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { isMobile } from 'react-device-detect';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Tooltip as ReactTooltip } from "react-tooltip";

// Components
import Header from "../../components/Header";
import Footer from "../../components/Home/Footer";
import Banner from "../../components/Funilaria/Banner";
import Conceito from "../../components/Funilaria/Conceito";
import Servicos from "../../components/Funilaria/Servicos";
import Garantimos from "../../components/Blindagem/Garantimos";
import Tecnologia from "../../components/Funilaria/Tecnologia";

// Styles
import './Funilaria.scss';
import { useNavigationIdz } from '../../context/useNavigation';




function Funilaria() {

    const { navigation, idzOrigin, idzEvent, loading } = useNavigationIdz()
    useEffect(() => {
        if (!loading) {
            idzOrigin(window.location.href)
            idzEvent("paginas_acessadas", "Funilaria")
        }

    }, [loading])

    return (
        <>
            <Header />
            <Banner />
            <Conceito />
            <Servicos />
            <Tecnologia />
            <Garantimos />
            <Footer />
        </>

    );
}

export default Funilaria;
