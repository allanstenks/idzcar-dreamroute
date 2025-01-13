import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate  } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import api from '../../../services/apiIdz';
import { useMediaQuery } from 'react-responsive';
import { Link, useParams } from 'react-router-dom';

// Style
import './Relacionados.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Relacionados({idVeiculo}) {
    const [relacionados, setRelacionados] = useState([]);
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); 

    let sliderRef = useRef(null);
    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };
    var settings = {
        dots: false,
        arrow: false,
        speed: 500,
        infinite: false ,
        slidesToShow: isMobile ? 1 : 3,
        slidesToScroll: 1,
        infinite: isMobile ? true : false
    };

    const fetchRelacionados = async () => {
        try {
            if (idVeiculo !== undefined) {
                const response = await api.get(`/api/associar-veiculos?origem=site&veiculo_id=${idVeiculo}`);
                if (response.data) {
                    setRelacionados(response.data);
                } else {
                    console.log('Nenhum destaque recebido da API.');
                }
            } else {
                console.log('ID do veículo é undefined.');
            }
        } catch (error) {
            console.error('Erro ao buscar os destaques:', error);
        }
    };

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        fetchRelacionados();
        scrollToTop();
    }, [idVeiculo]);
    return (
        <>
            {relacionados && relacionados.length > 0 && (
                <section className='Relacionados'>
                    <Container>
                        <Row>
                            <Col xs={12} sm={6} md={6} lg={6}>
                                <h2 className='titilos'><i></i> <br/>Você também <strong>pode gostar</strong></h2>
                            </Col>
                            <Col xs={12} sm={6} md={6} lg={6}>
                                <div className='headerAction'>
                                    <a className="btn btn-quaternary" to="/">veja todos os modelos</a>
                                </div>
                            </Col>

                            <Col xs={12} sm={12} md={12} lg={12} className='sliderDestaques'>
                                <Slider {...settings} ref={slider => {sliderRef = slider;}}>
                                    {relacionados.map((relacionado,index) => (
                                        <div className='itemVeiculos' key={index}>
                                           <div className='foto' style={{ background: `url(https://api.dreamroute.com.br/${relacionado.imagem})  no-repeat center / cover` }}>
                                                    {relacionado.blindado == 1 && <span>Blindados </span>}
                                                </div>
                                                <div className='desc'>
                                                    <h6>{relacionado.ano_modelo} / {relacionado.ano_fabricacao}</h6>
                                                    {relacionado.status === "Vendido" ? <span className='Vendido'><Icon className="icons" icon="lets-icons:check-fill" /> Vendido</span> : ''}
                                                    <h3>{relacionado.modelo}</h3>
                                                    <div className="acao">
                                                        <div className='valor'>
                                                            <span>VALOR</span>
                                                            <h2>{relacionado.preco}</h2>
                                                        </div>
                                                        <Link className="btn btn-quaternary" to={`/detalhe/${relacionado.seo_url}`}>Mais detalhes<Icon className="icons" icon="basil:arrow-up-outline" /></Link>
                                                    </div>
                                                </div>
                                        </div>
                                    ))}
                                </Slider>
                            </Col>
                            {relacionados && relacionados.length > 3 && (
                                <Col xs={12} sm={12} md={12} lg={12} className='SliderControl'>
                                    <a className='nextSlider' onClick={next}><Icon className="icons" icon="ooui:previous-ltr"/></a>
                                    <a className='prevSlider' onClick={previous}><Icon className="icons"  icon="ooui:previous-rtl"/></a>
                                </Col>
                            )}
                        </Row>
                    </Container>
                </section>
            )}
        </>

    );
}

export default Relacionados;
