import React from 'react'

export const PhoneBookInfo = () => {
    return (
        <>
            <p><b>Полное название:</b> КГП «КОСТАНАЙСКИЙ ОБЛАСТНОЙ ЦЕНТР КРОВИ» УЗАКО</p>
            <p><b>Адрес:</b> г.Костанай, ул.Быковского 4а</p>
            <p><b>Индекс:</b> 110005</p>
            <p><b>Email приемная:</b> ock1@yandex.ru , ock_kos@med.mail.kz</p>
            <p><b>Email бухгалтерия:</b> kostock@mail.ru</p>

            <table className="striped">
        <thead>
          <tr>
              <th>ФИО</th>
              <th>Должность</th>
              <th>Телефон</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>ДАУМЕНОВ Марат Дюсенханович</td>
            <td>и.о. директора</td>
            <td>26-63-36</td>
          </tr>
          <tr>
            <td>ПОДЧИНЕНОВА Светлана  Владимировна</td>
            <td>главный бухгалтер</td>
            <td>53-77-70</td>
          </tr>
          <tr>
            <td>ЗЮБЕНКО Татьяна Леонидовна</td>
            <td>руководитель  отдела кадров</td>
            <td>26-63-66</td>
          </tr>
        </tbody>
      </table>

        </>
    )
}