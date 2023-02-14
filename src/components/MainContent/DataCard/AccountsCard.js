import './AccountsCard.scss';
import AccountsLine from './AccountsLine';

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
                <div className = 'account-type'>
                    <h4>{ accountTypes[0] }</h4>
                </div>
                <AccountsLine className = 'account' />
                <AccountsLine className = 'account' />
                <div className = 'account-type'>
                    <h4>{ accountTypes[1] }</h4>
                </div>
                <AccountsLine className = 'account' />
                <AccountsLine className = 'account' />
                <div className = 'account-type'>
                    <h4>{ accountTypes[2] }</h4>
                </div>
                <AccountsLine className = 'account' />
                <AccountsLine className = 'account' />
            </div>
        </div>
    );
}
export default AccountsCard;