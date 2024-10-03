import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

// Components
import Menu from "../../../components/Home/Menu";
import Header from "../../../components/Header";
import Footer from "../../../components/Home/Footer";
import Banner from "../../../components/CotacaoBlindagem/Orcamento/Banner";
import View from "../../../components/CotacaoBlindagem/Orcamento/View";

// Styles
import './Orcamento.scss';
import 'react-tooltip/dist/react-tooltip.css'


function OrcamentoBlindagem() {
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

export default OrcamentoBlindagem;
