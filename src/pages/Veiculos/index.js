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
import ResultadoBusca from "../../components/Busca/ResultadoBusca";
import Banner from "../../components/Busca/Banner";



// Styles
import './Veiculos.scss';
import 'react-tooltip/dist/react-tooltip.css'
import { useNavigationIdz } from '../../context/useNavigation';


function Veiculos() {

    const { navigation, idzOrigin, idzEvent, loading } = useNavigationIdz()
    useEffect(() => {
        if (!loading) {
            idzOrigin(window.location.href)
            idzEvent("paginas_acessadas", "Veiculos")
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

export default Veiculos;
