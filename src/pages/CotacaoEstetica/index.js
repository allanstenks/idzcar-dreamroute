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
import Banner from "../../components/CotacaoEstetica/Banner";

//Imagens
import Default from './img/Default.png'

// Styles
import './CotacaoEstetica.scss';
import 'react-tooltip/dist/react-tooltip.css'
import { useNavigationIdz } from '../../context/useNavigation';
import LeadEstetica from '../../components/Estetica/LeadEstetica';

function CotacaoEstetica() {
    const { navigation, idzOrigin, idzEvent, loading } = useNavigationIdz()

    const [showModal, setShowModal] = useState(false);
    const [toSend, setToSend] = useState({})

    const categoriaRef = useRef(null);
    const servicoRef = useRef(null);
    const variacaoRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    const openModal = (objToSend) => {
        setShowModal(true);
        setToSend(objToSend);
    };

    const handleClose = () => setShowModal(false);

    useEffect(() => {
        if (!loading) {
            idzOrigin(window.location.href)
            idzEvent("paginas_acessadas", "Cotação Estetica")
        }
    }, [loading])

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
            const response = await api.get(`/api/modelos/marca/${marca_id}?origem=estetica&agrupado=1`);
            if (response.data) {
                const lista = response.data.filter(modelo => modelo.status === "Ativo")
                    .map(modelo => ({ label: modelo.titulo, value: modelo.id }));
                setModelos(lista);
            }
        } catch (error) {
            console.error("Erro ao obter modelos:", error);
        }
    };

    const [servicos, setServicos] = useState([])

    const getServicos = async (id) => {
        setVariacao([])
        try {
            await api.get(`/api/servico-estetica?categoria=${id}`).then((response) => {
                if (response.data) {
                    const lista = response.data.filter(servico => servico.status === "Ativo")

                    setServicos(lista);



                }
            });
        } catch (error) {
            console.error("Erro ao obter modelos:", error);
        }
    };


    const [categoriaId, setCategoriaId] = useState(null)

    const selectCategoria = (id) => {
        setCategoriaId(id)
        setSelectedServico(null)
        getServicos(id)
    }



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
        setSelectedServico(null)
        setOpcionais([])
        setServicos([])
        setModeloSelecionado(modeloId);

    };

    const [selectedServico, setSelectedServico] = useState(null)
    const handleServico = (id) => {
        setShowSubmit(false)
        setOpcionais([])
        setSelectedServico(id)
    }


    const [variacao, setVariacao] = useState([])

    const getServicoById = async (id) => {

        try {
            const response = await api.get(`/api/servico-estetica/${id}`);
            if (response.data) {
                const opc = response.data['opcionais']

                opc.forEach(op => {
                    op["checked"] = false;
                })
                setVariacao(opc)
            }
        } catch (error) {
            console.error("Erro ao obter modelos:", error);
        }
    };


    useEffect(() => {
        if (selectedServico) {
            getServicoById(selectedServico)
        }
    }, [selectedServico])

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

    const postData = () => {
        const objData = {
            categoria: categoriaId,
            lead: null,
            modelo: modeloSelecionado,
            servico: selectedServico,
            opcionais: opcionais
        }

        console.log(objData)
        openModal(objData)
    }

    // Listar Categorias

    const [categorias, setCategorias] = useState([]);

    const [opcionais, setOpcionais] = useState([])
    const handleOpcionais = (id, isIndividual) => {
        setOpcionais((prevValues) => {
            if (isIndividual) {
                // Se o item é individual e já está selecionado, desmarque-o
                if (prevValues.includes(id)) {
                    return [];
                } else {
                    // Se o item é individual e não está selecionado, desmarque todos os outros e marque apenas este
                    return [id];
                }
            } else {
                // Desmarcar qualquer item individual
                const newValues = prevValues.filter(item => {
                    const itemVari = variacao.find(vari => vari.id === item);
                    return itemVari && itemVari.individual !== 1;
                });

                // Adicionar ou remover o item normalmente
                if (newValues.includes(id)) {
                    return newValues.filter(item => item !== id);
                } else {
                    return [...newValues, id];
                }
            }
        });
    };
    useEffect(() => {
        console.log(opcionais)
    }, [opcionais])

    useEffect(() => {
        getCategoria();
    }, []);

    const getCategoria = async () => {
        try {
            const res = await api.get(`/api/categoria-estetica?origem=site`);
            if (res.status === 200) {
                console.log('Categorias obtidas:', res.data);
                setCategorias(res.data); // Certifique-se de que res.data seja um array de objetos

            }
        } catch (error) {
            console.error('Erro ao obter categorias:', error);
        }
    };
    useEffect(() => {
        console.log(categoriaRef.current)
        if (categoriaRef.current) {
            if (categorias.length > 0) {
                scrollToSection(categoriaRef);
            }
        }
    }, [categorias, modeloSelecionado])

    // Listagem de variações

    const sliderRef = useRef(null);
    const next = () => {
        sliderRef.current.slickNext();
    };
    const previous = () => {
        sliderRef.current.slickPrev();
    };
    const reset = () => {
        sliderRef.current.slickGoTo(0)
    }
    var settings = {
        dots: false,
        arrow: false,
        speed: 500,
        infinite: false,
        slidesToShow: isMobile ? 1 : 4,
        slidesToScroll: 1,
        infinite: isMobile ? true : false
    };

    useEffect(() => {
        console.log(servicoRef.current)
        if (servicoRef.current) {
            if (categorias.length > 0) {
                scrollToSection(servicoRef);
            }
        }
    }, [servicos, selectedServico])

    useEffect(() => {
        console.log(variacaoRef.current)
        if (variacaoRef.current) {
            if (categorias.length > 0) {

                scrollToSection(variacaoRef);
            }
        }
    }, [variacao, selectedServico])

    function goToLast() {
        if (categoriaRef.current && servicoRef.current && variacaoRef.current) {
            scrollToSection(variacaoRef);
        } else {
            if (categoriaRef.current && servicoRef.current) {
                scrollToSection(servicoRef);
            } else {
                scrollToSection(categoriaRef);
            }
        }
    }

    const [showSubmit, setShowSubmit] = useState(false);

    useEffect(() => {
        if (variacao.length == 0) {
            setShowSubmit(true)
        }
        if (variacao.length == 1) {
            setShowSubmit(true)
            handleOpcionais(variacao[0].id, variacao[0].individual === 1)
        }
        if (variacao.length > 1) {
            setShowSubmit(false)
        }

    }, [variacao])

    useEffect(()=>{
        if(opcionais.length > 0 && variacao.length > 1){
            setShowSubmit(true)
        }else{
            if(opcionais.length > 0 && variacao.length == 1){
                setShowSubmit(true)
            }else{
               setShowSubmit(false) 
            }
        }
    },[opcionais])


    return (
        <>
            <Menu />
            <Header />
            <Banner />
            <section className='CotacaoEstetica' id="CotacaoEstetica">
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={6} md={6} lg={8}>
                            <section className='CotacaoModelo' id="CotacaoModelo">
                                <h2>Qual o modelo do veiculo<br /> <strong>que deseja orçar?</strong></h2>
                                <a className='btn btn-down' onClick={goToLast}><i><Icon className="icons" icon="iconoir:arrow-down" /></i></a>
                                <Row>
                                    <Col xs={12} sm={6} md={6} lg={6}>
                                        <Form.Label className='Label'>
                                            <Dropdown emptyMessage="Sem Resultado" filter value={marcaSelecionada} onChange={handleMarcaChange} options={marcas} optionLabel="label" placeholder="Marca do carro" className='Dropdown' />
                                        </Form.Label>
                                    </Col>

                                    <Col xs={12} sm={6} md={6} lg={6}>
                                        <Form.Label className='Label'>
                                            <Dropdown emptyMessage="Sem Resultado" filter value={modeloSelecionado} onChange={handleModeloChange} options={modelos} optionLabel="label" placeholder="Modelo do carro" className='Dropdown' />
                                        </Form.Label>
                                    </Col>

                                    <Col xs={12} sm={6} md={6} lg={12}>
                                        <Row className='justify-content-md-center'>
                                            <Col xs={12} sm={6} md={6} lg={10}>
                                                <div className='img'>
                                                    {caminhoDaImagem ? <img src={`https://api.idzcar.com.br${caminhoDaImagem}`} alt="Imagem do modelo" /> : <img src={Default} alt="Imagem do modelo" />}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </section>
                        </Col>
                    </Row>
                </Container >
            </section>

            {
                marcaSelecionada && modeloSelecionado && categorias.length > 0 ? 
                <section ref={categoriaRef} className='ListarCategorias' id="ListarCategorias">
                    <Container>
                        <Row className='justify-content-md-center'>
                            <Col xs={12} sm={6} md={6} lg={10}>
                                <h2>Qual serviço de estética vocÊs está procurando?</h2>
                                <h4>Selecione o de sua preferência</h4>
                            </Col>
                            <Col xs={12} sm={6} md={6} lg={10}>
                                {Array.isArray(categorias) && categorias.length > 0 ? (
                                    categorias.map(categoria => (
                                        <button className={`btn btn-border ${categoria.id == categoriaId ? "active" : ""}`} onClick={() => { selectCategoria(categoria.id) }}>{categoria.titulo}</button>
                                    ))
                                ) : (
                                    <p>Nenhuma categoria encontrada.</p>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </section> : <></>
            }

            {
                marcaSelecionada && modeloSelecionado && categoriaId && servicos.length > 0 ? <section ref={servicoRef} className='ListarPPFTranparente' id="ListarPPFTranparente">
                    <Container>
                        <Row className='justify-content-md-center'>
                            {console.log("servicos", servicos.length)}
                            {servicos.length > 1 && servicos.some(servico => servico.categoria_estetica_id === 11) ? ( 
                                <Col xs={12} sm={6} md={6} lg={10}>
                                    <h2>Qual tipo você prefere?</h2>
                                    <h4>Selecione o de sua preferência</h4>
                                </Col>

                           ) : ( 
                                <Col xs={12} sm={6} md={6} lg={10}>
                                    <h2>Conheça nosso produto</h2>
                                    <h4>Selecione para continuar com a cotação.</h4>
                                </Col>
                            )} 
                            {servicos?.length > 1 ? ( <>

                                {servicos.map(servico => {
                                    return (
                                        <Col xs={12} sm={6} md={6} lg={5}>
                                            <div className="produto">
                                                <div className='ItemProduto'>
                                                    <div className="imagem" style={{ background: `url(${process.env.REACT_APP_API_URL}${servico?.imagem})  no-repeat center top`}}></div>
                                                    <div className="descricao">
                                                        <h2>{servico.titulo}</h2>
                                                        <p>{servico.descricao}</p>
                                                        <Form.Label className={`btn btn-checkfull sub ${selectedServico === servico?.id ? 'bg-color' : ''}`}>
                                                            <Form.Check
                                                                type="radio"
                                                                id=""
                                                                label="Selecionar"
                                                                name="Servico"
                                                                checked={selectedServico === servico?.id}
                                                                onChange={() => handleServico(servico?.id)}
                                                            />
                                                        </Form.Label>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    );
                                })}
                            </>
                            ) : (
                                <>
                                    {servicos.map(servico => {
                                        return (<>
                                            <Col xs={12} sm={6} md={6} lg={10}>
                                                <div className="produto unico">
                                                    <div className='ItemProduto'>
                                                        <Row>
                                                            <Col xs={12} sm={6} md={6} lg={6}>
                                                            <div className="imagem" style={{ background: `url(${process.env.REACT_APP_API_URL}${servico.criativo_imagem}) no-repeat center / cover` }}></div>
                                                            </Col>
                                                            <Col xs={12} sm={6} md={6} lg={6}>
                                                                <div className="descricao">
                                                                    <h2>{servico.titulo}</h2>
                                                                    <p>{servico.descricao}</p>
                                                                    <Form.Label className={`btn btn-checkfull sub ${selectedServico === servico?.id ? 'bg-color' : ''}`}>
                                                                        <Form.Check
                                                                            type="radio"
                                                                            id=""
                                                                            label="Selecionar"
                                                                            name="Servico"
                                                                            checked={selectedServico === servico?.id}
                                                                            onChange={() => handleServico(servico?.id)}
                                                                        />
                                                                    </Form.Label>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>
                                        </>
                                        );
                                    })}
                                </>
                            )}
                        </Row>
                    </Container >
                </section> : <></>
            }
            {
                marcaSelecionada && modeloSelecionado && categoriaId && selectedServico && servicos.length > 0 && variacao.length > 1 ? <section ref={variacaoRef} className='ListarPPFTranparente' id="ListarPPFTranparente">
                    <Container>
                        <Row className='justify-content-md-center'>
                            <Col xs={12} sm={6} md={6} lg={10}>
                                <h2>Onde gostaria de aplicar?</h2>
                                <h4>Caso prefira, selecione mais de uma opção.</h4>
                            </Col>
                            <Col xs={12} sm={6} md={6} lg={10}>
                                <Slider {...settings} ref={sliderRef}>

                                    {variacao?.map((vari, index) => (
                                        <div
                                            key={index}
                                            className='variacao'
                                            onClick={() => handleOpcionais(vari.id, vari.individual === 1)}
                                        >
                                            <div
                                                className={`itemVariacao ${vari?.individual === 1 ? 'individual' : ''
                                                    } ${opcionais.includes(vari.id) ? 'selecionada' : ''}`}
                                            >
                                                <div className="foto" style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}${vari?.imagem})` }}></div>
                                                <div className="desc">
                                                    <h3>{vari?.titulo}</h3>
                                                    <p>{vari?.descricao}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={10} className='SliderControl'>
                                <a className='nextSlider' onClick={next}><Icon className="icons" icon="ooui:previous-rtl" /></a>
                                <a className='prevSlider' onClick={previous}><Icon className="icons" icon="ooui:previous-ltr" /></a>
                            </Col>
                        </Row>
                    </Container >
                </section> : <></>
            }

            {
                marcaSelecionada && modeloSelecionado && categoriaId && selectedServico && servicos.length > 0 && showSubmit ?
                    <section className='VerProposta' id="VerProposta">
                        <Container>
                            <Row className='justify-content-md-center'>
                                <Col xs={12} sm={6} md={6} lg={10} className=''>
                                    <h2>Tudo pronto!</h2>
                                    <h3>Receba a sua proposta em tempo real</h3>
                                    <button className="btn btn-primary callToAction" onClick={postData}>Ver proposta</button>
                                </Col>
                            </Row>
                        </Container >
                    </section> : <></>
            }


            <LeadEstetica showModal={showModal} handleClose={handleClose} toSend={toSend} />
            <Footer />
        </>

    );
}

export default CotacaoEstetica;
