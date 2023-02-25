import './TransactionsPageCard.scss';
import TransactionsPageLine from './TransactionsPageLine';
import "@aws-amplify/ui-react/styles.css";
import {
    View,
} from "@aws-amplify/ui-react";

//displays transactions
const DataCard = () => {
    return (
        <div className='transactions-page-card'>
            <div className='title'>
                <p>most recent</p>
                <h2>TRANSACTIONS</h2>
            </div>
            <div className='transactions'>
                <div className='transactions-page-card-titles'>
                    <p>Type</p>
                    <p>Description</p>
                    <p>Account</p>
                    <p>Date</p>
                    <p>Amount</p>
                    <p></p>
                </div>
                <View>
                    <TransactionsPageLine className='transaction' />
                </View>
            </div>
        </div>
    );
}
export default DataCard;