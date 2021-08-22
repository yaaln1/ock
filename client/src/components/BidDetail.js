import React from 'react'

export const BidDetail = ({bid}) => {
    const date = new Date(bid.createtime).toLocaleString()

    return (
        <>
            <h4>Заявка №{bid._id}</h4>
            <h3>{bid.title}</h3>
            <p>Автор: {bid.creator} </p>
            <p>Кабинет №: {bid.cabinetnumber} Дата постановки: {date}</p>
            <p>Текст заявки: {bid.createmessage}</p>
            <p>Отделение: {bid.department}</p>
        </>
    )
}