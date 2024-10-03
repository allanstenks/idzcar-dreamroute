import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import api from '../../services/apiIdz';

// Components
import Menu from "../../components/Home/Menu";
import Header from "../../components/Header";
import Footer from "../../components/Home/Footer";
import DetalhesVeiculo from "../../components/Detalhes/DetalhesVeiculo";
import Galeria from "../../components/Detalhes/Galeria";
import Relacionados from "../../components/Detalhes/Relacionados";
import Diferenciais from "../../components/Detalhes/Diferenciais";
import Especificacoes from "../../components/Detalhes/Especificacoes";
import FichaTecnica from "../../components/Detalhes/FichaTecnica";
import LoadingRing from '../../components/Loading';


// Styles
import './Detalhes.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigationIdz } from '../../context/useNavigation';
import { Helmet } from 'react-helmet';



function Detalhes() {

    const [isLoading, setIsLoading] = useState(true);

    const { navigation, idzOrigin, idzEvent, loading } = useNavigationIdz() 
    const [titulo, setTitulo] = useState("Carregando...")

    useEffect(() => {
        if (!loading) {
            idzOrigin(window.location.href)
            idzEvent("paginas_acessadas", "Detalhes")
        }
    }, [loading])

    // Detalhes do veículo
    const { url } = useParams();
    const [veiculo, setVeiculos] = useState([]);

    const fetchVeiculos = async () => {
        try {
            const response = await api.get(`/api/veiculos?seo_url=${url}&origem=site`, {
                "Authorization": process.env.REACT_APP_API_KEY,
            })
            console.log("Dados", response.data);
            setVeiculos(response.data);
            if (response && response.data) {
                const veiculo = response.data;
                idzEvent("veiculos_acessados", `${veiculo.id} | ${veiculo.marca} | ${veiculo.modelo}`)

                // setTimeout(() => {
                setIsLoading(false);
                // }, 2000) 
            } else {
                console.log('Detalhes do veículo não foram encontrados.' + veiculo.detalhes);
            }
        } catch (error) {
            console.error('Erro ao obter os veículos:', error);
        }
    };


    useEffect(() => {
        fetchVeiculos();
    }, [url]);

    useEffect(() => {
        if (veiculo["seo"]) {
            if (typeof veiculo["seo"]["titulo"] != 'undefined') {
                setTitulo(veiculo["seo"]["titulo"] != '' ?
                    veiculo["seo"]["titulo"]
                    : veiculo["detalhes"]["titulo"])
            }
        }
    }, [veiculo["seo"]])

    return (
        <>
            <Helmet>
                <title>
                    1021 Motors | {titulo}
                </title>
                <meta name='description' content={veiculo?.seo?.description != '' ? veiculo?.seo?.description : veiculo?.detalhes?.chamada}></meta>
                <meta name="keywords" content={veiculo?.seo?.palavras_chave} />
            </Helmet >
            <Menu />
            <Header />
            {
                isLoading ? <div className='loadingBoxDetails'>
                    <LoadingRing />
                </div> :
                    <>
                        <Galeria fotos={veiculo.fotos} />
                        <DetalhesVeiculo
                            id={veiculo.id}
                            marca={veiculo.marca}
                            ano={veiculo.ano_fabricacao}
                            km={veiculo.km}
                            blindagem={veiculo.blindagem}
                            preco={veiculo.preco}
                            imagem={veiculo.pagina_produto}
                            imagembusca={veiculo.pagina_busca}
                            detalhes={veiculo.detalhes}
                            idzEvent={idzEvent}
                            navigation={navigation}
                            videos={veiculo.videos}
                            status={veiculo.status}
                            logomarca={veiculo.logomarca}
                            som={veiculo.som}
                        />
                        
                        <Especificacoes destaques={veiculo.destaques} detalhesEspecificacoes={veiculo.detalhes} opcionais={veiculo.opcionais} />
                        <Diferenciais diferenciais={veiculo.diferenciais} />
                        <FichaTecnica detalhes={veiculo.detalhes} />
                        <Relacionados idVeiculo={veiculo.id} />
                    </>
            }
            <Footer />

        </>

    );
}

export default Detalhes;
