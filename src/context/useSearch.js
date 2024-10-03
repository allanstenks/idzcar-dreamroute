import { createContext, useContext, useEffect, useState } from 'react';
import jwt from 'jwt-decode'
import api from '../services/apiIdz';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';


export const SearchContext = createContext();


export const SearchProvider = ({ children }) => {


    const navigate = useNavigate()

    const [link, setLink] = useState('')
    const [loadingData, setLoadingData] = useState(true)
    const [marcas, setMarcas] = useState([])
    const [marcasData, setMarcasData] = useState([])
    const [condicoes, setCondicoes] = useState([])
    const [condicoesData, setCondicoesData] = useState([])
    const [modelos, setModelos] = useState([])
    const [modelosData, setModelosData] = useState([])
    const [searchData, setSearchData] = useState([])
    const [paramsData, setParamsData] = useState()
    const [filterData, setFilterData] = useState({})
    const [intResumoBusca, setIntResumoBusca] = useState(false);
    const [firstFilter, setFirstFilter] = useState(true)


    const handleParamsData = (value) => {
        setParamsData(value)
    }

    const handleFilterData = (value, field) => {
        setFilterData({
            ...filterData,
            [field]: value
        })
    }

    const getLabelId = (labelList, label) => {
        try {
            let data = labelList.filter(d => d.label.toLowerCase() == label.toLowerCase())
            return data[0].value
        } catch (err) {
            console.error(err)
        }
    }

    const getIdToLabel = (labelList, id) => {
        try {
            let data = labelList.filter(d => d.value == id)
            return data[0].label.toLowerCase()
        } catch (err) {
            console.error(err)
        }
    }

    const prepareToDropdown = (data) => {
        let aux = [];
        data.forEach(item => {
            aux.push({ label: item.titulo, value: item.id })
        });
        return aux;
    }
    const prepareToDropdownPrice = (data) => {
        let aux = [];

        data.forEach(item => {
            aux.push({ label: item.label, value: `${item.vlini ? item.vlini : ''}|${item.vlfim ? item.vlfim : ''}` })
        });
        return aux;
    }

    const prepareToDropdownCondicao = (data) => {
        let aux = [];
        aux.push({ label: 'Todos', value: 'todos' });
        data.forEach(item => {
            aux.push({ label: item.condicao, value: item.codigo })
        });
        return aux;
    }

    const getActiveMarcas = async () => {
        await api.get(`/api/marcas?origem=site&existentes=1`).then(res => {
            if (res.data) {
                let data = prepareToDropdown(res.data)
                setMarcasData(res.data)
                setMarcas(data)
            }
        })
    }

    const [placeholderPreco, setPlaceholderPreco] = useState([])
    const getPrecos = async () => {

        await api.get(`/api/precos?existentes=1`).then(async (res) => {
            if (res.data) {
                let data = await prepareToDropdownPrice(res.data)

                let lastPlaceholder = []
                lastPlaceholder.push({ label: 'Todas', value: '0' })
                data.forEach(price => {
                    lastPlaceholder.push(price)
                })
                setPlaceholderPreco(lastPlaceholder)
            }
        })
    }
    useEffect(() => {
        getPrecos()
    }, [])

    const getActiveModelos = async (id) => {
        await api.get(`/api/modelos/marca/${id}?origem=site&agrupado=1&existentes=1`).then(res => {
            if (res.data) {
                let data = prepareToDropdown(res.data)
                setModelosData(res.data)
                setModelos(data)
            }
        })
    }

    const getCondicoes = async () => {
        await api.get(`/api/condicao?existentes=1`).then(res => {
            if (res.data) {
                let data = prepareToDropdownCondicao(res.data)
                setCondicoesData(res.data)
                setCondicoes(data)
            }
        })
    }

    const adicionarQueryStrings = (baseUrl, parametros) => {
        const url = new URL(baseUrl);

        Object.keys(parametros).forEach(chave => {
            const valor = parametros[chave];
            if (valor !== undefined && valor !== null) {
                url.searchParams.append(chave, valor);
            }
        });


        return url.toString();
    }



    const getMountLink = async () => {

        let labelListagem = '/todos'
        let labelCondicao = '/semi-novo'
        let labelMarca = ''
        let labelModelo = ''
        let objFaixa = {}

        if (filterData['listagem']) {
            //labelMarca = "&marca=" + getIdToLabel(marcas, filterData['marca'])
            labelListagem = "/" + filterData['listagem']
        }
        if (filterData['condicao']) {
            //labelModelo = "&modelo=" + getIdToLabel(modelos, filterData['modelo']) 
            labelCondicao = "/" + filterData['condicao']
        }
        if (filterData['marca']) {
            //labelMarca = "&marca=" + getIdToLabel(marcas, filterData['marca'])
            labelMarca = "/" + getIdToLabel(marcas, filterData['marca'])
        }
        if (filterData['modelo']) {
            //labelModelo = "&modelo=" + getIdToLabel(modelos, filterData['modelo'])
            labelModelo = "/" + getIdToLabel(modelos, filterData['modelo'])
        }
        if (filterData['faixa']) {
            //labelModelo = "&modelo=" + getIdToLabel(modelos, filterData['modelo'])

            const faixa = filterData['faixa'].split("|")

            objFaixa['preco-de'] = faixa[0]

            if (faixa.length > 0) {
                objFaixa['preco-ate'] = faixa[1]
            }

        }

        let link = window.location.origin + `/busca${labelListagem}${labelCondicao}${labelMarca}${labelModelo}`
        let href = adicionarQueryStrings(link, objFaixa)
        setLink(href)
    }

    const [firstSearch, setFirstSearch] = useState(true)
    const getVeiculos = async (listagem, condicao, marca, modelo, faixaInit) => {


        let labelListagem = ''
        let labelCondicao = ''
        let labelMarca = ''
        let labelModelo = ''
        let objFaixa = {}

        if (filterData['listagem']) {
            labelListagem = filterData['listagem'] == 'blindados' ? "&blindado=1" : filterData['listagem'] == 'nao-blindados' ? "&blindado=0" : ''
        }
        if (filterData['condicao']) {
            labelCondicao = "&condicao=" + filterData['condicao']
        }
        if (filterData['marca']) {
            labelMarca = "&marca=" + getIdToLabel(marcas, filterData['marca'])
        }
        if (filterData['modelo']) {
            labelModelo = "&modelo=" + getIdToLabel(modelos, filterData['modelo'])
        }
        if (filterData['faixa']) {
            //labelModelo = "&modelo=" + getIdToLabel(modelos, filterData['modelo'])

            const faixa = filterData['faixa'].split("|")


            objFaixa['preco-de'] = faixa[0]

            if (faixa.length > 0) {
                objFaixa['preco-ate'] = faixa[1]
            }

        }

        if (faixaInit && firstSearch) {
            const faixa = faixaInit.split("|")


            objFaixa['preco-de'] = faixa[0]

            if (faixa.length > 0) {
                objFaixa['preco-ate'] = faixa[1]
            }
        }

        if (listagem && firstSearch) {
            labelListagem = listagem == 'blindados' ? "&blindado=1" : listagem == 'nao-blindados' ? "&blindado=0" : ''
        }
        if (condicao && firstSearch) {
            labelCondicao = "&condicao=" + condicao
        }

        if (!firstSearch) {

           
            await api.get(`/api/veiculos?origem=site${labelMarca}${labelModelo}${labelListagem}${labelCondicao}${objFaixa["preco-de"] ? `&preco-de=${objFaixa["preco-de"]}` : ""}${objFaixa["preco-ate"] ? `&preco-ate=${objFaixa["preco-ate"]}` : ""}`).then((res) => {
                if (res.data) {

                    if (res.data.length > 0) {
                        setSearchData(res.data)
                        setLoadingData(false)
                    } else {
                        setIntResumoBusca(true)
                        setLoadingData(false)
                    }

                    setFirstFilter(false)
                }
            })
        } else {
            if (marca && modelo) {


                await api.get(`/api/marcas?origem=site&existentes=1`).then(async (res) => {
                    if (res.data) {

                        let dataMarca = prepareToDropdown(res.data)
                        setMarcasData(res.data)
                        setMarcas(dataMarca)
                        let idMarca = getLabelId(dataMarca, marca)
                        labelMarca = "&marca=" + marca

                        await api.get(`/api/modelos/marca/${idMarca}?origem=site&agrupado=1`).then(async (res) => {
                            if (res.data) {

                                let dataModelo = prepareToDropdown(res.data)
                                setModelosData(res.data)
                                setModelos(dataModelo)
                                let idModelo = getLabelId(dataModelo, modelo)
                                labelModelo = "&modelo=" + modelo

                               
                                await api.get(`/api/veiculos?origem=site${labelMarca}${labelModelo}${labelListagem}${labelCondicao}${objFaixa["preco-de"] ? `&preco-de=${objFaixa["preco-de"]}` : ""}${objFaixa["preco-ate"] ? `&preco-ate=${objFaixa["preco-ate"]}` : ""}`).then((res) => {


                                    let params = new URLSearchParams(window.location.search)
                                    let precoDe = ''
                                    let precoAte = ''

                                    if (params.get("preco-de")) {
                                        precoDe = params.get("preco-de")
                                    }
                                    if (params.get("preco-ate")) {
                                        precoAte = "|" + params.get("preco-ate")
                                    }

                                    let faixa = precoDe + precoAte



                                    setFilterData({
                                        listagem: listagem,
                                        condicao: condicao,
                                        marca: idMarca,
                                        modelo: idModelo,
                                        faixa: faixa
                                    })

                                    if (res.data) {

                                        if (res.data.length > 0) {
                                            setSearchData(res.data)
                                            setLoadingData(false)
                                        } else {
                                            setIntResumoBusca(true)
                                            setLoadingData(false)
                                        }

                                        setFirstSearch(false)
                                    }
                                })
                            }
                        })
                    }
                })
            } else {
                if (marca) {
                    await api.get(`/api/marcas?origem=site&existentes=1`).then(async (res) => {
                        if (res.data) {

                            let dataMarca = prepareToDropdown(res.data)

                            setMarcasData(res.data)
                            setMarcas(dataMarca)

                            let idMarca = getLabelId(dataMarca, marca)
                            labelMarca = "&marca=" + marca

                          
                            await api.get(`/api/veiculos?origem=site${labelMarca}${labelModelo}${labelListagem}${labelCondicao}${objFaixa["preco-de"] ? `&preco-de=${objFaixa["preco-de"]}` : ""}${objFaixa["preco-ate"] ? `&preco-ate=${objFaixa["preco-ate"]}` : ""}`).then((res) => {

                                let params = new URLSearchParams(window.location.search)
                                let precoDe = ''
                                let precoAte = ''

                                if (params.get("preco-de")) {
                                    precoDe = params.get("preco-de")
                                }
                                if (params.get("preco-ate")) {
                                    precoAte = "|" + params.get("preco-ate")
                                }

                                let faixa = precoDe + precoAte

                                setFilterData({
                                    listagem: listagem,
                                    condicao: condicao,
                                    marca: idMarca,
                                    faixa: faixa
                                })

                                if (res.data) {

                                    if (res.data.length > 0) {
                                        setSearchData(res.data)
                                        setLoadingData(false)
                                    } else {
                                        setIntResumoBusca(true)
                                        setLoadingData(false)
                                    }
                                    setFirstSearch(false)
                                }
                            })
                        }
                    })
                } else {

                    await api.get(`/api/veiculos?origem=site${labelMarca}${labelModelo}${labelListagem}${labelCondicao}${objFaixa["preco-de"] ? `&preco-de=${objFaixa["preco-de"]}` : ""}${objFaixa["preco-ate"] ? `&preco-ate=${objFaixa["preco-ate"]}` : ""}`).then((res) => {
                        if (res.data) {
                            let params = new URLSearchParams(window.location.search)
                            let precoDe = ''
                            let precoAte = ''

                            if (params.get("preco-de")) {
                                precoDe = params.get("preco-de")
                            }
                            if (params.get("preco-ate")) {
                                precoAte = "|" + params.get("preco-ate")
                            }

                            let faixa = precoDe + precoAte

                            setFilterData({
                                listagem: listagem,
                                condicao: condicao,
                                faixa: faixa
                            })

                            getActiveMarcas()

                            if (res.data.length > 0) {
                                setSearchData(res.data)
                                setLoadingData(false)
                            } else {
                                setIntResumoBusca(true)
                                setLoadingData(false)
                            }

                            setFirstSearch(false)
                        }
                    })
                }
            }
        }
    }


    useEffect(() => {
        if (!firstSearch) {
            getActiveMarcas()
        }
    }, [])

    useEffect(() => {
        if (filterData["marca"] && !firstSearch) {

            if (!firstFilter) {

                let aux = { ...filterData }
                delete aux["modelo"]
                setFilterData(aux)

            }

            getActiveModelos(filterData["marca"])
        }
    }, [filterData["marca"]])


    useEffect(() => {
        getCondicoes()
    }, [])


    useEffect(() => {
        getMountLink()
    }, [filterData])





    return <SearchContext.Provider value={{ handleFilterData, paramsData, setFilterData, filterData, link, loadingData, setLoadingData, searchData, modelos, marcas, handleParamsData, getVeiculos, intResumoBusca, setIntResumoBusca, getCondicoes, condicoes, placeholderPreco }}>{children}</SearchContext.Provider>
}

export const useSearch = () => {
    return useContext(SearchContext)
}



