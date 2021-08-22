import React, {useEffect} from 'react'
import { useMessage } from '../hooks/message.hook'
import { useHttp } from '../hooks/http.hook'
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
            <h2>Это Домашняя страница</h2>
        </>
    )
}