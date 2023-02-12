import './HeroSection.scss';

const HeroSection = () => {
    return (
        <div className='hero-section'>
            <h1 className='page-title'>Dalton's Dashboard</h1>
            <div className='hero-buttons'>
                <button className='add-account'>Add Account</button>
                <button className='add-transaction'>Add Transaction</button>
            </div>
        </div>
    );
}
export default HeroSection;