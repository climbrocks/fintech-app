import React, {useEffect, useState} from "react";
import {Auth} from "aws-amplify";
import './UserProfile.scss';

const UserProfile = () => {

    // Constructors to capture logged in users and transactions
    const [userDetails, setUser] = useState([]);

    useEffect(() => {
        fetchUser();
    }, []);

    // Function to fetch user UUID (sub) from AWS Cognito
    async function fetchUser() {
        const user = await Auth.currentAuthenticatedUser();
        const userInfo = {"sub":user.attributes.sub, "username":user.username, "userInitial":user.username.slice(0, 2)};
        setUser(userInfo);
    }


    return (
        <div className='user-profile'>
            <div className='user-initials'>
                <h2>{userDetails.userInitial}</h2>
            </div>
            <div className='user-information'>
                    <p className='user-name'>{userDetails.username}</p>
                    <p className='user-member-since'>Member since 2023</p>
                </div>
        </div>
    );
}
export default UserProfile;