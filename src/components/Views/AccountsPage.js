import '../../App.scss';
import "@aws-amplify/ui-react/styles.css";
import HeroSection from '../MainContent/HeroSection/HeroSection';
import TotalCards from '../MainContent/TotalCards';
import AccountsCard from '../MainContent/DataCard/AccountsCard';
import './AccountsPage.scss';

const AccountsPage = () => {
    const pageTitle = 'Accounts';

    return (
        <div className="accounts-page">
            <HeroSection pageTitle={pageTitle} />
            <div className='main-view'>
                <AccountsCard />
                <TotalCards />
            </div>
        </div>
    );
}
export default AccountsPage;