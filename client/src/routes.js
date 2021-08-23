import React from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from "./pages/AuthPage"
import { CreatePage } from "./pages/CreatePage"
import { DetailPage } from "./pages/DetailPage"
import { BidsPage } from "./pages/BidsPage"
import { HomePage } from "./pages/HomePage"
import { RegistrationPage } from "./pages/RegistrationPage"



export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
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
                <Route path="/" exact>
                    <HomePage />
                </Route>

                <Redirect to="/" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/reg_admin_new" exact>
                <RegistrationPage />
            </Route>
            <Route path="/login" exact>
                <AuthPage />
            </Route>
            <Route path="/create" exact>
                    <CreatePage />
                </Route>
            <Route path="/" exact>
                <HomePage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}