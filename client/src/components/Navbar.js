import React, { useContext, useEffect } from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'
import M from 'materialize-css'



export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    
 
    useEffect(() => {
        let dropdowns = document.querySelectorAll(".dropdown-trigger");
        let options = {
          inDuration: 300,
          outDuration: 225
        };
        M.Dropdown.init(dropdowns, options);
    
        // eslint-disable-next-line
      }, []);



      useEffect(() => {
        let sidenavs = document.querySelectorAll(".sidenav");
        let options = {
          inDuration: 300,
          outDuration: 225
        };
        M.Sidenav.init(sidenavs, options);
    
        // eslint-disable-next-line
      }, []);

    

    return (
        <>
        <ul id="dropdown1" className="dropdown-content">
      {(auth.isAuthenticated && 
        <>
        <li><a href="#!">Профиль</a></li>
        <li><a href="#!">Сообщения <span className="new badge red" data-badge-caption="новых">4</span></a></li>
        <li className="divider"></li>
        <li><a href="/" onClick={logoutHandler}>Выход</a></li>
        </>
        )
       || <li><NavLink to ="/login">Войти</NavLink></li>}
        

        
        </ul>
        <nav>
            <div className="nav-wrapper blue darken-1 navbar">
            <span href="/" className="brand-logo">ИТ отдел ОЦК</span>
            <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <div className="search-component">
                        <div className="input-field">
                          <input id="search" type="search" required />
                          <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                          <i className="material-icons">close</i>
                        </div>
                    </div>
                </li>
                <li><NavLink to="/"><i className="material-icons">home</i></NavLink></li>
                <li><NavLink to="/create">Создать</NavLink></li>
                <li><NavLink to="/phonebook">Справочник</NavLink></li>
                <li><NavLink to="/docs">Документы</NavLink></li>
                
                <li><NavLink to ="/bids">Заявки</NavLink></li>

                
                <li><a className="dropdown-trigger" href="#!" data-target="dropdown1" >{(auth.isAuthenticated && auth.firstname) || 'Профиль'}<i className="material-icons right">account_circle</i></a></li> 
      
                
            </ul>
            </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
            <li><NavLink to="/">Главная</NavLink></li>
            <li><NavLink to="/create">Создать</NavLink></li>
            <li><NavLink to ="/links">Ссылки</NavLink></li>
        </ul>

        </>
    )
}