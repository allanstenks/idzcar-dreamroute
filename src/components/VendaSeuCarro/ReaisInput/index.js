import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import "./ReaisInput.scss"

function ReaisInput({ value, handleChange,placeholder }) {
    const [loading, setLoading] = useState(true)
    const [valueIn, setValueIn] = useState('');
    

    // useEffect(() => {
    //     if (value && loading) {
    //         setValueIn(value)
    //         setLoading(false)
    //     }
    // }, [value])

    useEffect(() => {
        if (valueIn != '') {
            handleChange(valueIn)
        }
    }, [valueIn])

    const handleChangeIn = (event) => {
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/[^\d]/g, '');

        // Formata para o formato de reais
        inputValue = formatToReais(inputValue);

        setValueIn(inputValue);
    };

    const formatToReais = (value) => {
        // Adiciona o prefixo de reais
        value = (value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        value = value.replace(/\u00a0/g, '');
        return value;
    };

    useEffect(() => {
        if (value && loading) {
            // Remove o prefixo de reais e formata o valor para centavos
            const valueInCents = parseFloat(value.replaceAll(" ","").replaceAll('R$', '').replaceAll('.', '').replaceAll(",",""));
            setValueIn(formatToReais(valueInCents));
            setLoading(false);
        }
    }, [value]);

    return (<>
        {/* <input
            type="text"
            value={value}
            onChange={handleChange}
        /> */}
        <Form.Control value={valueIn} onChange={(e) => { handleChangeIn(e) }} className='Inputs PriceMarginBottom' type="text" placeholder={placeholder?placeholder:"Por quanto quer vender?"} ></Form.Control >
    </>

    );
}

export default ReaisInput;