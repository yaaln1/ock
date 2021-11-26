import React from 'react'
import {Link} from 'react-router-dom'

export const BidsList = ({bids}) => {
    if (!bids.length) {
        return <p className="center">Заявок пока нет</p>
    }
    const reversed = bids.reverse()
    console.log(reversed)
    return (
        <>


            <div className="row no-print">
                <div className="col s12 m12">
                <div className="card blue darken-2">
                    <div className="card-content white-text">
                    <span className="card-title">Фильтр заявок</span>
                    <p>Здесь выбираются даты по которым будет вестись фильтрация</p>
                    </div>
                    <input id="prevday" type="text" className="datepicker"/>
                    <label htmlFor="prevday">Начальная дата</label>
                    <input id="lastday" type="text" className="datepicker"/>
                    <label htmlFor="lastday">Конечная дата</label>
                    <div className="card-action">
                    <a href="#!">Найти заявки</a>
                    <a href="#!">Показать все</a>
                    <a href="#!">В работе</a>
                    <a href="#!">Выполненные</a>
                    <a href="#!">Не подтвержденные</a>
                    <a href="#!">Подтвержденные</a>
                    </div>
                </div>
                </div>
            </div>




        <table>
        <thead>
          <tr>
              <th>№</th>
              <th>Статус</th>
              <th>Причина</th>
              <th>Сотрудник</th>
              <th>Отделение</th>
              <th className="table_bidtime">Дата постановки</th>
              <th>Выполнил</th>
              <th className="table_bidtime">Дата выполнения</th>
              <th className="no-print">Открыть</th>
          </tr>
        </thead>

        <tbody>
        { reversed.map((bid, index) => {
            const date = new Date(bid.createtime).toLocaleString()
            let completedate
            if (bid.completetime) {
                completedate = new Date(bid.completetime).toLocaleString()
            } else {completedate = "-"}

            let bidStatusIcon
            let bidIconColor 
            if (bid.status === "new") {
                bidStatusIcon = "brightness_1"
                bidIconColor = "material-icons iconcolorred"
            } else if (bid.status === "inwork") {
                bidStatusIcon = "build"
                bidIconColor = "material-icons iconcolorblue"
            } else if (bid.status === "done") {
                bidStatusIcon = "brightness_1"
                bidIconColor = "material-icons iconcolororange"
            } else if (bid.status === "complete") {
                bidStatusIcon = "done_all"
                bidIconColor = "material-icons iconcolorgreen"
            }

            
            return (
                <tr key={bid._id}>
                    <td>{index + 1}</td>
                    <td><i className={bidIconColor}>{bidStatusIcon}</i></td>
                    <td>{bid.title}</td>
                    <td className="table_bidcreator">{bid.creator}</td>
                    <td>{bid.department}</td>
                    <td className="table_bidtime">{date}</td>
                    <td className="table_bidcreator">{bid.executor}</td>
                    <td className="table_bidtime">{completedate}</td>
                    <td className="no-print"><Link to={`/detail/${bid._id}`}>Открыть</Link></td>
                </tr>
              )
        }
        )}
        </tbody>
      </table>
      </>
    )
}