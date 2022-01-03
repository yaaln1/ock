import {createContext} from 'react'

function noop() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    firstname: null,
    fullname: null,
    department: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
    role: null
})