import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [firstname, setFirstName] = useState(null)
    const [fio, setFullName] = useState(null)
    const [role, setRole] = useState(null)
    const [department, setDepartment] = useState(null)


    const login = useCallback((jwtToken, id, first_name, full_name, user_role, user_department) => {
        setToken(jwtToken)
        setUserId(id)
        setFirstName(first_name)
        setFullName(full_name)
        setRole(user_role)
        setDepartment(user_department)

        localStorage.setItem(storageName, JSON.stringify({
            userId:id, token:jwtToken, firstname: first_name, fio: full_name, role:user_role, department:user_department
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setFirstName(null)
        setFullName(null)
        setRole(null)
        setDepartment(null)

        localStorage.removeItem(storageName)
    }, [])


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.firstname, data.fio, data.role, data.department)
        }
        setReady(true)
    }, [login])


    return {login, logout, token, userId, firstname, fio, role, department, ready}

}