import React, {useEffect} from 'react'
import { useMessage } from '../hooks/message.hook'
import { useHttp } from '../hooks/http.hook'
import {NavLink} from 'react-router-dom'
// import { AuthContext } from '../context/Auth.context'
// import {useHistory} from 'react-router-dom'
// import M from 'materialize-css'

export const HomePage = () => {
    const message = useMessage()
    const { error, clearError} = useHttp()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    return (
        <>
        <div className="row padding_top_5">
        <NavLink to="/create">
            <div className="col s3 hoverable">
                <div className="home-icons-block">
                        <i className="large material-icons">live_help</i>
                        <p>Создать заявку</p>
                    </div>
            </div>
        </NavLink>
        <NavLink to="/phonebook">
            <div className="col s3 hoverable">
                <div className="home-icons-block">
                        <i className="large material-icons">contact_phone</i>
                        <p>Справочник ОЦК</p>
                    </div>
            </div>
        </NavLink>
        <NavLink to="/docs">
            <div className="col s3 hoverable">
                <div className="home-icons-block">
                        <i className="large material-icons">library_books</i>
                        <p>Документы</p>
                    </div>
            </div>
        </NavLink>
        <NavLink to="/">
            <div className="col s3 hoverable">
                <div className="home-icons-block">
                        <i className="large material-icons">question_answer</i>
                        <p>Вопрос-Ответ</p>
                    </div>
            </div>
        </NavLink>
        </div>
        
            
        </>
    )
}