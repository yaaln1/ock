import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/Auth.context'
import { Loader } from '../components/Loader'
import { BidDetail } from '../components/BidDetail'
import 'materialize-css'

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [bid, setBid] = useState(null)
    const bidId = useParams().id

    const getBid = useCallback(async () => {
        try {
            const fetched = await request(`/api/bid/${bidId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(fetched);
            setBid(fetched)
        } catch (e) {

        }
    }, [token, bidId, request])

    useEffect(() => {
        getBid()
    }, [getBid])

    if (loading) {
        return <Loader />
    }


    return (
        <>
            { !loading && bid && <BidDetail bid={bid} />}
        </>
    )
}