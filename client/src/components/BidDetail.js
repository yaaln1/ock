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

    // const date = new Date(props.bid.createtime).toLocaleString()
    // const completedate = new Date(props.bid.completetime).toLocaleString()
    const date = new Date(props.bid.createtime).toLocaleString()
            let completedate
            if (props.bid.completetime) {
                completedate = new Date(props.bid.completetime).toLocaleString()
            } else {completedate = "-"}

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
            } else if (props.bid.status === "done") {
                bidStatusIcon = "done_all"
                bidIconColor = "material-icons iconcolorgreen"
                bidStatusText = "Выполнено"}


    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    
    // useEffect(() => {
    //     window.M.updateTextFields()
    // })

    // const [bidParam, setBidParam] = useState({
    //     id: props.bid.manualid,
    //     title: props.bid.title,
    //     createmessage: props.bid.createmessage,
    //     department: props.bid.department,
    //     cabinetnumber: props.bid.cabinetnumber,
    //     creator: props.bid.creator,
    //     status: props.bid.status,
    //     executor: props.bid.executor,
    //     completetime: props.bid.completetime,
    // })

  
        const startBid = async () => {
            try {
                const id = props.bid._id
                const status = props.bid.status
                const executor = auth.fio
                const data = await request('/api/bid/start', 'POST', {id, status, executor}) 
                // получаем результат и выводим сообщение об ошибке или успешном результате  
                message(data.message)
                history.push(`/bids`)
                // await setBidParam({...bidParam, [bidParam.status]: data.status, [bidParam.executor]: data.executor, [bidParam.completetime]: data.completetime})
                // console.log("Это новый статус " + data.status + " и который сохраняется " + bidParam.status)
                    
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
            <p>Выполнил: {props.bid.executor}</p>
            <p>Дата выполнения: {completedate}</p>

            {((props.bid.status === "new") && 
                <button
                        className="waves-effect waves-light btn"
                        onClick={() => startBid()}
                        ><i className="material-icons left">build</i>Выполнить
                </button>
            )}
            {((props.bid.status === "inwork") && 
                <button
                        className="waves-effect waves-light btn"
                        onClick={() => startBid()}
                        ><i className="material-icons left">check</i>Завершить
                </button>
            )}

        </>
    )
}