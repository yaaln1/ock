import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../../context/Auth.context'

export const FirstFloorInnerContact = () => {
    return (
        <>
        <div className="section">
                    <h5>Личные данные</h5>
                    <p>Stuff</p>
                </div>
                <div className="divider"></div>
                <div className="section">
                    <h5>Семейное положение</h5>
                    <p>Stuff</p>
                </div>
                <div className="divider"></div>
                <div className="section">
                    <h5>Образование</h5>
                    <p>Stuff</p>
                </div>
                <div className="divider"></div>
                <div className="section">
                    <h5>Карьера</h5>
                    <p>Stuff</p>
                </div>
            
        </>
    )
}

export const ProfileMenu = () => {
    const auth = useContext(AuthContext)
    return (
        <>
            <NavLink to="/profile">      
                <h5 className="black-text valign-wrapper"><i className="small material-icons iconinprofilemenu">account_circle</i>Мой профиль</h5>
            </NavLink>
            <NavLink to="/profile/mydepartment">                     
                <h5 className="black-text valign-wrapper"><i className="small material-icons iconinprofilemenu">people</i>Мой отдел</h5>
            </NavLink>
            {(auth.role === 'admin') && 
            <NavLink to="/profile/staff">                     
                <h5 className="black-text valign-wrapper"><i className="small material-icons iconinprofilemenu">recent_actors</i>Сотрудники</h5>
            </NavLink>}
            {(auth.role === 'admin') && 
            <NavLink to="/profile/staff">                     
                <h5 className="black-text valign-wrapper"><i className="small material-icons iconinprofilemenu">settings</i>Редактировать</h5>
            </NavLink>}
            
        </>
    )
}

export const ProfileTopBlock = ({fullname, department, appointment, avatarurl}) => {
    return (
        <>
            <div className="margin_top_5 row blue lighten-2 z-depth-4 valign-wrapper no-print">
            
            <div className="col s10">
            
                <h3 className="right-align">{fullname}</h3>
                <div className="divider"></div>
                <p className="right-align"><b>Отделение:</b> {department}</p>
                <p className="right-align"><b>Должность:</b> {appointment}</p>
            </div>
            <div className="avatarimg col s2">
                <img src={avatarurl} alt="Аватар" className="circle responsive-img" />
            </div>

        </div>
        </>
    )
}

export const FourthFloorInnerContact = () => {
    return (
        <>
            <div className="container">
            <table className="striped">
                <thead>
                    <tr>
                        <th>ФИО, должность, кабинет</th>
                        <th>Телефон</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Зав.ОУК </td>
                    <td><b>119</b></td>
                </tr>
                <tr>
                    <td>Бак. лаборатория</td>
                    <td><b>121</b></td>
                </tr>
                <tr>
                    <td>Клиника ст. лаб. – Нургалиева Гулжан Сабырхановна <b>(группа крови, резус фактор)</b></td>
                    <td><b>135</b></td>
                </tr>
                <tr>
                    <td>Инженер по охране труда и технике безопасности (Уколов В. Л.)</td>
                    <td><b>136</b></td>
                </tr>
                <tr>
                    <td>Зав. отделением ЛДИ<b> (Спид, Гепатиты)</b></td>
                    <td><b>137</b></td>
                </tr>
                <tr>
                    <td>Изоиммунология (зав. отделением – Богданов Николай Игоревич, ст. лаборант – Диханова Динара Жакеновна) <b>(Титры, Антитела, Консультация)</b></td>
                    <td><b>142</b></td>
                </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}