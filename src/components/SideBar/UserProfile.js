import React, { useEffect, useState } from "react";
import { faUserAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Auth } from "aws-amplify";
import './UserProfile.scss';

const UserProfile = (props) => {

    // Constructors to capture logged in users and transactions
    const [userDetails, setUser] = useState([]);

    useEffect(() => {
        fetchUser();
    }, []);

    // Function to fetch user UUID (sub) from AWS Cognito
    async function fetchUser() {
        const user = await Auth.currentAuthenticatedUser();
        const userInfo = { "sub": user.attributes.sub, "username": user.username, "userInitial": user.username.slice(0, 2) };
        setUser(userInfo);
    }


    return (
        // <div className='user-profile'>
        //     <div className='user-initials'>
        //         <h3><FontAwesomeIcon className='icon' icon={faUserAlt} /></h3>
        //     </div>
        //     <div className='user-information'>
        //             <p className='user-name'>@{userDetails.username}</p>
        //             {/* <p className='user-member-since'>Member since 2023</p> */}
        //         </div>
        // </div>
        <div className="user-profile">
            <div className="user-profile-info">
                <div className='user-initials'>
                    <h3><FontAwesomeIcon className='icon' icon={faUserAlt} /></h3>
                </div>
                <div className="user-information">
                    <p className="user-name">{ userDetails.username }</p>
                </div>
            </div>
            <div className="user-sign-out">
                <button onClick = { props.signOut }><FontAwesomeIcon className='icon' icon={faSignOutAlt} /></button>
            </div>
        </div>
    );
}
export default UserProfile;