import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/Auth.context'
import {useHistory} from 'react-router-dom'
import {bids_title} from '../jsondata.js'
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
        department: auth.department,
        creator: auth.fio,
        creatorId: auth.userId
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
                // отправляем данные, полученные с формы для формирования и сохранения заявки в БД
                    const data = await request('/api/bid/create', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`}) 
                // получаем результат и выводим сообщение об ошибке или успешном результате
                // получаем Id новой заявки    
                    message(data.message)
                // // Проверяем - авторизован ли пользователь
                //     if (auth.isAuthenticated && auth.role === 'admin') {
                // // Да - показываем детальную страницу заявки        
                //         history.push(`/detail/${data.bidId}`)
                //     } else {
                // Нет - отправляем на главную страницу, где пользователь получает PopUp
                // сообщение об успешном создании заявки         
                        history.push(`/`)
                    // }
            } catch (e) {}
            // Делаем редирект на главную страницу
    }

    useEffect(() => {
        let bidtitleelems = document.querySelector("input[name=title]")
        let bidtitleoptions = {
            data: bids_title,
            onAutocomplete(){
                let titlevalue = document.getElementById("title")
                let titlename = 'title'
                setForm({...form, [titlename]: titlevalue.value})
                console.log(titlevalue.value)

            }
        }
        M.Autocomplete.init(bidtitleelems, bidtitleoptions)
    
        // eslint-disable-next-line
      })

    // useEffect(() => {
    //     let elems = document.querySelector("input[name=creator]")
    //     let options = {
    //         data: ock_contacts,
    //         onAutocomplete(){
    //             let inputcreator = document.getElementById("creator")
    //             let creatorname = 'creator'
    //             setForm({...form, [creatorname]: inputcreator.value})
    //             console.log(inputcreator.value)

    //         }
    //     }
    //     M.Autocomplete.init(elems, options)
    
    //     // eslint-disable-next-line
    //   })
      

    return (
        <div className="row">
        <h4>Создать заявку</h4>
            <div className="col s12 ">
            <form className="col s12">
                    <div className="input-field">
                        <input 
                            id="title"
                            type="text"
                            name="title"
                            maxLength="50"
                            className="autocomplete"
                            autoComplete="off" 
                            onChange={handleChange}
                            value={form.title}
                        />
                        <label htmlFor="title">Напишите причину</label>
                    </div>



                <br />
                <div className="input-field">
                    <label htmlFor="createmessage">Опишите проблему</label>
                    <textarea id="createmessage" className="materialize-textarea" onChange={handleChange} textcontent={form.createmessage}></textarea>
                </div>
                <br />
                <div className="input-field col s12">
                <input disabled value={auth.department} id="department" type="text" className="validate" />
                <label htmlFor="department">Отделение</label>
                </div>
                

                <br />
                <div className="input-field col s12">
          <input disabled value={auth.fio} id="disabled" type="text" className="validate" />
          <label htmlFor="disabled">ФИО заявителя</label>
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