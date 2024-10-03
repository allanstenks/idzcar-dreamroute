import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

// Components
import Menu from "../../../components/Home/Menu";
import Header from "../../../components/Header";
import Footer from "../../../components/Home/Footer";
import Banner from "../../../components/CotacaoEstetica/Orcamento/Banner";
import View from "../../../components/CotacaoEstetica/Orcamento/View";

// Styles
import './Orcamento.scss';
import 'react-tooltip/dist/react-tooltip.css'


function OrcamentoEstetica() {
    const { pedido } = useParams();

    const [imagem, setImagem] = useState('')

    const handleImagemChange = (imagem) => {
        setImagem(imagem);
    };

    return (
        <>
            <Menu />
            <Header />
            <Banner imagem={imagem}/>
            <View pedidoId={pedido} onImagemChange={handleImagemChange}/>
            <Footer />
        </>

    );
}

export default OrcamentoEstetica;
