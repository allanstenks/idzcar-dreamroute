import { createContext, useContext, useEffect, useState } from 'react';
import jwt from 'jwt-decode'
import api from '../services/apiIdz';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import ReactGA from "react-ga4";

export const NavigationContext = createContext();


export const NavigationProvider = ({ children }) => {

    const navigate = useNavigate()
    const location = useLocation()


    useEffect(() => {
        ReactGA.initialize('G-NMMQ379Z5K');
        ReactGA.send({
            hitType: 'pageview',
            page: location.pathname
          });
    }, [location]);

    const [loading, setLoading] = useState(true)

    const [navigation, setNavigation] = useState({
        nav_id: null,
        origem: window.location.href.includes("localhost") || window.location.href.includes("127.0.0.1") ? "Direto" : window.location.href,
        paginas_acessadas: [],
        banners_clicados: [],
        servicos_visitados: [],
        veiculos_acessados: [],
        whatsapp:[]
    })

    const postSessionNavigation = async () => {

        const { origem, paginas_acessadas, banners_clicados, servicos_visitados, veiculos_acessados } = navigation

        const objNav = {
            origem, paginas_acessadas, banners_clicados, servicos_visitados, veiculos_acessados
        }

        return await api.post('/api/navigation-tracker', objNav ).then(r => {
            if (r.data) {
                return r.data
            }
        });
    }

    const putSessionNavigation = async (id, data) => {
        await api.put(`/api/navigation-tracker/${id}`, data ).then(r => {
            if (r.status == 200) {
                setLoading(false)
            }
        });
    }

    const checkSession = async () => {
        console.log("navigationSession", window.localStorage.getItem("navigationSession"))
        if (window.localStorage.getItem("navigationSession")) {
            // const json = JSON.parse(window.localStorage.getItem("navigationSession"))

            // let { origem, paginas_acessadas, banners_clicados, veiculos_acessados, servicos_visitados, nav_id } = json
            // let id = nav_id
            // let objNav = {
            //     origem,
            //     paginas_acessadas:[],
            //     banners_clicados:[],
            //     veiculos_acessados:[],
            //     servicos_visitados:[]
            // }

            // await putSessionNavigation(id, objNav)
            // setNavigation(json)

            window.localStorage.removeItem("navigationSession")

            await postSessionNavigation().then((nav_id) => {
                let objNav = {
                    ...navigation,
                    nav_id,
                }

                window.localStorage.setItem("navigationSession", JSON.stringify(objNav))

                setNavigation(objNav)
                setLoading(false)
            })
        } else {

            await postSessionNavigation().then((nav_id) => {
                let objNav = {
                    ...navigation,
                    nav_id,
                }

                window.localStorage.setItem("navigationSession", JSON.stringify(objNav))

                setNavigation(objNav)
                setLoading(false)
            })
        }
    }

    const updateSession = async () => {
        console.log("navigationSession", window.localStorage.getItem("navigationSession"))
        if (window.localStorage.getItem("navigationSession")) {
            const json = JSON.parse(window.localStorage.getItem("navigationSession"))

            let { origem, paginas_acessadas, banners_clicados, veiculos_acessados, servicos_visitados, nav_id } = json
            let id = nav_id
            let objNav = {
                origem,
                paginas_acessadas,
                banners_clicados,
                veiculos_acessados,
                servicos_visitados
            }

            await putSessionNavigation(id, objNav) 
        } else {

            await postSessionNavigation().then((nav_id) => {
                let objNav = {
                    ...navigation,
                    nav_id,
                }

                window.localStorage.setItem("navigationSession", JSON.stringify(objNav)) 
            })
        }
    }

    useEffect(() => {
        checkSession()
    }, [])

    const idzOrigin = (origin) => {

        let params = new URLSearchParams(window.location.search)

        let objCampaing = {
            origin: params.get('utm_medium'),
            content: params.get('utm_content'),
            campaig: params.get('utm_campaig')
        }


        if (typeof objCampaing.origin != 'undefined' && objCampaing.origin != null) {
            const data = {...navigation}
            data.origem = objCampaing.origin
            if (!loading) {
                window.localStorage.setItem("navigationSession", JSON.stringify(data))
            }
            setNavigation(data)
            updateSession()
        } else {
            const data = {...navigation}
            data.origem = origin

            if (!loading) {
                window.localStorage.setItem("navigationSession", JSON.stringify(data))
            }
            setNavigation(data)
            updateSession()
        }

    }

    const idzEvent = (field, newValue) => {
        const data = navigation
        data[field].push(newValue)
        if (!loading) {
            window.localStorage.setItem("navigationSession", JSON.stringify(data))
        }
        setNavigation(data)
        updateSession()
    }


    return <NavigationContext.Provider value={{
        idzEvent, idzOrigin, navigation, loading
    }}>{children}</NavigationContext.Provider>
}

export const useNavigationIdz = () => {
    return useContext(NavigationContext)
}



