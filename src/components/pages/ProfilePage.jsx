import React, { useContext, useState } from 'react'
import { Navigate, Link, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext'
import axios from 'axios'
import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';

const ProfilePage = () => {
    const { ready, user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    
    let { subpage } = useParams();
    subpage === undefined && (subpage = 'profile');
    
    
    
    async function logout() {
        await axios.get('/logout');
        setUser(null);
        setRedirect('/');
    }
    
    if (!ready) {
        // console.log(ready);
        return <>Loading...</>
    }

    if (ready && !user && !redirect) {
        return (<Navigate to='/login' />)
    }
   

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
           <AccountNav />  
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto mt-20'>
                    Logged in as {user.name} ({user.email})<br />
                    <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
                </div>
            )}

            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    )
}

export default ProfilePage