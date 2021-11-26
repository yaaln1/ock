import React, { useEffect } from 'react'
import { PhoneBookInfo } from '../components/phonebook/PhoneBookInfo'
import { FirstFloorInnerContact, SecondFloorInnerContact, ThirdFloorInnerContact, FourthFloorInnerContact } from '../components/phonebook/InternalPhone'
import M from 'materialize-css'

export const PhoneBookPage = () => {
    useEffect(() => {
        let tabs = document.querySelectorAll(".tabs");
        let options = {
            duration: 300
        };
        M.Tabs.init(tabs, options);
    
        // eslint-disable-next-line
      }, []);

    return (
        <>
            <h4>Справочник ОЦК</h4>
            <div className="row">
                <div className="col s12">
                <ul className="tabs">
                    <li className="tab col s4"><a className="active" href="#infobook">Основная информация</a></li>
                    <li className="tab col s2"><a href="#floor1">1 ЭТАЖ</a></li>
                    <li className="tab col s2"><a href="#floor2">2 ЭТАЖ</a></li>
                    <li className="tab col s2"><a href="#floor3">3 ЭТАЖ</a></li>
                    <li className="tab col s2"><a href="#floor4">4 ЭТАЖ</a></li>
                </ul>
                </div>
                <div id="infobook" className="col s12">
                    <PhoneBookInfo />
                </div>
                <div id="floor1" className="col s12">
                    <FirstFloorInnerContact />
                </div>
                <div id="floor2" className="col s12">
                    <SecondFloorInnerContact />
                </div>
                <div id="floor3" className="col s12">
                    <ThirdFloorInnerContact />
                </div>
                <div id="floor4" className="col s12">
                    <FourthFloorInnerContact />
                </div>
            </div>
        </>
    )
}