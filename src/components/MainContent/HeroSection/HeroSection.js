import React, {useEffect, useState} from "react";
import {Auth} from "aws-amplify"
import './HeroSection.scss';
import Modal from '../Modal/Modal';


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


    // Add Acount Button
    const [openAddAccountModal, setOpenAddAccountModal] = useState(false);
    const clickOpenAccountModal = () => {
        setOpenAddAccountModal(true);
    }

    // Add Transaction Button
    const [openAddTransactionModal, setOpenAddTransactionModal] = useState(false);
    const clickOpenTransactionModal = () => {
        setOpenAddTransactionModal(true);
    }

    return (
        <div className='hero-section'>
            <h1 className='page-title'>{userDetails.username}'s { props.pageTitle }</h1>
            <div className='hero-buttons'>
                {/* <button onClick={clickOpenAccountModal} className='add-account'>Add Account</button>
                {openAddAccountModal && <Modal closeModal={setOpenAddAccountModal} />}
                <button onClick={clickOpenTransactionModal} className='add-transaction'>Add Transaction</button>
                {openAddTransactionModal && <Modal closeModal={setOpenAddTransactionModal} />} */}
            </div>
        </div>
    );
}
export default HeroSection;