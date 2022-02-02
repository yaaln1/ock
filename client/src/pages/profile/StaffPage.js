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

export const StaffPage = () => {
    const message = useMessage()
    const auth = useContext(AuthContext)
    const {token} = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const {loading, request, error, clearError} = useHttp()



    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const fetchUsers = useCallback(async() => {
        try {
            const fetched = await request('/api/user/all', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUsers(fetched)
        } catch (e) {
    
        }
    }, [token, request])

    const avatarurl = localhost_ip + 'images/avatar/1pdu-XhsDZQ.jpg'

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
            <h3>Сотрудники</h3>

            <table className="highlight">
                <thead>
                <tr>
                    <th>№</th>
                    <th>ФИО</th>
                    <th>Отделение</th>
                    <th>Должность</th>
                    <th>Отметка</th>
                    <th className="no-print">Сделать отметку</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => {
                    return(
                        
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td key={index}>{user.lastname} {user.firstname} {user.fathername}</td>
                            <td>{user.department}</td>
                            <td>{user.appointment}</td>
                            <td>{user.department}</td>
                            <td className="no-print">
                                    <select className="browser-default" id={user._id} >
                                        <option value="" disabled>Выберите отделение</option>
                                            {
                                                user_mark.map((mark, i) => {
                                                    return <option key={i} value={mark}>{mark}</option>
                                                })
                                            }     
                                    </select>
                            </td>
                        </tr>
                        
                    )
                 })}
                
                
                </tbody>
            </table>
            <div className="collection no-print">
                    <a href="#!" className="collection-item center-align blue-text text-darken-2">Сохранить изменения</a>
            </div>

           
                
            </div>

        </div>
       
        
            
        </>
    )
}