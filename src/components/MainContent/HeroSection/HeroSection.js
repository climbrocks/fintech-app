import React, {useEffect, useState} from "react";
import {Auth} from "aws-amplify"
import './HeroSection.scss';

const HeroSection = (props) => {

    // Constructors to capture logged in users and transactions
    const [userDetails, setUser] = useState([]);
    const [show, setShow] = useState(false);


    useEffect(() => {
        fetchUser();
    }, []);

    // Function to fetch user UUID (sub) from AWS Cognito
    async function fetchUser() {
        const user = await Auth.currentAuthenticatedUser();
        const userInfo = {"sub":user.attributes.sub, "username":user.username, "userInitial":user.username.slice(0, 1)};
        setUser(userInfo);
    }

    return (
        <div className='hero-section'>
            <h1 className='page-title'>{userDetails.username}'s { props.pageTitle }</h1>
            <div className='hero-buttons'>
            </div>
        </div>
    );
}
export default HeroSection;