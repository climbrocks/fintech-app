import './TransactionsCard.scss';
import TransactionsLine from './TransactionsLine';
import "@aws-amplify/ui-react/styles.css";
import { View } from "@aws-amplify/ui-react";

const DataCard = () => {
    return (
        <div className='transactions-card'>
            <div className='title'>
                <p>most recent</p>
                <h2>TRANSACTIONS</h2>
            </div>
            <div className='transactions-dashboard'>
                <View>
                    <TransactionsLine className='transaction' />
                </View>
            </div>
        </div>
    );
}
export default DataCard;