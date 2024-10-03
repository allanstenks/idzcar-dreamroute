import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row, Form } from "react-bootstrap";
import { isMobile } from 'react-device-detect';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Dropdown } from 'primereact/dropdown';
import Accordion from 'react-bootstrap/Accordion';
import Slider from "react-slick";
import api from '../../services/apiIdz';

// Components
import Menu from "../../components/Home/Menu";
import Header from "../../components/Header";
import Footer from "../../components/Home/Footer";
import Banner from "../../components/CotacaoBlindagem/Banner";
import LeadBlindagem from '../../components/CotacaoBlindagem/LeadBlindagem';

//Imagens
import Default from './img/Default.png'

// Styles
import './CotacaoBlindagem.scss';
import 'react-tooltip/dist/react-tooltip.css'
import { useNavigationIdz } from '../../context/useNavigation';


function CotacaoBlindagem() {

    const { navigation, idzOrigin, idzEvent, loading } = useNavigationIdz()
    useEffect(() => {
        if (!loading) {
            idzOrigin(window.location.href)
            idzEvent("paginas_acessadas", "Cotação Blindagem")
        }
    }, [loading])


    const [orcamentoData, setOrcamentoData] = useState({
        "categoria": null,
        "especificacoes": [
            {
                "id": 19,
                "sku": "tipo_vidros",
                "produtos":
                    [
                        "fanavid-fn19-19mm-",
                        "regularizacao-detran"
                    ]
            },
            {
                "id": 20,
                "sku": "teto_solar",
                "produtos":
                    [
                        "pequeno"
                    ]
            },
            {
                "id": 21,
                "sku": "porta_malas",
                "produtos": [
                    "porta-malas-eletrico"
                ]
            }
        ]
    })

    useEffect(() => {
        if (orcamentoData) {

        }
    }, [orcamentoData])

    const handleOrcamentoData = (value, field) => {
        setOrcamentoData({
            ...orcamentoData,
            [field]: value
        })
    }


    const [statusTenhoVeiculo, setStatusTenhoVeiculo] = useState('ja-tenho-veiculo');
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedTetoSolar, setSelectedTetoSolar] = useState(null);
    const [selectedIntercomunicador, setSelectedIntercomunicador] = useState(null);
    const [selectedCinta, setSelectedCinta] = useState(null);
    const [selectedPortaMalas, setSelectedPortaMalas] = useState(null);
    const [selectedPlataforma, setSelectedPlataforma] = useState(null);
    const [selectedAutorizacao, setSelectedAutorizacao] = useState(null);
    const [selectedDetran, setSelectedDetran] = useState(null);

    const [selectedTipoVidro, setSelectedTipoVidro] = useState(null);
    const [selectedTipoTetoSolar, setSelectedTipoTetoSolar] = useState(null);
    const [selectedOpcionalTetoSolar, setSelectedOpcionalTetoSolar] = useState(null);

    const [vidrosGarantia, setVidrosGarantia] = useState([])
    const handleOptionChange = (value, produtos) => {
        setSelectedOption(value);
        setVidrosGarantia(produtos)
    };
    useEffect(() => {
        if (vidrosGarantia) {

        }
    }, [vidrosGarantia])

    const handleTetoSolarChange = (value) => {
        setSelectedTetoSolar(value);
    };

    const handleDetranChange = (value) => {
        setSelectedDetran(value);
    };

    const handleAutorizacaoChange = (value) => {
        setSelectedAutorizacao(value);
    };

    const handleIntercomunicadorChange = (value) => {
        setSelectedIntercomunicador(value);
    };
    const handleCintaChange = (value) => {
        setSelectedCinta(value);
    };

    const handlePortaMalasChange = (value) => {
        setSelectedPortaMalas(value);
    };

    const handlePlataformaChange = (value) => {
        setSelectedPlataforma(value);
    };

    const handleTipoTetoSolarChange = (value) => {
        setSelectedTipoTetoSolar(value);
    };

    const handleTipoVidro = (value) => {
        setSelectedTipoVidro(value);
    };

    const handleOpcionalTetoSolarChange = (value) => {
        setSelectedOpcionalTetoSolar(value);
    };



    const placeholdersMarca = [
        { label: 'a', value: 'a' },
        { label: 'b', value: 'b' }
    ];

    const placeholdersModelo = [
        { label: 'a', value: 'a' },
        { label: 'b', value: 'b' }
    ];

    const sliderRef = useRef(null);

    useEffect(() => {
        // Inicializa o Slick Slider após o mapeamento
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(0, true);
        }
    }, [vidrosGarantia]); // Recarrega quando vidrosGarantia muda

    const next = () => {
        sliderRef.current.slickNext();
    };

    const previous = () => {
        sliderRef.current.slickPrev();
    };

    const initializeSlick = () => {
        // Configurações do Slick Slider
        const settings = {
            dots: false,
            arrow: false,
            speed: 500,
            infinite: false,
            slidesToShow: isMobile ? 1 : 3,
            slidesToScroll: 1,
        };

        // Mapeamento dos slides
        const slides = vidrosGarantia?.map((vidro, index) => (
            <div className='itemVidros' key={index}>
                {vidro?.link == "" ?
                    <div className="video" style={{ background: `url(https://api.idzcar.com.br${vidro?.link})  no-repeat center top / cover`}}></div>
                :
                    <div className="foto" style={{ background: `url(https://api.idzcar.com.br${vidro?.imagem})  no-repeat center top  / cover`}}></div>
                }
                
                <div className="desc">
                    <h4>{vidro?.titulo}</h4>
                    <p>{vidro?.descricao}</p>
                    {/* <Link className="btn btn-secondary" to="/"><Icon className="icons" icon="fe:plus" /> SELECIONAR</Link> */}
                    <Form.Label className={`btn btn-checkfull sub ${selectedTipoVidro === vidro?.sku ? 'bg-color' : ''}`}>
                        <Form.Check
                            type="radio"
                            id=""
                            label="Selecionar"
                            name="TipoVidro"
                            checked={selectedTipoVidro === vidro?.sku}
                            onChange={() => handleTipoVidro(vidro?.sku)}
                        />
                    </Form.Label>
                </div>
            </div>
        ));

        return (
            <>
                <Slider {...settings} ref={sliderRef}>
                    {slides}
                </Slider>
                <div className='SliderControl'>
                    <a className='nextSlider' onClick={next}><Icon className="icons" icon="ooui:previous-rtl" /></a>
                    <a className='prevSlider' onClick={previous}><Icon className="icons" icon="ooui:previous-ltr" /></a>
                </div>
            </>
        );
    };



    const [marcas, setMarcas] = useState([])
    const [modelos, setModelos] = useState([]);
    const [marcaSelecionada, setMarcaSelecionada] = useState("");
    const [modeloSelecionado, setModeloSelecionado] = useState("");

    const getMarcas = async () => {
        try {
            const response = await api.get(`/api/marcas`);
            if (response.data) {
                const lista = response.data.filter(marca => marca.status === "Ativo")
                    .map(marca => ({ label: marca.titulo, value: marca.id }));
                setMarcas(lista);
            }
        } catch (error) {
            console.error("Erro ao obter marcas:", error);
        }
    };

    const getModelos = async (marca_id) => {
        try {
            const response = await api.get(`/api/modelos/marca/${marca_id}?origem=blindados&agrupado=1`);
            if (response.data) {
                const lista = response.data.filter(modelo => modelo.status === "Ativo")
                    .map(modelo => ({ label: modelo.titulo, value: modelo.id }));
                setModelos(lista);
            }
        } catch (error) {
            console.error("Erro ao obter modelos:", error);
        }
    };


    useEffect(() => {
        getMarcas();
    }, []);

    const [labelMarca, setLabelMarca] = useState("");
    const [labelModelo, setLabelModelo] = useState("");
    const [idMarca, setIdMarca] = useState("");
    const [idModelo, setIdModelo] = useState("");

    const handleMarcaChange = (event) => {
        const marcaId = event.value;
        const marcaSelecionada = marcas.find(marca => marca.value === marcaId);

        setLabelMarca(marcaSelecionada.label)
        setIdMarca(marcaId)

        setMarcaSelecionada(marcaId);
        setModeloSelecionado(""); // Limpa o modelo selecionado quando a marca é alterada
        getModelos(marcaId);


    };

    const handleModeloChange = (event) => {
        const modeloId = event.value;
        const modeloSelecionado = modelos.find(modelo => modelo.value === modeloId);
        setLabelModelo(modeloSelecionado.label)
        setIdModelo(modeloId)

        setModeloSelecionado(modeloId);
    };

    const [blindagemEspecificacao, setBlindagemEspecificacao] = useState(null)

    const [currentKey, setCurrentKey] = useState(0)

    const handleCurrentAccordion = (value, validation) => {
        if (validation) {
            setCurrentKey(value)
        }
    }


    // Função para enviar a requisição GET para obser as especificações e produtos
    const handleProximoClick = () => {
        if (modeloSelecionado) {
            api.get(`/api/blindagem-especificacao?modelo=${modeloSelecionado}`)
                .then(response => {
                    setRadioGarantias([])
                    setOpcionais([])
                    setRadioTetoSolar([])
                    setBlindagemEspecificacao(response.data)
                    handleCurrentAccordion(currentKey + 1, true)
                })
                .catch(error => {
                    console.error('Erro ao enviar requisição:', error);
                    //setBlindagemEspecificacao(null)
                });
        } else {
            console.error('Nenhum modelo selecionado');
        }
    }

    const [radioGarantias, setRadioGarantias] = useState([])
    const [radioTetoSolar, setRadioTetoSolar] = useState([])
    const [opcionais, setOpcionais] = useState([])
    const [licencas, setLicencas] = useState([])

    const handleOpcionalDynamic = (value, field, index1, index2) => {
        let aux = [...opcionais]
        aux[index1]["produtos"][index2][field] = value
        setOpcionais(aux)
    }

    const handleLicencasDynamic = (value, field, index1, index2) => {
        let aux = [...licencas]
        aux[index1]["produtos"][index2][field] = value
        setLicencas(aux)
    }


    useEffect(() => {

        if (blindagemEspecificacao) {
            handleOrcamentoData(blindagemEspecificacao["id"], "categoria")

            const skusOpcionais = [
                'porta_malas_eletrico',
                'sirene_intercomunicador',
                'abertura_vidros_traseiros',
                'cinta_aco_rodas',
                'servico_plataforma'
            ]

            const skusLicencas = [
                'autorizacao_declaracao_exercito',
                'regularizacao_detran',
            ]

            let objOpcionais = []
            let objLicencas = []

            blindagemEspecificacao["especificacoes"].forEach((item) => {



                if (item.sku.includes("tipo_vidro")) {
                    // if (item.titulo.includes("vidro")) {

                    let obj = []


                    Object.keys(item.produtos).forEach((key, index) => {
                        if (key.includes("garantia-")) {


                            let data = {
                                id_especificacao: item.id,
                                key: key,
                                produtos: item.produtos[key]
                            }

                            obj.push(data)

                        }
                    })

                    setRadioGarantias(obj)
                }
                if (item.sku.includes("teto_solar")) {

                    let produtos = []
                    item.produtos.forEach((item, index) => {
                        produtos.push(item)
                    })
                    let objTetoSolar = {
                        id_especificacao: item.id,
                        sku: item.sku,
                        produtos
                    }

                    setRadioTetoSolar(objTetoSolar)
                }
                if (skusOpcionais.indexOf(item.sku) != -1) {
                    item["checked"] = false
                    objOpcionais.push(item)
                }
                if (skusLicencas.indexOf(item.sku) != -1) {
                    item["checked"] = false
                    objLicencas.push(item)
                }
            })

            let opcionaisStruct = []

            objOpcionais.forEach((opcional, index) => {
                let opcionaisProducts = []
                let idOpcional = opcional.id
                let skuOpcional = opcional.sku
                if (typeof opcional?.produtos != 'undefined') {
                    opcional?.produtos.forEach((produto, index) => {
                        opcionaisProducts.push(produto)
                    })
                }
                opcionaisStruct.push({
                    id_especificacao: idOpcional,
                    sku: skuOpcional,
                    produtos: opcionaisProducts
                })
            })

            setOpcionais(opcionaisStruct)



            let licencasStruct = []

            objLicencas.forEach((licenca, index) => {

                let licencasProducts = []
                let idLicenca = licenca.id
                let skuLicenca = licenca.sku
                if (typeof licenca?.produtos != 'undefined') {
                    licenca?.produtos.forEach((produto, index) => {
                        licencasProducts.push(produto)
                    })
                }
                licencasStruct.push({
                    id_especificacao: idLicenca,
                    sku: skuLicenca,
                    produtos: licencasProducts
                })
            })
            setLicencas(licencasStruct)

        }
    }, [blindagemEspecificacao])

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Função para obter a imagem do modelo

    const [caminhoDaImagem, setcaminhoDaImagem] = useState('');

    const obterImagemDoModelo = async (idModelo) => {
        try {
            const response = await api.get(`/api/modelo-imagem/${idModelo}`);
            const modelos = response.data;

            if (modelos) {
                // Define o caminho da imagem no estado
                setcaminhoDaImagem(modelos.imagem);
            } else {
                // Limpa o estado se o modelo não for encontrado
                setcaminhoDaImagem('');
            }
        } catch (error) {
            console.error('Erro ao obter imagem do modelo:', error);
        }
    }
    useEffect(() => {
        if (idModelo) {
            obterImagemDoModelo(idModelo);
        }
    }, [idModelo]);

    // Modal Lead

    const [showModal, setShowModal] = useState(false);
    const [idVeiculo, setIdVeiculo] = useState(null);

    const handleShow = (id) => {

        if (blindagemEspecificacao) {
            let objToSend = {
                categoria: blindagemEspecificacao["id"],
                lead: null,
                modelo: modeloSelecionado,
                especificacoes: []
            }

            let tipo_vidro = radioGarantias.filter(d => d.key == `garantia-${selectedOption}`)
            let opcionaisSelecionados = opcionais.map(opcional => {
                return opcional["produtos"].filter(d => typeof d.checked != 'undefined' && d.checked == true)
            })
            opcionaisSelecionados = opcionaisSelecionados.filter(d => d.length > 0)
            opcionaisSelecionados.flat(1)

            let licencasSelecionadas = licencas.map(licenca => {
                return licenca["produtos"].filter(d => typeof d.checked != 'undefined' && d.checked == true)
            })
            licencasSelecionadas = licencasSelecionadas.filter(d => d.length > 0)
            licencasSelecionadas = licencasSelecionadas.flat(1)


            const objTipoVidro = {
                id: tipo_vidro[0]['id_especificacao'],
                sku: "tipo_vidro",
                produtos: tipo_vidro[0]["produtos"].filter(d => d.sku === selectedTipoVidro).map(item => item.sku)
            }


            opcionais.forEach((opcional, index1) => {
                opcionaisSelecionados.forEach((selecionado, index2) => {

                    if (opcional['produtos'].length > 0) {
                        if (selecionado[0].id == opcional['produtos'][0]['id']) {
                            const objOpcionaisSelecionados = {
                                id: opcional['id_especificacao'],
                                sku: opcional['sku'],
                                produtos: [selecionado[0].sku]
                            }
                            objToSend.especificacoes.push(objOpcionaisSelecionados)
                        }
                    }

                })
            })

            // const objOpcionaisSelecionados = {
            //     id: opcionais['id_especificacao'],
            //     sku: opcionais['sku'],
            //     produtos: opcionaisSelecionados.map(item => item.sku)
            // }

            const objTetoSolar = {
                id: radioTetoSolar["id_especificacao"],
                sku: radioTetoSolar["sku"],
                produtos: [
                    selectedTipoTetoSolar
                ]
            }

            // licencas.forEach((licenca) => {
            //     const objLicencasSelecionados = {
            //         id: licenca['id_especificacao'],
            //         sku: licenca['sku'],
            //         produtos: licencasSelecionadas.map(item => item.sku)
            //     }
            //     objToSend.especificacoes.push(objLicencasSelecionados)
            // })

            licencas.forEach((licenca, index1) => {
                licencasSelecionadas.forEach((selecionado, index2) => {

                    if (licenca['produtos'].length > 0) {
                        if (selecionado.id == licenca['produtos'][0]['id']) {
                            const objLicencasSelecionados = {
                                id: licenca['id_especificacao'],
                                sku: licenca['sku'],
                                produtos: [selecionado.sku]
                            }
                            objToSend.especificacoes.push(objLicencasSelecionados)
                        }
                    }
                })
            })



            // const objLicencasSelecionados = {
            //     id: licencas['id_especificacao'],
            //     sku: licencas['sku'],
            //     produtos: licencasSelecionadas.map(item => item.sku)
            // }

            objToSend.especificacoes.push(objTipoVidro, objTetoSolar)

            openModal(objToSend);
        }


    };
    const handleClose = () => setShowModal(false);

    const passo1 = useRef()
    const passo2 = useRef()
    const passo3 = useRef()
    const passo4 = useRef()
    const passo5 = useRef()
    const passo6 = useRef()

    //Enviar orçamento para Modal
    const [toSend, setToSend] = useState({});

    const openModal = (objToSend) => {
        setShowModal(true);
        setToSend(objToSend);
    };

    return (
        <>
            <Menu />
            <Header />
            <Banner />
            <section className='CotacaoBlindagem' id="CotacaoBlindagem">
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={6} md={6} lg={8}>
                            <ul className='CotacaoFlow'>
                                <li><a onClick={() => handleCurrentAccordion(0, modeloSelecionado != "" && blindagemEspecificacao != null)} className={`btn btn-flow ${currentKey == 0 ? 'active' : currentKey > 0 ? 'active full' : ''}`}><i><Icon className="icons" icon="mdi:check-bold" /></i>01</a></li>
                                <li><a onClick={() => handleCurrentAccordion(1, modeloSelecionado != "" && blindagemEspecificacao != null)} className={`btn btn-flow ${currentKey == 1 ? 'active' : currentKey > 1 ? 'active full' : ''}`}><i><Icon className="icons" icon="mdi:check-bold" /></i>02</a></li>
                                <li><a onClick={() => handleCurrentAccordion(2, selectedTipoVidro != null && selectedTipoVidro != '')} className={`btn btn-flow ${currentKey == 2 ? 'active' : currentKey > 2 ? 'active full' : ''}`}><i><Icon className="icons" icon="mdi:check-bold" /></i>03</a></li>
                                <li><a onClick={() => handleCurrentAccordion(3, selectedTipoVidro != null && selectedTipoVidro != '')} className={`btn btn-flow ${currentKey == 3 ? 'active' : currentKey > 3 ? 'active full' : ''}`}><i><Icon className="icons" icon="mdi:check-bold" /></i>04</a></li>
                                <li><a onClick={() => handleCurrentAccordion(4, selectedTipoVidro != null && selectedTipoVidro != '')} className={`btn btn-flow ${currentKey == 4 ? 'active' : currentKey > 4 ? 'active full' : ''}`}><i><Icon className="icons" icon="mdi:check-bold" /></i>05</a></li>
                                <li><a onClick={() => handleCurrentAccordion(5, selectedTipoVidro != null && selectedTipoVidro != '')} className={`btn btn-flow ${currentKey == 5 ? 'active' : currentKey > 5 ? 'active full' : ''}`}><i><Icon className="icons" icon="mdi:check-bold" /></i>06</a></li>
                            </ul>
                        </Col>
                    </Row>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={6} md={6} lg={12}>
                            <Accordion defaultActiveKey={0} activeKey={currentKey}>


                                {/* MODELO SELECIONADO */}
                                <Accordion.Item eventKey={0} >
                                    <Accordion.Header onClick={() => handleCurrentAccordion(0, modeloSelecionado != "" && blindagemEspecificacao != null)}>
                                        <h4><span>passo 01</span><br />Escolha o modelo do veículo</h4>
                                        <div className='CotacaoStatus'><strong>01</strong></div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <section className='CotacaoModelo' id="CotacaoModelo">
                                            <h2>Qual o modelo do veiculo que deseja blindar?</h2>
                                            <Row>
                                                <Col xs={12} sm={6} md={6} lg={5}>
                                                    <Row>
                                                        <Form.Label className='Label'>
                                                            <Dropdown emptyMessage="Sem Resultado" filter value={marcaSelecionada} onChange={handleMarcaChange} options={marcas} optionLabel="label" placeholder="Marca do carro" className='Dropdown' />
                                                        </Form.Label>
                                                        <Form.Label className='Label'>
                                                            <Dropdown emptyMessage="Sem Resultado" filter value={modeloSelecionado} onChange={handleModeloChange} options={modelos} optionLabel="label" placeholder="Modelo do carro" className='Dropdown' />
                                                        </Form.Label>
                                                        <Form.Check
                                                            type="radio"
                                                            label="Já Tenho o Veículo"
                                                            name="garantia"
                                                            checked={statusTenhoVeiculo === 'ja-tenho-veiculo'}
                                                        />
                                                        <Form.Check
                                                            type="radio"
                                                            label="Quero Encomendar"
                                                            name="garantia"
                                                            checked={statusTenhoVeiculo === 'quero-encomendar'}
                                                        />
                                                    </Row>
                                                </Col>
                                                <Col xs={12} sm={6} md={6} lg={7}>
                                                    <Row className='justify-content-md-center'>
                                                        <Col xs={12} sm={6} md={6} lg={10}>
                                                            <div className='img'>
                                                                {caminhoDaImagem ? <img src={`https://api.idzcar.com.br${caminhoDaImagem}`} alt="Imagem do modelo" /> : <img src={Default} alt="Imagem do modelo" />}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col xs={12} sm={6} md={6} lg={12} className='CotacaoAcoes'>
                                                    <button className="btn btn-primary" onClick={handleProximoClick}>PRÓXIMO</button>
                                                    {/* <button className="btn btn-default" to="/">VOLTAR</button> */}
                                                </Col>
                                            </Row>

                                        </section>
                                    </Accordion.Body>
                                </Accordion.Item>

                                {/* CONHEÇA NOSSA BLINDAGEM */}
                                <Accordion.Item eventKey={1}>
                                    <Accordion.Header onClick={() => handleCurrentAccordion(1, modeloSelecionado != "" && blindagemEspecificacao != null)}>
                                        <h4><span>passo 02</span><br />Conheça sobre a nossa blindagem</h4>
                                        <div className='CotacaoStatus'><strong>02</strong></div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <section className='ApresentacaoBlindagem'>
                                            <Row className='justify-content-md-center'>
                                                <Col xs={12} sm={6} md={6} lg={6}>
                                                    <div className='imgApresentacaoBlindagem'></div>
                                                </Col>
                                                <Col xs={12} sm={6} md={6} lg={6}>
                                                    <h2>Um <strong>novo conceito</strong><br /> de prazer ao dirigir<br /> o seu blindado</h2>
                                                    <p>Com tecnologia de ponta, essa blindagem redefine o conceito de excelência. Imagine um produto que une segurança e estabilidade, mantendo o prazer de dirigir mesmo atrás do volante de um carro blindado. A blindagem de Alta Performance 1021 foi desenvolvida nos mínimos detalhes por apaixonados por carros ao longo de 15 anos e uma busca incessante por melhorias. Unimos tudo isso á um pós-venda extremamente preocupado com o bem-estar dos nossos clientes e amigos.</p>
                                                    
                                                </Col>
                                                <Col xs={12} sm={6} md={6} lg={12} className='CotacaoAcoes'>
                                                    <button className="btn btn-primary" onClick={() => handleCurrentAccordion(currentKey + 1, modeloSelecionado != "" && blindagemEspecificacao != null)}>PRÓXIMO</button>
                                                    <button className="btn btn-default" onClick={() => handleCurrentAccordion(currentKey - 1, modeloSelecionado != "" && blindagemEspecificacao != null)}>VOLTAR</button>
                                                </Col>
                                            </Row>
                                        </section>
                                    </Accordion.Body>
                                </Accordion.Item>

                                {/* TIPO DE VIDRO */}
                                <Accordion.Item eventKey={2}>
                                    <Accordion.Header onClick={() => handleCurrentAccordion(2, selectedTipoVidro != null && selectedTipoVidro != '')}>
                                        <h4><span>passo 03</span><br />Garantia de vidros</h4>
                                        <div className='CotacaoStatus'><strong>03</strong></div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <section className='GarantiaVidro'>
                                            <Row className='justify-content-md-center'>
                                                <Col xs={12} sm={6} md={6} lg={12}>
                                                    <h2>Escolha o <strong>tempo de garantia</strong> <br />para os seus vidros </h2>
                                                </Col>
                                            </Row>
                                            <Row className='justify-content-md-center'>

                                                {radioGarantias.map((garantia) => (
                                                    <Col xs={12} sm={6} md={6} lg={6}>
                                                        <Form.Label className={`btn btn-checkfull ${selectedOption === garantia?.key.replace("garantia-", "") ? 'bg-color' : ''}`}>
                                                            <Form.Check
                                                                type="radio"
                                                                id=""
                                                                label=""
                                                                name="status"
                                                                checked={selectedOption === garantia?.key.replace("garantia-", "")}
                                                                onChange={() => handleOptionChange(garantia?.key.replace("garantia-", ""), garantia?.produtos)}
                                                            />
                                                            {garantia?.key.replace("garantia-", "")} anos de garantia
                                                        </Form.Label>
                                                    </Col>
                                                ))}

                                            </Row>

                                            {selectedOption && <>
                                                <Row className='justify-content-md-center'>
                                                    <Col xs={12} sm={6} md={6} lg={12}>
                                                        <h2>agora escolha os <strong>tipos de vidro</strong></h2>
                                                    </Col>
                                                </Row>
                                                <Row className='justify-content-md-center'>
                                                    {initializeSlick()}
                                                </Row></>}
                                            <Row className='justify-content-md-center'>
                                                <Col xs={12} sm={6} md={6} lg={12} className='CotacaoAcoes'>
                                                    <button className="btn btn-primary" onClick={() => handleCurrentAccordion(currentKey + 1, selectedTipoVidro != null && selectedTipoVidro != '')}>PRÓXIMO</button>
                                                    <button className="btn btn-default" onClick={() => handleCurrentAccordion(currentKey - 1, selectedTipoVidro != null && selectedTipoVidro != '')}>VOLTAR</button>
                                                </Col>
                                            </Row>
                                        </section>
                                    </Accordion.Body>
                                </Accordion.Item>

                                {/* OPCIONAIS */}
                                <Accordion.Item eventKey={3} >
                                    <Accordion.Header onClick={() => handleCurrentAccordion(3, selectedTipoVidro != null && selectedTipoVidro != '')}>
                                        <h4><span>passo 04</span><br />OPCIONAIS</h4>
                                        <div className='CotacaoStatus'><strong>04</strong></div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <section className='Opcionais'>
                                            <Row className='justify-content-md-center'>
                                                <Col xs={12} sm={6} md={6} lg={12}>
                                                    <h2>Escolha Os <strong> Melhores Opcionais</strong> para SEU BLINDADO</h2>
                                                </Col>
                                                <Col xs={12} sm={6} md={6} lg={5}>
                                                    <div className='imgOpcionais'></div>
                                                </Col>
                                                <Col xs={12} sm={6} md={6} lg={7}>
                                                    <Row>
                                                        {opcionais?.map((opcional, index1) => {

                                                            return opcional["produtos"].map((produto, index2) => (
                                                                <Col xs={12} sm={6} md={6} lg={12}>
                                                                    <Form.Label className={`btn btn-option ${opcional["produtos"][index2]?.checked ? 'bg-color' : ''}`}>
                                                                        <Form.Check
                                                                            type="checkbox"
                                                                            id=""
                                                                            label=""
                                                                            name={opcional?.titulo}
                                                                            checked={opcional["produtos"][index2]?.checked}
                                                                            onChange={(e) =>
                                                                                // handleIntercomunicadorChange("sim")
                                                                                handleOpcionalDynamic(e.target?.checked, "checked", index1, index2)
                                                                            }
                                                                        />
                                                                        {produto?.titulo}
                                                                        <span>{produto?.descricao}</span>
                                                                    </Form.Label>
                                                                </Col>
                                                            ))

                                                        })}


                                                    </Row>

                                                </Col>

                                                <Col xs={12} sm={6} md={6} lg={12} className='CotacaoAcoes'>
                                                    <button className="btn btn-primary" onClick={() => handleCurrentAccordion(currentKey + 1, true)}>PRÓXIMO</button>
                                                    <button className="btn btn-default" onClick={() => handleCurrentAccordion(currentKey - 1, true)}>VOLTAR</button>
                                                </Col>
                                            </Row>
                                        </section>
                                    </Accordion.Body>
                                </Accordion.Item>

                                {/* TETO SOLAR */}
                                <Accordion.Item eventKey={4}>
                                    <Accordion.Header onClick={() => handleCurrentAccordion(4, selectedTipoVidro != null && selectedTipoVidro != '')}>
                                        <h4><span>passo 05</span><br />TETO SOLAR</h4>
                                        <div className='CotacaoStatus'><strong>05</strong></div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <section className='TetoSolar'>
                                            <Row className='justify-content-md-center'>
                                                <Col xs={12} sm={6} md={6} lg={12}>
                                                    <h2>Escolha as<strong>especificações</strong></h2>
                                                </Col>
                                                <Col xs={12} sm={6} md={6} lg={5}>
                                                    <div className='imgTetoSolar'></div>
                                                </Col>
                                                <Col xs={12} sm={6} md={6} lg={7}>
                                                    <h3>Seu carro possui teto solar?</h3>
                                                    <Row>
                                                        <Col xs={12} sm={6} md={6} lg={6}>
                                                            <Form.Label className={`btn btn-option ${selectedTetoSolar === "sim" ? 'bg-color' : ''}`}>
                                                                <Form.Check
                                                                    type="radio"
                                                                    id=""
                                                                    label=""
                                                                    name="TetoSolar"
                                                                    checked={selectedTetoSolar === "sim"}
                                                                    onChange={() => handleTetoSolarChange("sim")}
                                                                />
                                                                Sim, possui teto solar
                                                            </Form.Label>
                                                        </Col>
                                                        <Col xs={12} sm={6} md={6} lg={6}>
                                                            <Form.Label className={`btn btn-option ${selectedTetoSolar === "nao" ? 'bg-color' : ''}`}>
                                                                <Form.Check
                                                                    type="radio"
                                                                    id=""
                                                                    label=""
                                                                    name="TetoSolar"
                                                                    checked={selectedTetoSolar === "nao"}
                                                                    onChange={() => handleTetoSolarChange("nao")}
                                                                />
                                                                Não tem teto solar
                                                            </Form.Label>
                                                        </Col>
                                                    </Row>

                                                    {
                                                        selectedTetoSolar == "sim" && <>
                                                            <h3>Qual o tipo de teto solar?</h3>
                                                            <Row>
                                                                {radioTetoSolar["produtos"]?.map((tetoSolar, index) => (
                                                                    <Col xs={12} sm={6} md={6} lg={4}>
                                                                        <Form.Label className={`btn btn-option ${selectedTipoTetoSolar === tetoSolar?.sku ? 'bg-color' : ''}`}>
                                                                            <Form.Check
                                                                                type="radio"
                                                                                id=""
                                                                                label=""
                                                                                name="TipoTetoSolar"
                                                                                checked={selectedTipoTetoSolar === tetoSolar?.sku}
                                                                                onChange={() => handleTipoTetoSolarChange(tetoSolar?.sku)}
                                                                            />
                                                                            {tetoSolar?.titulo}
                                                                        </Form.Label>
                                                                    </Col>
                                                                ))}
                                                            </Row></>
                                                    }

                                                    {/* {
                                                        selectedTetoSolar == "sim" && <>
                                                            <h3>escolha os opcionais de teto</h3>
                                                            <Row>
                                                                <Col xs={12} sm={6} md={6} lg={6}>
                                                                    <Form.Label className={`btn btn-option ${selectedOpcionalTetoSolar === "sim" ? 'bg-color' : ''}`}>
                                                                        <Form.Check
                                                                            type="radio"
                                                                            id=""
                                                                            label=""
                                                                            name="OpcionalTetoSolar"
                                                                            checked={selectedOpcionalTetoSolar === "sim"}
                                                                            onChange={() => handleOpcionalTetoSolarChange("sim")}
                                                                        />
                                                                        Translúcido
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col xs={12} sm={6} md={6} lg={6}>
                                                                    <Form.Label className={`btn btn-option ${selectedOpcionalTetoSolar === "nao" ? 'bg-color' : ''}`}>
                                                                        <Form.Check
                                                                            type="radio"
                                                                            id=""
                                                                            label=""
                                                                            name="OpcionalTetoSolar"
                                                                            checked={selectedOpcionalTetoSolar === "nao"}
                                                                            onChange={() => handleOpcionalTetoSolarChange("nao")}
                                                                        />
                                                                        Opaco Funcional
                                                                    </Form.Label>
                                                                </Col>
                                                            </Row>
                                                        </>
                                                    } */}

                                                </Col>

                                                <Col xs={12} sm={6} md={6} lg={12} className='CotacaoAcoes'>
                                                    <button className="btn btn-primary" onClick={() => handleCurrentAccordion(currentKey + 1, true)}>PRÓXIMO</button>
                                                    <button className="btn btn-default" onClick={() => handleCurrentAccordion(currentKey - 1, true)}>VOLTAR</button>
                                                </Col>
                                            </Row>
                                        </section>
                                    </Accordion.Body>
                                </Accordion.Item>

                                {/* LICENÇAS */}
                                <Accordion.Item eventKey={5} >
                                    <Accordion.Header onClick={() => handleCurrentAccordion(5, selectedTipoVidro != null && selectedTipoVidro != '')}>
                                        <h4><span>passo 06</span><br />Falta pouco para finalizar o seu orçamento!</h4>
                                        <div className='CotacaoStatus'><strong>06</strong></div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <section className='TetoSolar'>
                                            <Row className='justify-content-md-center'>
                                                <Col xs={12} sm={6} md={6} lg={12}>
                                                    <h2>precisa de uma mão na documentação? <strong>nós cuidamos para você!</strong></h2>
                                                </Col>
                                                <Col xs={12} sm={6} md={6} lg={5}>
                                                    <div className='imgDocumentacao'></div>
                                                </Col>
                                                <Col xs={12} sm={6} md={6} lg={7}>
                                                    <Row>

                                                        {
                                                            licencas?.map((licenca, index1) => {

                                                                return licenca["produtos"].map((produto, index2) => (
                                                                    <Col xs={12} sm={6} md={6} lg={12} >
                                                                        <Form.Label className={`btn btn-option ${licenca["produtos"][index2]?.checked ? 'bg-color' : ''}`}>
                                                                            <Form.Check
                                                                                type="checkbox"
                                                                                id=""
                                                                                label=""
                                                                                name="Autorizacao"
                                                                                checked={licenca["produtos"][index2]?.checked}
                                                                                onChange={(e) => handleLicencasDynamic(e.target.checked, "checked", index1, index2)}
                                                                            />
                                                                            {produto.titulo}
                                                                        </Form.Label>
                                                                    </Col>
                                                                ))

                                                            })
                                                        }
                                                        {/*
                                                        <Col xs={12} sm={6} md={6} lg={12}>
                                                            <Form.Label className={`btn btn-option ${selectedAutorizacao === "sim" ? 'bg-color' : ''}`}>
                                                                <Form.Check
                                                                    type="checkbox"
                                                                    id=""
                                                                    label=""
                                                                    name="Autorizacao"
                                                                    checked={selectedAutorizacao === "sim"}
                                                                    onChange={() => handleAutorizacaoChange("sim")}
                                                                />
                                                                Autorização e declaração do exército
                                                            </Form.Label>
                                                        </Col>
                                                        <Col xs={12} sm={6} md={6} lg={12}>
                                                            <Form.Label className={`btn btn-option ${selectedDetran === "nao" ? 'bg-color' : ''}`}>
                                                                <Form.Check
                                                                    type="checkbox"
                                                                    id=""
                                                                    label=""
                                                                    name="Detran"
                                                                    checked={selectedDetran === "nao"}
                                                                    onChange={() => handleDetranChange("nao")}
                                                                />
                                                                regularização do detran
                                                            </Form.Label>
                                                        </Col>*/}
                                                    </Row>

                                                </Col>

                                                <Col xs={12} sm={6} md={6} lg={12} className='CotacaoAcoes'>
                                                    <button className="btn btn-primary" onClick={() => handleShow()}>PRÓXIMO</button>
                                                    <button className="btn btn-default" onClick={() => handleCurrentAccordion(currentKey - 1, true)}>VOLTAR</button>
                                                </Col>
                                            </Row>
                                        </section>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={12}>
                            <button className="btn btn-primary callToAction" onClick={() => handleShow()}>Ver proposta</button>
                        </Col>
                    </Row>


                </Container >
            </section >

            <LeadBlindagem showModal={showModal} handleClose={handleClose} toSend={toSend} />
            <Footer />
        </>

    );
}

export default CotacaoBlindagem;
