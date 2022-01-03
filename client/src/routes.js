import React from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from "./pages/AuthPage"
import { CreatePage } from "./pages/CreatePage"
import { DetailPage } from "./pages/DetailPage"
import { BidsPage } from "./pages/BidsPage"
import { HomePage } from "./pages/HomePage"
import { RegistrationPage } from "./pages/RegistrationPage"
import { PhoneBookPage } from "./pages/PhoneBookPage"
import { DocumentPage } from "./pages/DocumentPage"



export const useRoutes = (isAuthenticated, role) => {
    if (isAuthenticated && role === 'admin') {
        return (
            <Switch>
                <Route path="/reg_admin_new" exact>
                    <RegistrationPage />
                </Route>
                <Route path="/bids" exact>
                    <BidsPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id" exact>
                <DetailPage />
                </Route>
                <Route path="/docs" exact>
                    <DocumentPage />
                </Route>
                <Route path="/phonebook" exact>
                    <PhoneBookPage />
                </Route>
                <Route path="/" exact>
                    <HomePage />
                </Route>

                <Redirect to="/" />
            </Switch>
        )
    }
    else if (isAuthenticated) {
    return (
        <Switch>
            <Route path="/reg_admin_new" exact>
                <RegistrationPage />
            </Route>
            {(!isAuthenticated) && <Route path="/login" exact> <AuthPage /> </Route>}

            <Route path="/create" exact>
                    <CreatePage />
            </Route>
            <Route path="/bids" exact>
                    <BidsPage />
            </Route>
            <Route path="/detail/:id" exact>
                    <DetailPage />
            </Route>
            <Route path="/docs" exact>
                    <DocumentPage />
            </Route>
            <Route path="/phonebook" exact>
                    <PhoneBookPage />
            </Route>
            <Route path="/" exact>
                <HomePage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
    } else {
        return (
            <Switch>
            <Route path="/docs" exact>
                    <DocumentPage />
            </Route>
            <Route path="/reg_admin_new" exact>
                <RegistrationPage />
            </Route>
            <Route path="/phonebook" exact>
                    <PhoneBookPage />
            </Route>
            <Route path="/login" exact> 
                <AuthPage /> 
            </Route>
            <Route path="/" exact>
                <HomePage />
            </Route>
            <Redirect to="/login" />
            </Switch>
        )
    }
}