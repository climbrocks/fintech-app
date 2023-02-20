import '../../App.scss';
import "@aws-amplify/ui-react/styles.css";
import HeroSection from '../MainContent/HeroSection/HeroSection';
import TotalCards from '../MainContent/TotalCards';
import CashFlowChart from '../CashFlowChart/CashFlowChart.tsx';
import './CashFlowPage.scss';

const CashFlowPage = () => {
    const pageTitle = 'Cash Flow';

    return (
        <div className="cash-flow-page">
            <HeroSection pageTitle={pageTitle} />
            <TotalCards />
            <div className='divider'></div>
            <div className='cash-flow-chart'>
                <CashFlowChart />
            </div>
        </div>
    );
}
export default CashFlowPage;