import { createContext, useContext, useEffect, useState } from 'react';
import jwt from 'jwt-decode'
import api from '../services/api';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ReactGA from "react-ga4";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const [cookie, setCookie, removeCookie] = useCookies(['Token'])

    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()
    const [token, setToken] = useState()
    const [avatar, setAvatar] = useState()

    const logout = () => {
        try {
            removeCookie("Token")
            window.location.href = window.location.origin + "/login"
        } catch (err) {
            throw err
        }
    }

    function isAdmin() {
        return user?.role === "admin" || user?.role === "editor chefe"
    }
    function isNotRedator() {
        return user?.role !== "redator"
    }
    function isRedator() {
        return user?.role === "redator"
    }

    function getInitials(completeName) {
        const palavras = completeName.trim().split(' ');
        let initials = '';
        if (palavras.length > 1) {


            for (let i = 0; i < Math.min(2, palavras.length); i++) {
                const palavra = palavras[i];
                initials += palavra.charAt(0);
            }

            return initials.toUpperCase();
        } else {
            initials = `${completeName[0]}${completeName[1]}`
            return initials.toUpperCase();
        }


    }

    const handleAvatar = () => {
        setAvatar(getInitials(user.nome))
    }

    function checkLogin() {
        if (cookie.Token != null) {
            try {
                const localToken = cookie.Token
                if (jwt(localToken)) {

                    setToken(localToken)
                    setIsLogged(true)
                    setLoading(false)
                    setUser(jwt(localToken))
                    //setAvatar(getInitials(user.nome))


                    if (location.pathname.toLowerCase().includes("/login")) {
                        navigate("/dashboard")
                    }

                    return true
                } else {

                    setIsLogged(false)
                    setLoading(false)
                    navigate("/login")

                    return false

                }
            } catch (err) {
                throw err
            }
        }
    }


    useEffect(() => {
        if (user) {
            handleAvatar()
        }
    }, [user])

    useEffect(() => {
        if (loading) {
            checkLogin()
        }
    }, [loading])



    const handleUser = (userData) => {
        setUser(userData)
    }

    const updateUser = (value, field) => {
        setUser(prevUser => ({
            ...prevUser,
            [field]: value
        }))

    }


    const handleLogin = async (email, password) => {
        try {
            await api.post("/authentication/login", {
                "email": email,
                "password": password
            }, {
                withCredentials: true
            }).then((res) => {
                if (res.status == 200) {
                    let token = res.data.message

                    // localStorage.setItem("bluwi__auth", token)
                    // setCookie("Token", token, {})
                    setToken(token)

                    handleUser(jwt(token))
                    navigate("/dashboard")
                }
            })
        } catch (err) {
            throw err
        }
    }

    return <AuthContext.Provider value={{ isLogged, handleLogin, user, handleUser, checkLogin, logout, loading, token, isAdmin, avatar, getInitials, isNotRedator, isRedator, updateUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}



