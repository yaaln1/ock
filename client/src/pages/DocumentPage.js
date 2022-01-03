import React, { useEffect } from 'react'
import M from 'materialize-css'

export const DocumentPage = () => {
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
            <h4>НПА</h4>
            <p>Чтобы найти нужный документ нажмите Ctrl+F и в появивщемся окне начните печатать название документа</p>

            <ul className="collection">
                <li className="collection-item"><div><a href="https://adilet.zan.kz/rus/docs/K950001000_" target="_blank" rel="noreferrer" className="secondary-content"><i className="small material-icons right">cloud_download</i></a>
                <i className="small material-icons left">clear</i>­­Конституция Республики Казахстан</div></li>
                <li className="collection-item"><div><a href="./docs/p1600000832.18-01-2021.rus.pdf" target="_blank" rel="noreferrer" className="secondary-content"><i className="small material-icons right">cloud_download</i></a>
                <i className="small material-icons left">chevron_right</i>Об утверждении единых требований в области информационно-коммуникационных технологий и обеспечения информационной безопасности</div>
                </li>
            
            </ul>
        </>
    )
}