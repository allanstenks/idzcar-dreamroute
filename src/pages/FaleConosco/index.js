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
import Banner from "../../components/FaleConosco/Banner";
import FormFale from "../../components/FaleConosco/Form";
import Contatos from "../../components/FaleConosco/Contatos";

// Styles
import './FaleConosco.scss';
import 'react-tooltip/dist/react-tooltip.css'


function FaleConosco() {

    const { navigation, idzOrigin, idzEvent, loading } = useNavigationIdz()
    useEffect(() => {
        if (!loading) {
            idzOrigin(window.location.href)
            idzEvent("paginas_acessadas", "Fale Conosco")
        }
    }, [loading])

    return (
        <>
            <Menu />
            <Header />
            <Banner />
            <Contatos />
            <FormFale />
            <Footer />
        </>

    );
}

export default FaleConosco;
