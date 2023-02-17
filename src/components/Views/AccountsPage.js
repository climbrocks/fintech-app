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
import AccountsCard from '../MainContent/DataCard/AccountsCard';
import './AccountsPage.scss';

const AccountsPage = () => {
    return (
        <div className="accounts-page">
            <HeroSection />
            <TotalCards />
            <div className='divider'></div>
            <AccountsCard />
        </div>
    );
}
export default AccountsPage;