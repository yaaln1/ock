import React  from 'react'
// import {useHttp} from '../hooks/http.hook'
// import {AuthContext} from '../context/Auth.context'
// import {Loader} from '../components/Loader'
// import { LinkList } from '../components/LinkList'
import 'materialize-css'

export const LinksPage = () => {
    return (
        <>
            <h2>Это страница ссылок</h2>
        </>
    )
}

// export const LinksPage = () => {
//     const [links, setLinks] = useState([])
//     const {loading, request} = useHttp()
//     const {token} = useContext(AuthContext)

//     const fetchLinks = useCallback(async() => {
//         try {
//             const fetched = await request('/api/link', 'GET', null, {
//                 Authorization: `Bearer ${token}`
//             })
//             setLinks(fetched)
//         } catch (e) {

//         }
//     }, [token, request])

//     useEffect(() => {
//         fetchLinks()
//     }, [fetchLinks])

//     if (loading) {
//         return <Loader />
//     }

//     return (
//         <>
//             {!loading && <LinkList links={links} />}
//         </>
//     )
// }