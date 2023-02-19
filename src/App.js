/*
** Main App 
** This originated as CMSC495 Final Project
** Date: Jan-Mar 2023
** Authors: Aaron G, Dalton C, Sean H, Chris T
*/
import './App.scss';
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import CashFlow from './pages/CashFlow';
import { Route, Routes } from "react-router-dom";


const App = ({ signOut }) => {
    return (
        <Routes>
            <Route path='/' element={ <Home signOut={signOut} /> } />
            <Route path='/accounts' element={ <Accounts signOut={signOut} /> } />
            <Route path='/transactions' element={ <Transactions signOut={signOut} /> } />
            <Route path='/cash-flow' element={ <CashFlow signOut={signOut} /> } />
        </Routes>
    );
}
export default withAuthenticator(App);
