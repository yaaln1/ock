import React, {useState, useEffect, useContext, useCallback}  from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/Auth.context'
import {Loader} from '../components/Loader'
import { BidsList } from '../components/BidsList'
import 'materialize-css'

export const BidsPage = () => {
    const [bids, setBids] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchBids = useCallback(async() => {
        try {
            const fetched = await request('/api/bid', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            fetched.reverse()
            setBids(fetched)
        } catch (e) {

        }
    }, [token, request])

    useEffect(() => {
        fetchBids()
    }, [fetchBids])

    if (loading) {
        return <Loader />
    }

    return (
        <>
        <h4>Заявки</h4>
            {!loading && <BidsList bids={bids} />}
        </>
    )
}
