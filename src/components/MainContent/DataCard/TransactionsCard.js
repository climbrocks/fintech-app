import './TransactionsCard.scss';
import TransactionsLine from './TransactionsLine';
import AccountsLine from './TransactionsLine';
import "@aws-amplify/ui-react/styles.css";
import {
    Button,
    Flex,
    Heading,
    Text,
    TextField,
    View,
    withAuthenticator,
} from "@aws-amplify/ui-react";

const DataCard = () => {
    return (
        <div className='transactions-card'>
            <div className='title'>
                <p>most recent</p>
                <h2>TRANSACTIONS</h2>
            </div>
            <div className='transactions'>
                <View>
                    <TransactionsLine className='transaction' />
                </View>
            </div>
        </div>
    );
}
export default DataCard;