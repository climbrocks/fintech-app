import './TotalsCards.scss'

const TotalsCards = (props) => {

    return (
        <div className='totals-card'>
            <div className="title">
                <p>Total</p>
                <h2>{ props.title }</h2>
            </div>
            <h2 className = 'amount'>$99,999</h2>
        </div>
    );
};
export default TotalsCards;