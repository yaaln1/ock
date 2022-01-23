import React from 'react'

export const DocsList = ({docs}) => {
    if (!docs.length) {
        return <p className="center">Документов пока нет</p>
    }

    return (
        <>
        <ul className="collection">
            { docs.map((doc, index) => {
                let docStatusIcon
                let docIconColor 
                if (doc.status === false) {
                    docStatusIcon = "chevron_right"
                    docIconColor = "small material-icons iconcolorgreen left"
                } else {
                    docStatusIcon = "report_problem"
                    docIconColor = "small material-icons iconcolororange left"
                }
            return (
                
                <li key={doc._id} className="collection-item"><div><a href={doc.link} target="_blank" rel="noreferrer" className="secondary-content"><i className="small material-icons right">cloud_download</i></a>
                <i className={docIconColor}>{docStatusIcon}</i>{doc.title}</div>
                </li>
                
            )
            
        }
        )}
        </ul>
        </>
    )
}