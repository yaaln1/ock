import React, {useEffect, useContext, useState, useCallback} from 'react'
import { useMessage } from '../../hooks/message.hook'
import { useHttp } from '../../hooks/http.hook'
import { ProfileMenu, ProfileTopBlock } from '../../components/profile/ProfileParts'
// import {NavLink} from 'react-router-dom'
import { AuthContext } from '../../context/Auth.context'
import { localhost_ip, user_mark } from '../../jsondata'
import {Loader} from '../../components/Loader'
// import {useHistory} from 'react-router-dom'
// import M from 'materialize-css'

export const MyDepartmentPage = () => {
    const message = useMessage()
    const auth = useContext(AuthContext)
    const {token} = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState([])


    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const fetchUsers = useCallback(async() => {
        try {
            const fetched = await request('/api/user/mydepartment', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUsers(fetched)
        } catch (e) {
    
        }
    }, [token, request])

    const avatarurl = localhost_ip + 'images/avatar/1pdu-XhsDZQ.jpg'

    const changeHandler = event => {
        let userid = "userid"
        let userstatus = "status"
        const result = {[userid]: event.target.name , [userstatus]: event.target.value}
        setForm({...form, [event.target.id]: result})
        console.log(form)
    }

    const sendForm = async () => {
        try {
            // отправляем данные, полученные с формы для формирования и сохранения заявки в БД
                const result = await request('/api/user/markdepartment', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`}) 
                console.log(result)

        } catch (e) {}
        // Делаем редирект на главную страницу
}


useEffect(() => {
    window.M.updateTextFields()
})


    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])
    
    if (loading) {
        return <Loader />
    }
    
    return (
        <>
        
        <ProfileTopBlock fullname={auth.fullname} department={auth.department} appointment={auth.appointment} avatarurl={avatarurl} />

        <div className="row blue-grey lighten-5 z-depth-2 print-div">
            <div className="col s3 no-print">
                <ProfileMenu />
            </div>

            <div className="col s9 white z-depth-2 print-div">
            <h3>{auth.department}</h3>

            <table className="highlight">
                <thead>
                <tr>
                    <th>№</th>
                    <th>ФИО</th>
                    <th>Должность</th>
                    <th>Отметка</th>
                    <th>Примечание</th>
                    <th className="no-print">Сделать отметку</th>
                    <th className="no-print">Сделать примечание</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => {
                    return(
                        
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td key={index}>{user.lastname} {user.firstname} {user.fathername}</td>
                            <td>{user.appointment}</td>
                            <td>{user.department}</td>
                            <td>Примечание</td>
                            <td className="no-print">
                                <div className="input-field">
                                        <select id={index} defaultValue={"default"} className="browser-default" name={user._id} onChange={changeHandler}>
                                            <option value="default" disabled>Выберите отделение</option>
                                                {
                                                    user_mark.map((mark, i) => {
                                                        return <option key={i} value={mark}>{mark}</option>
                                                    })
                                                }     
                                        </select>
                                </div>
                            </td>
                            <td className="no-print">Сделать примечание</td>
                        </tr>
                        
                    )
                 })}
                
                
                </tbody>
            </table>
            <div className="collection no-print">
                    <a href="#!" className="collection-item center-align blue-text text-darken-2" onClick={sendForm} disabled={loading}>Сохранить изменения</a>
            </div>

           
                
            </div>

        </div>
       
        
            
        </>
    )
}