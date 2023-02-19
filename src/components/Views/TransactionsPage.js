import '../../App.scss';
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
import NewAccountForm from '../MainContent/Modal/NewAccountForm';
import NewTransactionForm from '../MainContent/Modal/NewTransactionForm';
import HeroSection from '../MainContent/HeroSection/HeroSection';
import TotalCards from '../MainContent/TotalCards';
import TransactionsPageCard from '../MainContent/DataCard/TransactionsPageCard'
import './TransactionsPage.scss';

const TransactionsPage = () => {
    const pageTitle = 'Transactions';

    return (
        <div className="transactions-page">
            <HeroSection pageTitle={pageTitle} />
            <TotalCards />
            <div className='divider'></div>
            <div>{  }</div>
            <TransactionsPageCard />
        </div>
    );
}
export default TransactionsPage;