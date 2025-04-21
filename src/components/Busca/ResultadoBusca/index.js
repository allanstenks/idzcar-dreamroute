import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { Icon } from '@iconify/react';
import { Dropdown } from 'primereact/dropdown';

import { Link, useParams } from 'react-router-dom';

// Style
import './ResultadoBusca.scss';
import 'react-tooltip/dist/react-tooltip.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

// Components
import NaoEncontrol from "../NaoEncontrol";
import PodeGostar from "../PodeGostar";
import { Ring } from "@uiball/loaders"

//Imagens
import foto from './img/foto.png'
import naoEncontradosImg from './img/naoEncontradosImg.png'
import api from '../../../services/apiIdz';
import LoadingRing from '../../Loading';
import { useSearch } from '../../../context/useSearch';
import { useMediaQuery } from 'react-responsive';


function ResultadoBusca() {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const {
        listagem,
        condicao,
        marca,
        modelo
    } = useParams()

    const {
        handleFilterData,
        filterData,
        link,
        loadingData,
        setLoadingData,
        searchData,
        modelos,
        marcas,
        paramsData,
        handleParamsData,
        getVeiculos,
        intResumoBusca,
        setIntResumoBusca,
        setFilterData,
        getCondicoes,
        condicoes,
        placeholderPreco
    } = useSearch()

    const [activeButton, setActiveButton] = useState(
        listagem == 'todos' || listagem == 'blindados' || listagem == 'nao-blindados' ?
            listagem : 'todos'
    );

    // const placeholdersPreco = [
    //     { label: 'Todas', value: '0' },
    //     { label: 'Até R$ 200.000 Mil', value: '0|200.000' },
    //     { label: 'R$ 200.000 a R$ 400.000 Mil', value: '200.000|400.000' },
    //     { label: 'R$ 400.000 a R$ 800.000 Mil', value: '400.000|800.000' },
    //     { label: 'acima de R$ 800.000 Mil', value: '800.000' }
    // ];

    const placeholdersCondicao = [
        { label: 'Novo', value: 'novo' },
        { label: 'Semi-novo', value: 'semi-novo' }
    ];

    const handleButtonClick = (buttonName, buttonValue) => {
        handleFilterData(buttonName, 'listagem')
        setActiveButton(buttonName);
        if (buttonName === 'todos') {
            setActiveButton(buttonName);
            setFilterData({
                ...filterData,
                listagem: "todos",
                condicao: "todos",
                marca: null,
                modelo: null,
                faixa: null
            });
        } else {
            setActiveButton(buttonName);
        }
    };

    useEffect(() => {
        handleParamsData({
            listagem: listagem ? listagem : '',
            condicao: condicao ? condicao : '',
            marca: marca ? marca : '',
            modelo: modelo ? modelo : ''
        })
    }, [])

    useEffect(() => {
        setIntResumoBusca(false)
        setLoadingData(true)

        let query = new URLSearchParams(window.location.search)
        const faixa = query.get("preco-de") + "|" + query.get("preco-ate")

        getVeiculos(listagem, condicao, marca, modelo, faixa)

    }, [listagem, condicao, marca, modelo])

    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    const handleToggleFiltros = () => {
        setMostrarFiltros(!mostrarFiltros);
    };

    const sortByKm = (data) => {
        return [...data].sort((a, b) => {
            if (a.km === "0") return 1;
            if (b.km === "0") return -1;
            return parseInt(a.km.replace('.', '')) - parseInt(b.km.replace('.', ''));
        });
    };


    return (
        <>
            <section className='buscaBarra'>
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <ul className="tipos">
                                <li><a className={activeButton === 'todos' ? 'active' : ''} onClick={() => handleButtonClick('todos')}>Todos</a></li>
                                <li><a className={activeButton === 'blindados' ? 'active' : ''} onClick={() => handleButtonClick('blindados')}>Blindados</a></li>
                                <li><a className={activeButton === 'nao-blindados' ? 'active' : ''} onClick={() => handleButtonClick('nao-blindados')}>Não Blindados</a></li>
                            </ul>
                            <div className="buscaFiltros">
                                <div className="buscaCampos">
                                    <Row className='justify-content-md-center'>
                                        {mostrarFiltros == true || isMobile == false && (
                                            <Col xs={12} sm={12} md={12} lg={3}>
                                                <Form.Label className='Label'>
                                                    <span>Condição</span>
                                                    <Dropdown emptyMessage="Sem Resultado" value={filterData["condicao"]} onChange={(e) => handleFilterData(e.target.value, "condicao")} options={condicoes} optionLabel="label" placeholder="Selecione" className='Dropdown' />
                                                </Form.Label>
                                            </Col>
                                        )}
                                        <Col xs={12} sm={12} md={12} lg={3}>
                                            <Form.Label className='Label'>
                                                <span>Marca</span>
                                                <Dropdown showClear emptyMessage="Sem Resultado" value={filterData["marca"]} onChange={(e) => {


                                                    handleFilterData(e.target.value, "marca")
                                                }} options={marcas} optionLabel="label" placeholder="Selecione" className='Dropdown' />
                                            </Form.Label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={3}>
                                            <Form.Label className='Label'>
                                                <span>Modelo</span>
                                                <Dropdown showClear emptyMessage="Sem Resultado" value={filterData["modelo"]} onChange={(e) => handleFilterData(e.target.value, "modelo")} options={modelos} optionLabel="label" placeholder="Selecione" className='Dropdown' />
                                            </Form.Label>
                                        </Col>
                                        {mostrarFiltros == true || isMobile == false && (
                                            <Col xs={12} sm={12} md={12} lg={3}>
                                                <Form.Label className='Label'>
                                                    <span>Faixa de Preço</span>
                                                    <Dropdown emptyMessage="Sem Resultado" value={filterData["faixa"]} onChange={(e) => handleFilterData(e.target.value, "faixa")} options={placeholderPreco} optionLabel="label" placeholder="Selecione" className='Dropdown' />
                                                </Form.Label>
                                            </Col>
                                        )}
                                    </Row>
                                </div>
                                <div className="buscaBtn">
                                    <Link className='btn btn-icon' to={link}><Icon className="icons" icon="mingcute:search-line" /></Link>
                                    <Link onClick={handleToggleFiltros} className='btn btn-icon maisFiltros'>
                                        <Icon icon={mostrarFiltros ? "iconamoon:close-duotone" : "mingcute:filter-line"} />
                                        {mostrarFiltros ? "FECHAR FILTROS" : "FILTRO AVANÇADO"}
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {intResumoBusca ? (
                <>
                    <section className='naoEncontradosBusca'>
                        <Container>
                            <Row className='justify-content-md-center'>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <h2>ops, não encontramos nenhum carro como este!</h2>
                                    <h4>Mas aproveite e veja algumas recomendações para você, ou caso prefira, encomende o seu modelo.</h4>
                                </Col>

                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <div className='form'>
                                        <Row>
                                            <Col xs={12} sm={12} md={12} lg={5}>
                                                <div className='naoEncontradosImg'>

                                                </div>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={7}>
                                                <div className='naoEncontradosForm'>
                                                    <Form>
                                                        <Row>
                                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                                <h3>não encontrou o que desejava?</h3>
                                                                <h2>Encomende o seu veículo</h2>
                                                            </Col>
                                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                                <Form.Label className='Label'>
                                                                    <Form.Control className='Inputs' value="" placeholder='nome' />
                                                                </Form.Label>
                                                            </Col>
                                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                                <Form.Label className='Label'>
                                                                    <Form.Control className='Inputs' value="" placeholder='Email' />
                                                                </Form.Label>
                                                            </Col>
                                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                                <Form.Label className='Label'>
                                                                    <Form.Control className='Inputs' value="" placeholder='telefone' />
                                                                </Form.Label>
                                                            </Col>
                                                            <Col xs={12} sm={12} md={12} lg={6}>
                                                                <Form.Label className='Label'>
                                                                    <Form.Control className='Inputs' value="" placeholder='modelo do veículo' />
                                                                </Form.Label>
                                                            </Col>
                                                            <Col xs={12} sm={12} md={12} lg={6}>
                                                                <Form.Label className='Label'>
                                                                    <Form.Control className='Inputs' value="" placeholder='ano do veículo' />
                                                                </Form.Label>
                                                            </Col>
                                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                                <div className='validacao'></div>
                                                            </Col>
                                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                                <Form.Group className="text-center">
                                                                    <Button variant="secondary" className="Btns ButtonLight" >
                                                                        encomendar
                                                                    </Button>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <PodeGostar />
                </>
            ) : null}

            {!loadingData && !intResumoBusca ? (
                <>
                    <section className='resumoBusca'>
                        <Container>
                            <Row className='justify-content-md-center'>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <h2>
                                        CARROS {condicao === 'todos' || condicao === undefined ? 'NOVOS E SEMINOVOS' : 
                                                condicao === 'novo' ? 'NOVOS' : 'SEMINOVOS'}
                                    </h2>
                                    <h4>{searchData?.length} veículos encontrados</h4>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    <section className='resultadoBusca'>
                        <Container>
                            <Row className='justify-content-md-center'>

                                {
                                    [...sortByKm(searchData)].sort((a, b) => {
                                        const statusA = (a.status || a.situacao || '').toLowerCase().trim();
                                        const statusB = (b.status || b.situacao || '').toLowerCase().trim();
                                      
                                        if (statusA === 'vendido' && statusB !== 'vendido') return 1;
                                        if (statusA !== 'vendido' && statusB === 'vendido') return -1;
                                        return 0;
                                      }).map((carro, index) => (
                                        <Col key={index} xs={12} sm={12} md={12} lg={4}>
                                            <div className='veiculoBusca'>
                                                <div className='foto' style={{ background: `url(https://hdream.idzcar.com.br/${carro.imagem}) no-repeat center / cover` }}>
                                                    {carro.blindado == 1 && <span>Blindados</span>}
                                                    {carro.km === "0" ? (
                                                        <span className='baixo'>
                                                            <strong>ZERO</strong>
                                                        </span>
                                                    ) : (
                                                        parseInt(carro.km.toString().replace('.', '')) < 10000 && (
                                                            <span className='baixo'>
                                                                <strong>BAIXA</strong> QUILOMETRAGEM 
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                                <div className='desc'>
                                                    <h4>{carro.marca}</h4>
                                                    {carro.status === "Vendido" ? <span className='Vendido'><Icon className="icons" icon="lets-icons:check-fill" /> Vendido</span> : ''}
                                                    <h3>{carro.modelo} - {carro.versao}</h3>
                                                    <h6>{carro.ano_modelo} / {carro.ano_fabricacao}</h6>
                                                    <span>KM</span>
                                                    <h5>{carro.km}</h5>
                                                    <span>COMBUSTÍVEL</span>
                                                    <h5 className='noneBorder'>{carro.combustivel}</h5>
                                                    <div className="acao">
                                                        <div className='valor'>
                                                            <span>VALOR</span>
                                                            <h2>{carro.preco}</h2>
                                                        </div>
                                                        <Link className="btn btn-quaternary" to={`/detalhe/${carro.seo_url}`}>Mais detalhes<Icon className="icons" icon="basil:arrow-up-outline" /></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    ))
                                }

                               
                            </Row>
                        </Container>
                    </section>
                   
                </>
            ) : intResumoBusca ? null : <div className='loadingBoxBusca'><LoadingRing /></div>}

        </>

    );
}

export default ResultadoBusca;
