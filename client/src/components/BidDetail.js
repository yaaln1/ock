import React, {useContext, useEffect} from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/Auth.context'
import { useMessage } from '../hooks/message.hook'
import {useHistory} from 'react-router-dom'


export const BidDetail = (props) => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {request, error, clearError} = useHttp()


    const date = new Date(props.bid.createtime).toLocaleString()
            let completedate
            if (props.bid.completetime) {
                completedate = new Date(props.bid.completetime).toLocaleString()
            } else {completedate = "-"}
            let fullcompletedate
            if (props.bid.fullcompletetime) {
                fullcompletedate = new Date(props.bid.fullcompletetime).toLocaleString()
            } else {fullcompletedate = "-"}

            let bidStatusIcon
            let bidIconColor
            let bidStatusText
            if (props.bid.status === "new") {
                bidStatusIcon = "brightness_1"
                bidIconColor = "material-icons iconcolorred"
                bidStatusText = "Новая заявка"
            } else if (props.bid.status === "inwork") {
                bidStatusIcon = "build"
                bidIconColor = "material-icons iconcolorblue"
                bidStatusText = "В работе"
            } else if (props.bid.status === "complete") {
                bidStatusIcon = "done_all"
                bidIconColor = "material-icons iconcolorgreen"
                bidStatusText = "Выполнено и подтверждено"}
              else if (props.bid.status === "done") {
                bidStatusIcon = "brightness_1"
                bidIconColor = "material-icons iconcolororange"
                bidStatusText = "Ожидает подверждения"
            }


    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    
  
        const startBid = async () => {
            try {
                const id = props.bid._id
                const status = props.bid.status
                const executor = auth.fio
                const data = await request('/api/bid/start', 'POST', {id, status, executor}) 
                message(data.message)
                history.push(`/bids`)
                    
            } catch (e) {}

        }

    return (
        <>

            <h5>Заявка №{props.bid.manualid}</h5>
            <h3>{props.bid.title}</h3>
            <p>Автор: {props.bid.creator} </p>
            <p>Кабинет №: {props.bid.cabinetnumber} Дата постановки: {date}</p>
            <p>Текст заявки: {props.bid.createmessage}</p>
            <p>Отделение: {props.bid.department}</p>
            <p>Статус: <i className={bidIconColor}>{bidStatusIcon}</i> {bidStatusText}</p>
            {(props.bid.status === "complete") && 
            <p>Дата подтверждения: {fullcompletedate}</p>
            }
            <p>Выполнил: {props.bid.executor}</p>
            <p>Дата выполнения: {completedate}</p>

            {
                ((props.bid.status === "done" && auth.role === "user" ) && 
                <button
                        className="waves-effect waves-light btn"
                        onClick={() => startBid()}
                        ><i className="material-icons left">check</i>Подтвердить выполнение
                </button>
            )
            }
            {((props.bid.status === "new" && auth.role === "admin") && 
                <button
                        className="waves-effect waves-light btn"
                        onClick={() => startBid()}
                        ><i className="material-icons left">build</i>Выполнить
                </button>
            )}
            {((props.bid.status === "inwork" && auth.role === "admin") && 
                <button
                        className="waves-effect waves-light btn"
                        onClick={() => startBid()}
                        ><i className="material-icons left">check</i>Завершить
                </button>
            )}

        </>
    )
}