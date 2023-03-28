import React, {useEffect} from 'react';
import style from './register.module.css'
import {Box, Button, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../redux/reducers/registerReducer";
const Register = () => {
    const dispatch = useDispatch()
    const username = useSelector(state => state.auth.username)
    const password = useSelector(state => state.auth.password)
    const isAuth = useSelector(state => state.auth.isAuth)
    const error = useSelector(state => state.auth.error)
    const handleUsername = (e) => dispatch({type: actions.NAME, payload: e.target.value})
    const handlePassword = (e) => dispatch({type: actions.PASSWORD, payload: e.target.value})

    useEffect(()=> {
        fetch('http://localhost:8000/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: localStorage.getItem('token')})
        })
            .then(res => res.json())
            .then(data => {
                if (data.new_token) {
                    dispatch({type: actions.ISAUTH, payload: true})
                }
            })
    }, [])

    const login = () => {
        fetch('http://localhost:8000/login', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'success') {
                    localStorage.setItem('token', data.token)
                    dispatch({type: actions.ERROR, payload: false})
                    dispatch({type: actions.ISAUTH, payload: true})
                } else {
                    dispatch({type: actions.ERROR, payload: true})
                }
            })
    }


    if (isAuth) return (
        <div>
            <h2>вход успешно выполнен</h2>
        </div>
    )


    return (
        <div>
            <Typography variant='h2'>Авторизация</Typography>
            <Box>
                <TextField value={username} onChange={handleUsername} placeholder='username'/>
            </Box>
            <Box>
                <TextField value={password} onChange={handlePassword} placeholder='password'/>
            </Box>
            <Box>
                <Button onClick={login} variant='contained'>Войти</Button>
            </Box>
            {error && <h2>неверный логин или пароль</h2>}
        </div>
    );
};

export default Register;