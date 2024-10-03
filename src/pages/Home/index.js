import React, { useEffect, useState } from 'react';

// Components
import Header from "../../components/Header";
import Banner from "../../components/Home/Banner";
import Destaques from "../../components/Home/Destaques";
import Blindados from "../../components/Home/Blindados";
import ExperienciaPersonalizada from "../../components/Home/ExperienciaPersonalizada";
import Video from "../../components/Home/Video";
import VivaAlgoNovo from "../../components/Home/VivaAlgoNovo";
import Marcas from "../../components/Home/Marcas";
import Footer from "../../components/Home/Footer";
import Menu from "../../components/Home/Menu";

// Styles
import './Home.scss';
import 'react-tooltip/dist/react-tooltip.css'
import { useNavigationIdz } from '../../context/useNavigation';

function Dashboard() {


    const { navigation, idzOrigin, idzEvent, loading } = useNavigationIdz()
    useEffect(() => {
        if (!loading) {
            idzOrigin(window.location.href)
            idzEvent("paginas_acessadas", "Home")
        }

    }, [loading])


    return (
        <>
            <Menu />
            <Header type="light" />
            <Banner />
            <Destaques />
            <Video />
            <ExperienciaPersonalizada />
            <Marcas />
            <VivaAlgoNovo />
            <Footer />
        </>

    );
}

export default Dashboard;
