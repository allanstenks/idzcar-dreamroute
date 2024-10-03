import React, { useEffect, useState, useRef  } from 'react';
import { Col, Container, Row, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";

// Style
import './PPF.scss';

//Imagens
import imgPPF from './img/imgPPF.webp'
import logoPPF from './img/logoPPF.webp'
import m2 from './img/img-m2.webp'
import ceramic from './img/logo-ceramic.webp'
import profilm from './img/logo-Profilm.webp'
import logoProfilm from './img/logoProfilm.webp'
import ImglogoProfilm from './img/ImglogoProfilm.webp'

//Componentes
import GaleriaCeramicPro from "../../../components/Estetica/GaleriaCeramicPro";
import GaleriaProfilm from "../../../components/Estetica/GaleriaProfilm";

function PPF() {

    const [exibirPPF, setExibirPPF] = useState(true);

    const toggleExibicao = () => {
        setExibirPPF(!exibirPPF);
    };

    return (
        <>
            <section className='PPF1021'>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={12} lg={6} className='imgPPF1021'>
                            <img src={m2} />
                        </Col>
                        <Col xs={12} sm={6} md={12} lg={6} className='boxPPF1021'>
                            <div className='textPPF1021'>
                                <h2>Paint Protection Film (PPF) da 1021 Motors! </h2>
                                <h3>Aqui, trabalhamos com dois grandes fornecedores: Ceramic Pro e Profilm</h3>
                                <p>
                                A Ceramic Pro é conhecido por sua durabilidade excepcional, protegendo sua pintura por anos. Já o Profilm destaca-se pela versatilidade, adaptando-se a diferentes superfícies. Na 1021 Motors, oferecemos o melhor dos dois mundos: qualidade excepcional e ótimo custo-benefício. Seja qual for sua preferência, estamos aqui para atender suas necessidades.<br /><br />
                                Venha descobrir uma nova era de cuidados com a pintura em nossa sessão de PPF. Na 1021 Motors, sua satisfação é nossa prioridade!
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='PPF'>
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={6} md={12} lg={12}>
                            <div className='filtrosMarcas'>
                                <Button onClick={toggleExibicao}  className={exibirPPF ? 'active' : ''}><img src={ceramic} /></Button>
                                <Button onClick={toggleExibicao} className={!exibirPPF ? 'active btn-profilm' : 'btn-profilm'} ><img src={profilm} /></Button>
                            </div>   
                        </Col>
                        {exibirPPF ? (
                        <Col xs={12} sm={6} md={12} lg={12} className='BoxCeramicPro'>
                            <Row>
                                <Col xs={12} sm={6} md={12} lg={6} className='imgPPF'>
                                    <img src={imgPPF} />
                                </Col>
                                <Col xs={12} sm={6} md={12} lg={6} className='boxPPF'>
                                    <div className='textPPF'>
                                        <img src={logoPPF} />
                                        <h2>Aplicação de PPF<strong><br/>O PPF (Paint Protection Film) Kavaca by Ceramic Pro </strong></h2>
                                        <p>
                                        KAVACA PPF é um filme de poliuretano alifático de alto desempenho. Ele é projetado especificamente para proteger superfícies pintadas e outros materiais contra abrasão, corrosão, produtos químicos e outros tipos de danos físicos.<br/><br/>
                                        Dentro da linha KAVACA de películas protetoras de pintura, existem várias soluções personalizadas - incluindo KAVACA Ceramic Coated Paint Protection Film e KAVACA Matte PPF.<br/><br/>
                                        É uma película de alta performance que oferece uma proteção física para o seu carro, prevenindo de pedradas e arranhões na pintura. Além disso mantém o brilho por até 12 anos da pintura. Isso devido a KAVACA Ceramic Coated PPF ser a única verdadeira película de proteção de tinta com infusão de cerâmica do mercado. KAVACA Ceramic Coated chega da fábrica pré-revestido com a fórmula proprietária de PPF e Vinil da Ceramic Pro. Isso permite que você tenha todos os benefícios do filme de proteção de pintura auto-reparador com a ação hidrofóbica e auto-limpante adicionada de um revestimento cerâmico Ceramic Pro.
                                        </p>
                                    </div>
                                </Col>
                                <Col xs={12} sm={6} md={12} lg={12}>
                                    <GaleriaCeramicPro />
                                </Col>
                            </Row>
                        </Col>
                        ) : (
                        <Col xs={12} sm={6} md={12} lg={12} className='BoxProfilm'>
                            <Row>
                                <Col xs={12} sm={6} md={12} lg={6} className='imgPPF'>
                                    <img src={ImglogoProfilm} />
                                </Col>
                                <Col xs={12} sm={6} md={12} lg={6} className='boxPPF'>
                                    <div className='textPPF'>
                                        <img src={logoProfilm} />
                                        <h2>Aplicação de PPF<strong><br/>HYDRO ELITE </strong></h2>
                                        <p>
                                            Explore a excelência em proteção de pintura com Profilm Hydro Elite, um dos principais produtos disponíveis no mercado. Desenvolvido para atender às demandas dos entusiastas automotivos mais exigentes, o Profilm Hydro Elite destaca-se pela sua avançada tecnologia e versatilidade incomparável.<br/><br/>
                                            Este produto de última geração oferece uma proteção excepcional contra os elementos, incluindo raios UV, manchas de água, insetos e arranhões leves. Sua fórmula exclusiva forma uma barreira resistente, mantendo a beleza da pintura do seu veículo por muito mais tempo.<br/><br/>
                                            Além disso, o Profilm Hydro Elite é conhecido por sua facilidade de aplicação e manutenção, proporcionando uma experiência sem complicações para os proprietários de veículos. Sua capacidade de adaptação a diferentes tipos de superfícies garante resultados impecáveis em qualquer carro, seja ele novo ou antigo.<br/><br/>
                                            Descubra o que o Profilm Hydro Elite pode fazer pelo seu carro. Experimente a diferença de uma proteção de pintura verdadeiramente premium.
                                        </p>
                                    </div>
                                </Col>
                                <Col xs={12} sm={6} md={12} lg={12}>
                                    <GaleriaProfilm />
                                </Col>
                            </Row>
                        </Col>
                        )}
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default PPF;