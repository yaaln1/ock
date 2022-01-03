import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/Auth.context'
import 'materialize-css'



export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        login: '', password: ''
    })
    

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const pressHandler = async(event) => {
        if (event.key === 'Enter') {
            try {
                loginHandler()
            } catch (e) {}
        }
    } 

    const loginHandler = async() => {
        try {
            const data = await request('api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId, data.firstname, data.fio, data.role, data.department)
            console.log(data)


        } catch (e) {
        }
    }

    return (
        <div className="row padding_top">
            <div className="col s6 offset-s3">
                <div className="card blue darken-1 authcard">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                        <div className="input-field">
                            <input 
                            id="login" 
                            type="text" 
                            placeholder="Введите логин"
                            name="login"
                            value={form.login}
                            onChange={changeHandler}
                            />
                            <label htmlFor="login">Login</label>
                        </div>
                        <div className="input-field">
                            <input 
                            id="password" 
                            type="password" 
                            placeholder="Введите пароль"
                            name="password"
                            value={form.password}
                            onChange={changeHandler}
                            onKeyPress={pressHandler}
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            onClick={loginHandler}
                            disabled={loading}
                            >Войти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}