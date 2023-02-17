import './SideBar.scss';
import { useState } from 'react';
import NewAccountForm from '../MainContent/Modal/NewAccountForm';
import NewTransactionForm from '../MainContent/Modal/NewTransactionForm';
import { API, Auth } from "aws-amplify";
import Navigation from './Navigation';
import UserProfile from './UserProfile';

const SideBar = (props) => {
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

    return(
        <div className='side-bar'>
            <h1 className='app-name'>Njord</h1>
            <Navigation />
            {openAddAccountModal && <NewAccountForm closeModal={setOpenAddAccountModal} />}
            {openAddTransactionModal && <NewTransactionForm closeModal={setOpenAddTransactionModal} />}
            <UserProfile />
            <button className = 'sign-out' onClick = { props.signOut }>Sign Out</button>
        </div>
    );
}

export default SideBar;