import './DataSection.scss';
import AccountsCard from '../DataCard/AccountsCard';
import TransactionsCard from '../DataCard/TransactionsCard';

const DataSection = () => {
    return (
        <div className = 'data-section'>
            <AccountsCard />
            <TransactionsCard />
        </div>
    );
}
export default DataSection;