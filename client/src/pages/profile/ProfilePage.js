import React, {useEffect, useContext} from 'react'
import { useMessage } from '../../hooks/message.hook'
import { useHttp } from '../../hooks/http.hook'
import { FirstFloorInnerContact, ProfileMenu, ProfileTopBlock} from '../../components/profile/ProfileParts'
// import {NavLink} from 'react-router-dom'
import { AuthContext } from '../../context/Auth.context'
import { localhost_ip } from '../../jsondata'
// import {useHistory} from 'react-router-dom'
// import M from 'materialize-css'

export const ProfilePage = () => {
    const message = useMessage()
    const auth = useContext(AuthContext)
    // const {token} = useContext(AuthContext)
    const { error, clearError} = useHttp()



    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    // const [block, setBlock] = useState('profile')

    const avatarurl = localhost_ip + 'images/avatar/1pdu-XhsDZQ.jpg'
    

    return (
        <>
        <ProfileTopBlock fullname={auth.fullname} department={auth.department} appointment={auth.appointment} avatarurl={avatarurl} />
        
        <div className="row blue-grey lighten-5 z-depth-2">
            <div className="col s3">
                <ProfileMenu />
            </div>

            <div className="col s9 white z-depth-2">
            <FirstFloorInnerContact />
                
            </div>

        </div>
       
        
            
        </>
    )
}