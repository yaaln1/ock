import React from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from "./pages/AuthPage"
import { CreatePage } from "./pages/CreatePage"
// import { DetailPage } from "./pages/DetailPage"
import { LinksPage } from "./pages/LinksPage"
import { HomePage } from "./pages/HomePage"
import { RegistrationPage } from "./pages/RegistrationPage"


// <Route path="/detail/:id" exact>
// <DetailPage />
// </Route>

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/reg_admin_new" exact>
                    <RegistrationPage />
                </Route>
                <Route path="/links" exact>
                    <LinksPage />
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
    return (
        <Switch>
            <Route path="/reg_admin_new" exact>
                <RegistrationPage />
            </Route>
            <Route path="/login" exact>
                <AuthPage />
            </Route>
            <Route path="/" exact>
                <HomePage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}