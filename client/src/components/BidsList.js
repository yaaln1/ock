import React from 'react'
import {Link} from 'react-router-dom'

export const BidsList = ({bids}) => {
    if (!bids.length) {
        return <p className="center">Заявок пока нет</p>
    }
    const reversed = bids.reverse()
    console.log(reversed)
    return (
        <table>
        <thead>
          <tr>
              <th>№</th>
              <th>Статус</th>
              <th>Причина</th>
              <th>Сотрудник</th>
              <th>Отделение</th>
              <th>Дата создания</th>
              <th>Открыть</th>
          </tr>
        </thead>

        <tbody>
        { reversed.map((bid, index) => {
            const date = new Date(bid.createtime).toLocaleString()
            return (
                <tr key={bid._id}>
                    <td>{index + 1}</td>
                    <td>{bid.status}</td>
                    <td>{bid.title}</td>
                    <td>{bid.creator}</td>
                    <td>{bid.department}</td>
                    <td>{date}</td>
                    <td><Link to={`/detail/${bid._id}`}>Открыть</Link></td>
                </tr>
              )
        })}
        </tbody>
      </table>
    )
}