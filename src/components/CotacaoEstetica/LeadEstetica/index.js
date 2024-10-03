import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import InputMask from 'react-input-mask';
import { Icon } from '@iconify/react';
import api from '../../../services/apiIdz';
import { useNavigate } from 'react-router-dom';

// Styles
import './LeadEstetica.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

//Componentes
import { useNavigationIdz } from '../../../context/useNavigation';


const LeadEstetica = ({ showModal, handleClose, id, idzEvent, toSend }) => {


  const { navigation } = useNavigationIdz()

  const [data, setData] = useState({}); 

  const fetchData = async () => {
      try {
          const response = await api.get('/api/dados-gerais/1');
          setData(response.data.orcamento.dois_fatores);
      } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
      }
  };

  useEffect(() => {
    fetchData();   
}, []); 

  // const postLeaveNavigation = async () => {
  //   await api.post('/api/navigation-tracker', navigation, {
  //     headers: {
  //       'Authorization': '63zne5T67yONhHqFEq7X',
  //       'Token': 'MSMxNjdkNTAzZTk4ZTcwMWUxZDBjODNkNmJlNjZlNzQ5NA==',
  //     },
  //   });
  // }

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     // Lógica para disparar o lead antes de fechar a aba

  //     postLeaveNavigation()

 
  //     // Você pode personalizar a mensagem que será exibida ao usuário ao tentar fechar a aba
  //     const confirmationMessage = 'Tem certeza que deseja sair?';

  //     // Define a mensagem que será exibida ao usuário ao tentar fechar a aba
  //     event.returnValue = confirmationMessage;
  //     return confirmationMessage;
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  const navigate = useNavigate();
  const [validName, setValidName] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validEmail, setValidEmail] = useState(true);



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
        tipo: 3,
      };

      try {
        await api.post(`/api/leads`, data ).then(response => {
          if (response) {
            postOrcamento(response.data);
            handleClose();


            // Tratamento do navigation
            let aux = { ...navigation }


            Object.keys(aux).forEach(key => {
              let value = aux[key]
              if (typeof value != 'string') {
                value = aux[key];
              }
              aux[key] = value
            })


            postLeadAndNavigation(response.data, aux);

          } else {
            alert('Error sending proposal. Please try again.');
          }
        })

      } catch (error) {
        console.error('Error sending proposal:', error);
        console.log('Error sending proposal. Please try again.');
      }

    } else {
      !isNameValid ? setValidName(false) : setValidName(true);
      !isEmailValid ? setValidEmail(false) : setValidEmail(true);
      !isPhoneValid ? setValidPhone(false) : setValidPhone(true);
    }
  };

    // Função para enviar evento de conversão para o Google Ads
    const gtagSendEvent = (url) => {
      const callback = () => {
      if (typeof url === 'string') {
          //window.location.href = url; // Redirecionar para o URL após o evento ser enviado
      }
      };

      if (window.gtag) {
      window.gtag('event', 'conversion_event_submit_lead_form_2', {
          'event_callback': callback,
          'event_timeout': 2000, // Tempo limite em milissegundos para o callback ser chamado
          // Outros parâmetros de evento, se houver
      });
      }
  };

  const postOrcamento = async (leadId) => {
    try {

      const requestData = {
        ...toSend,
        lead: leadId
      };

      const response = await api.post('/api/orcamento-estetica', requestData);
        const pedido = data ? response.data.pedido : response.data.orcamento.pedido;
        gtagSendEvent('/estetica');
        navigate(`/estetica/orcamento/${pedido}`);

    } catch (error) {
      console.error('Erro orcamento data:', error);
    }
  };

  const postLeadAndNavigation = async (leadId, auxData) => {
    try {
      const navigationData = {
        lead: leadId,
        origem: auxData.origem || 'Direto',
        paginas: auxData.paginas_acessadas || '',
        banners: auxData.banners_clicados || '',
        servicos: auxData.servicos_visitados || '',
        veiculos: auxData.veiculos_acessados || '',
      };

      const response = await api.put(`/api/navigation-tracker/${auxData.nav_id}`, navigationData);

    } catch (error) {
      console.error('Error sending navigation data:', error);
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <i><Icon className="icons" icon="fluent:person-12-regular"></Icon></i>
          <Modal.Title>últimas informações</Modal.Title>
          <p>Informe seu dados para receber seu <br />orçamento personalizado</p>
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
            <Form.Group className='text-center'>
              <Button variant="primary" type="submit">Ver Orçamento</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LeadEstetica;