/*
** Main App 
** This originated as CMSC495 Final Project
** Date: Jan-Mar 2023
** Authors: Aaron G, Dalton C, Sean H, Chris T
*/
import logo from './logo.svg';
import './App.scss';
import SideBar from './components/SideBar/SideBar';
import MainContent from './components/MainContent/MainContent';
import "@aws-amplify/ui-react/styles.css";
import { useState } from 'react';
import { API, Auth } from "aws-amplify";
import {
    Button,
    Flex,
    Heading,
    Text,
    TextField,
    View,
    withAuthenticator,
} from "@aws-amplify/ui-react";
// import Modal from './components/MainContent/Modal/Modal';
// import NewAccountForm from './components/MainContent/Modal/NewAccountForm';
// import NewTransactionForm from './components/MainContent/Modal/NewTransactionForm';
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import CashFlow from './pages/CashFlow';
import { Route, Routes } from "react-router-dom";


const App = ({ signOut }) => {
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
        <Routes>
            <Route path='/' element={ <Home signOut={signOut} /> } />
            <Route path='/accounts' element={ <Accounts signOut={signOut} /> } />
            <Route path='/transactions' element={ <Transactions signOut={signOut} /> } />
            <Route path='/cash-flow' element={ <CashFlow signOut={signOut} /> } />
        </Routes>
        // <div>
        //     <div className='buttons-overlay'>
        //     {openAddAccountModal && <NewAccountForm closeModal={setOpenAddAccountModal} />}
        //     {openAddTransactionModal && <NewTransactionForm closeModal={setOpenAddTransactionModal} />}
        //         <div className='add-buttons'>
        //             <button onClick={clickOpenAccountModal} className='add-account'>Add Account</button>
        //             <button onClick={clickOpenTransactionModal} className='add-transaction'>Add Transaction</button>
        //         </div>
        //     </div>
        //     <div className="App">
        //         <div className='nav-pane'>
        //             <SideBar signOut={signOut} />
        //         </div>
        //         <div className='content-pane'>
        //             <MainContent />
        //         </div>
        //     </div>
        // </div>

    );
}

export default withAuthenticator(App);
