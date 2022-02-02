import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [firstname, setFirstName] = useState(null)
    const [fio, setFullName] = useState(null)
    const [fullname, setFIO] =useState(null)
    const [role, setRole] = useState(null)
    const [department, setDepartment] = useState(null)
    const [appointment, setAppointment] = useState(null)


    const login = useCallback((jwtToken, id, first_name, full_name, user_fullname, user_role, user_department, user_appointment) => {
        setToken(jwtToken)
        setUserId(id)
        setFirstName(first_name)
        setFullName(full_name)
        setFIO(user_fullname)
        setRole(user_role)
        setDepartment(user_department)
        setAppointment(user_appointment)

        localStorage.setItem(storageName, JSON.stringify({
            userId:id, token:jwtToken, firstname: first_name, fio: full_name, fullname:user_fullname, role:user_role, department:user_department, appointment: user_appointment
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setFirstName(null)
        setFullName(null)
        setFIO(null)
        setRole(null)
        setDepartment(null)
        setAppointment(null)

        localStorage.removeItem(storageName)
    }, [])


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.firstname, data.fio, data.fullname, data.role, data.department, data.appointment)
        }
        setReady(true)
    }, [login])


    return {login, logout, token, userId, firstname, fio, fullname, role, department, appointment, ready}

}