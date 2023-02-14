import HeroSection from './HeroSection/HeroSection';
import TotalCards from './TotalCards';
import DataSection from './DataSection/DataSection';
import './MainContent.scss';

const MainContent = () => {
    return (
        <div className='main-content'>
            <HeroSection />
            <TotalCards />
            <div className='divider'></div>
            <DataSection />
        </div>
    );
}
export default MainContent;