import React, {useContext, useEffect, useState} from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/Auth.context'
import { useMessage } from '../hooks/message.hook'
import {useHistory} from 'react-router-dom'

export const BidDetail = (props) => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const history = useHistory()
    const {loading, request, error, clearError} = useHttp()

    const date = new Date(props.bid.createtime).toLocaleString()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    })


    const [form, setForm] = useState({
        title: 'title',
        createmessage: 'createmess',
        department: 'dep',
        cabinetnumber: 'cab',
        creator: 'creat'
    })






    const startBid = async () => {
        try {
            const id = props.bid._id
            const executor = auth.fio
            // const anonimus = 12
                const data = await request('/api/bid/start', 'POST', {id, executor}, {Authorization: `Bearer ${auth.token}`}) 
            // получаем результат и выводим сообщение об ошибке или успешном результате
            // получаем Id новой заявки    
                message(data.message)
            // Проверяем - авторизован ли пользователь
                if (auth.isAuthenticated && auth.role === 'admin') {
            // Да - показываем детальную страницу заявки        
                    history.push(`/detail/${data.bidId}`)
                } 
        } catch (e) {}
        // Делаем редирект на главную страницу
}

    return (
        <>
        <br/>
            <h5>Заявка №{props.bid.manualid}</h5>
            <h3>{props.bid.title}</h3>
            <p>Автор: {props.bid.creator} </p>
            <p>Кабинет №: {props.bid.cabinetnumber} Дата постановки: {date}</p>
            <p>Текст заявки: {props.bid.createmessage}</p>
            <p>Отделение: {props.bid.department}</p>
            <p>Статус: {props.bid.status}</p>
            <p>Выполнил: {props.bid.executor}</p>
            <p>Дата выполнения: {props.bid.completetime}</p>

            <button
                    className="waves-effect waves-light btn"
                    onClick={startBid}
                    disabled={false}
                    ><i className="material-icons left">build</i>Выполнить
            </button>
            <button
                    className="waves-effect waves-light btn"
                    // onClick={}
                    disabled={true}
                    ><i className="material-icons left">check</i>Завершить
            </button>
            
        </>
    )
}