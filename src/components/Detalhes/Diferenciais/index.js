import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Col, Row, Container } from "react-bootstrap";
import { Dropdown } from 'primereact/dropdown';
import InputMask from 'react-input-mask';
import Slider from 'react-slick';
import api from '../../../services/apiIdz';
// Styles
import './Diferenciais.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';



const Diferenciais = ({diferenciais}) => {


    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);

    const slider1Ref = useRef(null);
    const slider2Ref = useRef(null);
  
    const settings1 = {
      infinite: false,
      arrow: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: (current) => {
        setCurrentSlide(current);
        setTotalSlides(slider1Ref.current.props.children.length);
      },
    };

    const dotsEnabled = diferenciais && diferenciais.length > 1;
  
    const settings2 = {
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: nav1,
      arrows: dotsEnabled, // Define se os dots devem ser exibidos ou não
      ref: (slider) => setNav2(slider2Ref.current = slider),
    };

    useEffect(() => {
        if (slider1Ref.current && slider1Ref.current.props && slider1Ref.current.props.children) {
          setTotalSlides(slider1Ref.current.props.children.length);
          // Se o total de slides for zero, ajuste para o primeiro slide
          if (totalSlides === 0) {
            slider1Ref.current.slickGoTo(0);
          }
        }
      }, [diferenciais, totalSlides]);
    
      useEffect(() => {
        // Se diferenciais existir e não for vazio
        if (diferenciais && diferenciais.length > 0) {
          setTotalSlides(diferenciais.length);
          // Ajustar para o primeiro slide
          setCurrentSlide(0);
        }
      }, [diferenciais]);

      if (!diferenciais || diferenciais.length === 0) {
        return null; 
      }
      
  return (
    <>
      {diferenciais && diferenciais.length > 0 && (
        <section className='diferenciaisVeiculo'>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col xs={12} sm={12} md={12} lg={12} >
                        <h3>diferenciais <strong>do veículo</strong></h3>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} >
                        <div className='slickFoto'>
                          <Slider {...settings1} ref={(slider) => setNav1(slider1Ref.current = slider)}>
                            {diferenciais && diferenciais.map((diferencial, index) => (
                              <div key={index} className='foto'> {/* Adicione a chave única aqui */}
                                <div className='diferenciaisImg' style={{ background: `url(${api.defaults.baseURL}${diferencial.imagem})  no-repeat center / cover` }}></div>
                              </div>
                            ))}
                        </Slider>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} >
                        <div className='slickDesc'>
                            <span>{currentSlide + 1}/{totalSlides}</span>
                            <Slider {...settings2}>
                              {diferenciais && diferenciais.map((diferencial, index) => (
                                <div key={index}> {/* Adicione a chave única aqui */}
                                  <h3>{diferencial.chamada}</h3>
                                  <p>{diferencial.descricao}</p>
                                </div>
                              ))}
                            </Slider>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
      )}
    </>
  );
};

export default Diferenciais;