import './AccountsCard.scss';
import AccountsLine from './AccountsLine';
import "@aws-amplify/ui-react/styles.css";
import {
    View,
} from "@aws-amplify/ui-react";

const AccountsCard = () => {
    const accountTypes = [
        'Checking & Savings',
        'Credit Cards',
        'Loans'
    ]

    return (
        <div className = 'accounts-card'>
            <div className = 'title'>
                <p>all</p>
                <h2>ACCOUNTS</h2>
            </div>
            <div className = 'accounts'>
                <View>
                    <AccountsLine classname='account-type' />
                </View>

            </div>
        </div>
    );
}
export default AccountsCard;