import React, { useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { ock_department } from '../jsondata'
import 'materialize-css'

export const RegistrationPage = () => {
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        login: '', lastname: '', firstname: '', fathername: '', department: '', appointment: '', password: ''
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

    const registerHandler = async() => {
        try {
           // console.log(form)
            const data = await request('api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
        }
    }

    return (
        <div className="row padding_top">
            <div className="col s6 offset-s3">
                <div className="card blue darken-1 authcard">
                    <div className="card-content white-text">
                        <span className="card-title">Регистрация</span>
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
                            id="lastname" 
                            type="text" 
                            placeholder="Введите фамилию"
                            name="lastname"
                            value={form.lastname}
                            onChange={changeHandler}
                            />
                            <label htmlFor="lastname">Фамилия</label>
                        </div>
                        <div className="input-field">
                            <input 
                            id="firstname" 
                            type="text" 
                            placeholder="Введите имя"
                            name="firstname"
                            value={form.firstname}
                            onChange={changeHandler}
                            />
                            <label htmlFor="firstname">Имя</label>
                        </div>
                        <div className="input-field">
                            <input 
                            id="fathername" 
                            type="text" 
                            placeholder="Введите отчество"
                            name="fathername"
                            value={form.fathername}
                            onChange={changeHandler}
                            />
                            <label htmlFor="fathername">Отчество</label>
                        </div>
                        {/* <div className="input-field">
                            <input 
                            id="department" 
                            type="text" 
                            placeholder="Введите отделение"
                            name="department"
                            value={form.department}
                            onChange={changeHandler}
                            />
                            <label htmlFor="department">Отделение</label>
                        </div> */}
                        <div className="input-field">
                            <select className="browser-default" name="department" value={form.department} onChange={changeHandler}>
                                        <option value="" disabled>Выберите отделение</option>
                                            {
                                                ock_department.map((element, i) => {
                                                    return <option key={i} value={element}>{element}</option>
                                                })
                                            }     
                                    </select>
                        </div>
                        
                        <div className="input-field">
                            <input 
                            id="appointment" 
                            type="text" 
                            placeholder="Введите должность"
                            name="appointment"
                            value={form.appointment}
                            onChange={changeHandler}
                            />
                            <label htmlFor="department">Должность</label>
                        </div>
                        <div className="input-field">
                            <input 
                            id="password" 
                            type="password" 
                            placeholder="Введите пароль"
                            name="password"
                            value={form.password}
                            onChange={changeHandler}
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                            >Зарегистрироваться
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}