import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { isMobile } from 'react-device-detect';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Tooltip as ReactTooltip } from "react-tooltip";

// Components
import Menu from "../../components/Home/Menu";
import Header from "../../components/Header";
import Footer from "../../components/Home/Footer";
import Banner from "../../components/Busca/Banner";
import ResultadoBusca from "../../components/Busca/ResultadoBusca";




// Styles
import './Busca.scss';
import 'react-tooltip/dist/react-tooltip.css'
import { useNavigationIdz } from '../../context/useNavigation';


function Busca() {

    const { navigation, idzOrigin, idzEvent, loading } = useNavigationIdz()
    useEffect(() => {
        if (!loading) {
            idzOrigin(window.location.href)
            idzEvent("paginas_acessadas", "Blindagem")
        } 
    }, [loading])

    return (
        <>
            <Menu />
            <Header />
            <Banner />
            <ResultadoBusca />
            <Footer />
        </>

    );
}

export default Busca;
