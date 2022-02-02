import React, { useEffect, useContext, useState, useCallback} from 'react'
import { useHttp } from '../hooks/http.hook'
import axios from 'axios'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/Auth.context'
import {Loader} from '../components/Loader'
import { DocsList } from '../components/DocsList'
import M from 'materialize-css'

export const DocumentPage = () => {
    const auth = useContext(AuthContext)
    const {token} = useContext(AuthContext)
    const message = useMessage()
    const [docs, setDocs] = useState([])
    const {loading, request, error, clearError} = useHttp()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        let tabs = document.querySelectorAll(".tabs");
        let options = {
            duration: 300
        };
        M.Tabs.init(tabs, options);
    
        // eslint-disable-next-line
      }, []);



const [doc, setDoc] = useState(null)
const [checknpa, setChecknpa] = useState(false)
// const [npa_documentss, setNpa_documentss] = useState(null)

const fetchDocs = useCallback(async() => {
    try {
        const fetched = await request('/api/doc', 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setDocs(fetched)
    } catch (e) {

    }
}, [token, request])

const sendFile = useCallback(async () => {
    try {
        const data = new FormData()
        data.append('npa_document', doc)
        data.append('doctype', 'npa')
        data.append('status', checknpa)

        
        const result = await axios.post('/api/doc/upload', data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        // setNpa_documentss(result.data.file.path)
        message(result.data.message)
        fetchDocs()
        setChecknpa(false)

    } catch (e) {}
}, [doc, checknpa, message, fetchDocs, setChecknpa])

const handleChangeNpa = (event) => {
    try {
        setChecknpa(!checknpa)
       // console.log(checknpa)
    } catch (e) {
    }
}




useEffect(() => {
    fetchDocs()
}, [fetchDocs])


if (loading) {
    return <Loader />
}



    return (
        <>
            <h4>НПА</h4>
            <p>Чтобы найти нужный документ нажмите Ctrl+F и в появивщемся окне начните печатать название документа</p>
            {((auth.role === "admin" || auth.role === "yurist") &&
                <>
                    <div className="form-group">
                    <input name="userfile" id="userfile" type="file" accept="application/pdf" onChange={e => setDoc(e.target.files[0])}/>
                    <button onClick={sendFile} disabled={loading}>Сохранить файл</button>   
                    <label className="npa_filled_in">
                        <input type="checkbox" className="filled-in" onChange={handleChangeNpa}  />
                        <span>Устаревший</span>
                    </label>
                    </div>
                    <small className="form-text">Только PDF-файлы</small>
                </>) }

                {(!loading && <DocsList docs={docs} />)}
        </>
    )
}