import HeroSection from './HeroSection/HeroSection';
import TotalCards from './TotalCards';
import DataSection from './DataSection/DataSection';
import './MainContent.scss';


// main display
const MainContent = () => {
    const pageTitle = 'Dashboard';

    return (
        <div className='main-content'>
            <HeroSection pageTitle={pageTitle} />
            <TotalCards />
            <div className='divider'></div>
            <DataSection />
        </div>
    );
}
export default MainContent;