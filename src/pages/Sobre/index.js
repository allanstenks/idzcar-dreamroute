import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { isMobile } from 'react-device-detect';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Tooltip as ReactTooltip } from "react-tooltip";

// Components
import Header from "../../components/Header";
import Banner from "../../components/Sobre/Banner";
import Footer from "../../components/Home/Footer";
import Menu from "../../components/Home/Menu";
import Conheca from "../../components/Sobre/Conheca";
import Video from "../../components/Home/Video";



// Styles
import './Sobre.scss';
import 'react-tooltip/dist/react-tooltip.css'
import { useNavigationIdz } from '../../context/useNavigation';



function Sobre() {

    const { navigation, idzOrigin, idzEvent, loading } = useNavigationIdz()
    useEffect(() => {
        if (!loading) {
            idzOrigin(window.location.href)
            idzEvent("paginas_acessadas", "Sobre")
        }

    }, [loading])

    return (
        <>
            <Menu />
            <Header />
            <Banner />
            <Conheca />
            <Video />
            <Footer />
        </>

    );
}

export default Sobre;
