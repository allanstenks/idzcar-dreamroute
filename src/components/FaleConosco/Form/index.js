import React , { useState } from 'react';
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import api from '../../../services/apiIdz';

// Styles
import './Form.scss';
import 'react-tooltip/dist/react-tooltip.css'

// Componentes
import InputMask from 'react-input-mask';
import SucessoModal from "../SucessoModal";


function FormFaleConosco() {

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        categoria: 4
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Limpar erro quando o usuário começa a digitar
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    // Função para enviar evento de conversão para o Google Ads
    const gtagSendEvent = (url) => {
        const callback = () => {
        if (typeof url === 'string') {
            window.location.href = url; // Redirecionar para o URL após o evento ser enviado
        }
        };

        if (window.gtag) {
        window.gtag('event', 'conversion_event_submit_lead_form', {
            'event_callback': callback,
            'event_timeout': 2000, // Tempo limite em milissegundos para o callback ser chamado
            // Outros parâmetros de evento, se houver
        });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        // Validar campos
        if (formData.nome.trim() === '') {
            newErrors.nome = 'Campo obrigatório';
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }
        if (formData.telefone.trim() === '') {
            newErrors.telefone = 'Campo obrigatório';
        }
        if (formData.assunto.trim() === '') {
            newErrors.assunto = 'Campo obrigatório';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            // Se não houver erros, envie o formulário
            
            
            try {
                api.post(`/api/leads`, formData ).then(response => {
                    if (response) {
                        setShowSuccessModal(true);
                        gtagSendEvent('/faleconosco');
                        
                    } else {
                      alert('Error sending proposal. Please try again.');
                    }
                })
        
              } catch (error) {
                console.error('Error sending proposal:', error);
                console.log('Error sending proposal. Please try again.');
              }
        



            // Limpar campos
            setFormData({
                nome: '',
                email: '',
                telefone: '',
                assunto: ''
            });
            setErrors({}); 
        }
    };

    return (
        <section className='formFaleConosco' id='formFaleConosco'>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <div className='form'>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={5}>
                                    <div className='formFaleConoscoImg'></div>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={7}>
                                    <div className='formFaleConoscoForm'>
                                    <Form onSubmit={handleSubmit}>
                                            <Row>
                                                <Col xs={12} sm={12} md={12} lg={12}>
                                                    <h3>caso prefira</h3>
                                                    <h2>fale com um de <strong>nossos consultores</strong></h2>
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={12}>
                                                    <Form.Label className={`Label form-label ${errors.nome && 'error'}`}>
                                                        <input
                                                            type="text"
                                                            className='Inputs form-control'
                                                            name="nome"
                                                            value={formData.nome}
                                                            onChange={handleChange}
                                                            placeholder='Nome'
                                                        />
                                                        {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
                                                    </Form.Label>
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={12}>
                                                    <Form.Label className={`Label form-label ${errors.email && 'error'}`}>
                                                        <input
                                                            type="text"
                                                            className='Inputs form-control'
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            placeholder='Email'
                                                        />
                                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                                    </Form.Label>
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={12}>
                                                    <Form.Label className={`Label form-label ${errors.telefone && 'error'}`}>
                                                        <InputMask
                                                            mask="(99) 99999-9999"
                                                            type="text"
                                                            className='Inputs form-control'
                                                            name="telefone"
                                                            value={formData.telefone}
                                                            onChange={handleChange}
                                                            placeholder='Telefone'
                                                        />
                                                        {errors.telefone && <div className="invalid-feedback">{errors.telefone}</div>}
                                                    </Form.Label>
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={12}>
                                                    <Form.Label className={`Label form-label ${errors.assunto && 'error'}`}>
                                                        <input
                                                            type="text"
                                                            className='Inputs form-control'
                                                            name="assunto"
                                                            value={formData.assunto}
                                                            onChange={handleChange}
                                                            placeholder='Assunto'
                                                        />
                                                        {errors.assunto && <div className="invalid-feedback">{errors.assunto}</div>}
                                                    </Form.Label>
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={12}>
                                                    <div className='validacao'></div>
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={12}>
                                                    <Form.Group className="text-center">
                                                        <Button type="submit" variant="secondary" className="Btns ButtonLight">
                                                            Enviar
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
            <SucessoModal show={showSuccessModal} handleClose={() => setShowSuccessModal(false)} />
        </section>
        
    );
}

export default FormFaleConosco;
