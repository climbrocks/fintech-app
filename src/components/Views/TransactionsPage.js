import '../../App.scss';
import "@aws-amplify/ui-react/styles.css";
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