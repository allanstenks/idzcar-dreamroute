import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { isMobile } from 'react-device-detect';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Tooltip as ReactTooltip } from "react-tooltip";

// Components
import Header from "../../components/Header";
import Banner from "../../components/Blindagem/Banner";
import Footer from "../../components/Home/Footer";
import Conceito from "../../components/Blindagem/Conceito";
import Diferenciais from "../../components/Blindagem/Diferenciais";
import Seguranca from "../../components/Blindagem/Seguranca";
import Desgaste from "../../components/Blindagem/Desgaste";
import Pet from "../../components/Blindagem/Pet";
import Ruidos from "../../components/Blindagem/Ruidos";
import Venda from "../../components/Blindagem/Venda";
import Garantimos from "../../components/Blindagem/Garantimos";



// Styles
import './Blindagem.scss';
import 'react-tooltip/dist/react-tooltip.css'
import { useNavigationIdz } from '../../context/useNavigation';



function Blindagem() {

    const { navigation, idzOrigin, idzEvent, loading } = useNavigationIdz()

    useState(() => {
        if (!loading) {
            idzOrigin(window.location.href)
            idzEvent("paginas_acessadas", "Blindagem")
        } 
    }, [loading])


    return (
        <>
            <Header />
            <Banner />
            <Conceito />
            <Diferenciais />
            <Seguranca />
            <Desgaste />
            <Ruidos />
            <Venda />
            <Pet />
            <Garantimos />
            <Footer />
        </>

    );
}

export default Blindagem;
