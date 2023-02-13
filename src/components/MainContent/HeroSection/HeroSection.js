import { useState } from 'react';
import './HeroSection.scss';
import Modal from '../Modal/Modal';


const HeroSection = () => {
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
            <h1 className='page-title'>Users's Dashboard</h1>
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