import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/Auth.context'
import {useHistory} from 'react-router-dom'
import {ock_contacts} from '../jsondata.js'
import M from 'materialize-css'


export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    })


    const [form, setForm] = useState({
        title: '',
        createmessage: '',
        department: '',
        cabinetnumber: '',
        creator: ''
    })


    const handleChange = (event) => {
        try {
            setForm({...form, [event.target.id]: event.target.value})
            console.log({...form})
        } catch (e) {
        }
    }

    const sendForm = async () => {
            try {
                    const data = await request('/api/bid/create', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`}) 
                    message(data.message)
                    data && console.log(data)
                    if (auth.isAuthenticated) {
                        console.log("Link to - " + data.bid._id);
                        history.push(`/detail/${data.bid._id}`)
                    } else {
                        history.push(`/`)
                    }
            } catch (e) {}
            // Делаем редирект на главную страницу
    }

    useEffect(() => {
        let elems = document.querySelectorAll(".autocomplete")
        let options = {
            data: ock_contacts,
            onAutocomplete(){
                let inputcreator = document.getElementById("creator")
                let creatorname = 'creator'
                setForm({...form, [creatorname]: inputcreator.value})
                console.log(inputcreator.value)

            }
        }
        M.Autocomplete.init(elems, options)
    
        // eslint-disable-next-line
      })

    return (
        <div className="row">
        <h2 className="center">Создать заявку</h2>
            <div className="col s8 offset-s2 createpage">
            <form className="col s12">
                    <select className="browser-default" id="title" onChange={handleChange} value={form.title}>
                        <option value="" disabled>Выберите причину</option>
                        <option value="Заправка картриджа принтера">Заправка картриджа принтера</option>
                        <option value="Проблемы с оборудованием">Проблемы с оборудованием</option>
                        <option value="Проблемы в программе">Проблемы в программе</option>
                        <option value="Другая причина">Другое...</option>
                    </select>
                <br />
                <div className="input-field">
                    <label htmlFor="createmessage">Опишите проблему</label>
                    <textarea id="createmessage" className="materialize-textarea" onChange={handleChange} textcontent={form.createmessage}></textarea>
                </div>
                <br />
                <label>Отделение</label>
                    <select className="browser-default" id="department" onChange={handleChange} value={form.department}>
                        <option value="" disabled>Выберите отделение</option>
                        <option value="ОТК">ОТК</option>
                        <option value="Регистратура">Регистратура</option>
                        <option value="Выбраковка">Выбраковка</option>
                        <option value="ОКД">ОКД</option>
                        <option value="Бухгалтерия">Бухгалтерия</option>
                        <option value="ЛДИ">ЛДИ</option>
                        <option value="Баклаборатория">Баклаборатория</option>
                        <option value="Экспедиция">Экспедиция</option>
                </select>
                <br />
                <div className="input-field"> 
                <label htmlFor="cabinetnumber">№ кабинета</label>
                        <input 
                            id="cabinetnumber" 
                            type="text" 
                            autoComplete="off"
                            maxLength="3"                          
                            placeholder="Введите номер кабинета"
                            onChange={handleChange}
                            value={form.cabinetnumber}
                            
                        />   
                </div>

                <br />

                    <div className="input-field">
                        <input 
                            id="creator"
                            type="text" 
                            maxLength="50"
                            className="autocomplete"
                            autoComplete="off" 
                            onChange={handleChange}
                            value={form.creator}
                        />
                        <label htmlFor="creator">ФИО заявителя</label>
                    </div>
                <button
                            className="btn grey lighten-1 black-text"
                            onClick={sendForm}
                            disabled={loading}
                            >Создать запрос
                        </button>
                
                

                </form>
            </div>
        </div>
    )
}