import '../App.scss';
import SideBar from '../components/SideBar/SideBar';
import "@aws-amplify/ui-react/styles.css";
import { useState } from 'react';
import NewAccountForm from '../components/MainContent/Modal/NewAccountForm';
import NewTransactionForm from '../components/MainContent/Modal/NewTransactionForm';
import TransactionsPage from '../components/Views/TransactionsPage';

const Transactions = ( {signOut} ) => {
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
        <div className='transactions-view'>
            <div className='buttons-overlay'>
            {openAddAccountModal && <NewAccountForm closeModal={setOpenAddAccountModal} />}
            {openAddTransactionModal && <NewTransactionForm closeModal={setOpenAddTransactionModal} />}
                <div className='add-buttons'>
                    <button onClick={clickOpenAccountModal} className='add-account'>Add Account</button>
                    <button onClick={clickOpenTransactionModal} className='add-transaction'>Add Transaction</button>
                </div>
            </div>
            <div className="App">
                <div className='nav-pane'>
                    <SideBar signOut={signOut} />
                </div>
                <div className='content-pane'>
                    <TransactionsPage />
                </div>
            </div>
        </div>
    );
}
export default Transactions;