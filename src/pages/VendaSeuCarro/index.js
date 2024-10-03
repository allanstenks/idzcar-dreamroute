import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { isMobile } from 'react-device-detect';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useNavigationIdz } from '../../context/useNavigation';

// Components
import Menu from "../../components/Home/Menu";
import Header from "../../components/Header";
import Footer from "../../components/Home/Footer";
import Banner from "../../components/VendaSeuCarro/Banner";
import ComoFunciona from "../../components/VendaSeuCarro/ComoFunciona";
import FormVenda from "../../components/VendaSeuCarro/FormVenda";


// Styles
import './VendaSeuCarro.scss';
import 'react-tooltip/dist/react-tooltip.css'


function VendaSeuCarro() {

    const { navigation, idzOrigin, idzEvent, loading } = useNavigationIdz()
    useEffect(() => {
        if (!loading) {
            idzOrigin(window.location.href)
            idzEvent("paginas_acessadas", "Venda seu carro")
        } 
    }, [loading])

    return (
        <>
            <Menu />
            <Header />
            <Banner />
            <ComoFunciona />
            <FormVenda />
            <Footer />
        </>

    );
}

export default VendaSeuCarro;
