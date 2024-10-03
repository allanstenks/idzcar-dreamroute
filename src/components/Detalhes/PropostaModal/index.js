import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { Dropdown } from 'primereact/dropdown';
import InputMask from 'react-input-mask';
import api from '../../../services/apiIdz';

// Styles
import './PropostaModal.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

//Imagens
import iconModal from './img/iconModal.png'

//Componentes
import SucessoModal from "../SucessoModal";
import { useNavigationIdz } from '../../../context/useNavigation';


const PropostaModal = ({ showModal, handleClose, id, idzEvent }) => {
  const [validName, setValidName] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [hasCar, setHasCar] = useState(false);
  const [mileage, setMileage] = useState('');
  const [detail, setDetail] = useState('');
  const [proposal, setProposal] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { navigation } = useNavigationIdz()

  const [objLead, setobjLead] = useState({});

  const handleInputValue = (value, field) => {
    setobjLead(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const validateName = () => {
    const isValid = objLead['nome']?.length >= 2;
    return isValid;
  };

  const validatePhone = () => {
    const phoneRegex = /^\([0-9]{2}\)\s[0-9]{4,5}-[0-9]{4}$/;
    return (phoneRegex.test(objLead['telefone']));
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (emailRegex.test(objLead['email']));
  };

  // Função para enviar evento de conversão para o Google Ads
  const gtagSendEvent = (url) => {
      const callback = () => {
      if (typeof url === 'string') {
          window.location.href = url; // Redirecionar para o URL após o evento ser enviado
      }
      };

      if (window.gtag) {
      window.gtag('event', 'conversion_event_submit_lead_form_1', {
          'event_callback': callback,
          'event_timeout': 2000, // Tempo limite em milissegundos para o callback ser chamado
          // Outros parâmetros de evento, se houver
      });
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isNameValid = validateName();
    let isEmailValid = validateEmail();
    let isPhoneValid = validatePhone();

    if (isNameValid && isEmailValid && isPhoneValid) {

      setValidName(true)
      setValidEmail(true)
      setValidPhone(true)

      const data = {
        ...objLead,
        tipo: 1,
        veiculo_id: id,
        veiculo: {
          troca: hasCar ? 1 : 0,
          marca_id: selectedBrand,
          modelo_id: selectedModel,
          km: mileage,
          detalhe: detail,
        },
        proposta: proposal,
        status: 0

      };

      try {
        const response = await api.post(`/api/leads`, data );

        if (response) {
          gtagSendEvent('/detalhes');
          setShowSuccessModal(true);
          handleClose();

          let aux = { ...navigation }


          Object.keys(aux).forEach(key => {
            let value = aux[key]
            if (typeof value != 'string') {
              value = aux[key];
            }
            aux[key] = value
          })


          const dataAux = {
            ...aux,
            lead: response.data
          };

          await api.post(`/api/navigation-tracker`, dataAux )
        } else {
          alert('Error sending proposal. Please try again.');
        }
      } catch (error) {
        console.error('Error sending proposal:', error);
        console.log('Error sending proposal. Please try again.');
      }

      // Clear fields after submission
      setobjLead({})
      setSelectedBrand(null);
      setSelectedModel(null);
      setMileage('');
      setDetail('');
      setProposal('');

    } else {
      !isNameValid ? setValidName(false) : setValidName(true);
      !isEmailValid ? setValidEmail(false) : setValidEmail(true);
      !isPhoneValid ? setValidPhone(false) : setValidPhone(true);
    }
  };

  const [availableModels, setAvailableModels] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);

  const getBrands = async () => {
    try {
      const response = await api.get(`/api/marcas`, {});
      if (response && response.data) {
        const data = response.data;
        const brands = data.map(brand => ({ value: brand.id, label: brand.titulo }));
        setAvailableBrands(brands);
      } else {
        alert('Error sending proposal. Please try again.');
      }
    } catch (error) {
      console.error('Erro ao obter as marcas:', error);
    }
  };

  const getModels = async (brandId) => {
    try {
      const response = await api.get(`/api/modelos/marca/${brandId}`, {});
  
      if (response && response.data) {
        const data = response.data;
        const models = data.map(model => ({ value: model.id, label: model.titulo }));
        setAvailableModels(models);
      } else {
        alert('Error sending proposal. Please try again.');
      }
    } catch (error) {
      console.error('Erro ao obter as modelos:', error);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      getModels(selectedBrand);
    } else {
      setAvailableModels([]);
    }
  }, [selectedBrand]);


  const handleBrandChange = (e) => {
    const selectedValue = e.value;
    setSelectedBrand(selectedValue);
  };

  const handleModelChange = (e) => {
    const selectedValue = e.value;
    setSelectedModel(selectedValue);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <i><img className="video" src={iconModal} alt="icon" /></i>
          <Modal.Title>Faça a sua proposta</Modal.Title>
          <p>Quer encontrar o veículo ideal? Fale com a gente!</p>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu nome"
                value={objLead['nome']}
                onChange={(e) => handleInputValue(e.target.value, 'nome')}
                onBlur={() => setValidName(validateName())}
                className={validName ? "" : "danger"}
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Telefone</Form.Label>
              <InputMask
                mask="(99) 99999-9999"
                maskChar="_"
                value={objLead['telefone']}
                onBlur={() => setValidPhone(validatePhone())}
                onChange={(e) => handleInputValue(e.target.value, 'telefone')}
              >
                {() => (
                  <Form.Control
                    type="tel"
                    placeholder="Digite seu telefone"
                    className={validPhone ? "" : "danger"}
                  />
                )}
              </InputMask>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu email"
                value={objLead['email']}
                onChange={(e) => handleInputValue(e.target.value, 'email')}
                onBlur={() => setValidEmail(validateEmail())}
                className={validEmail ? "" : "danger"}
              />
            </Form.Group>

            <Form.Group controlId="formHasCar">
              <Form.Label>Possui carro para trocar?</Form.Label>

              <Form.Check
                type="radio"
                label="Yes"
                name="hasCar"
                checked={hasCar}
                onChange={() => setHasCar(true)}
              />
              <Form.Check
                type="radio"
                label="No"
                name="hasCar"
                checked={!hasCar}
                onChange={() => setHasCar(false)}
              />
            </Form.Group>

            {hasCar && (
              <>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={6} className='color'>
                    <Form.Label className='Label'>
                      <span>Marca</span>
                      <Dropdown
                        value={selectedBrand}
                        options={availableBrands}
                        onChange={handleBrandChange}
                        placeholder="Selecionar"
                        className='Dropdown'
                      />
                    </Form.Label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6} className='color'>
                    <Form.Label className='Label'>
                      <span>Modelo</span>
                      <Dropdown
                        value={selectedModel}
                        options={availableModels}
                        onChange={handleModelChange}
                        placeholder="Selecionar"
                        className='Dropdown'
                      />
                    </Form.Label>
                  </Col>
                </Row>

                <Form.Group controlId="formMileage">
                  <Form.Label>Quilometragem</Form.Label>
                  <Form.Control type="text" placeholder="Digite a quilometragem" value={mileage} onChange={(e) => setMileage(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formDetail">
                  <Form.Label>Possui algum detalhe?</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Descreva detalhes, se houver" value={detail} onChange={(e) => setDetail(e.target.value)} />
                </Form.Group>
              </>
            )}

            <Form.Group controlId="formProposal">
              <Form.Label>Qual sua proposta?</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Digite sua proposta" value={proposal} onChange={(e) => setProposal(e.target.value)} />
            </Form.Group>

            <Button variant="secondary" type="submit">Enviar Proposta</Button> 
          </Form>
        </Modal.Body>
      </Modal>

      <SucessoModal show={showSuccessModal} handleClose={() => setShowSuccessModal(false)} />
    </>
  );
};

export default PropostaModal;