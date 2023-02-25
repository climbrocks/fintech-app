import TotalsCards from "./TotalsCards/TotalsCards";
import './TotalCards.scss'


// all totals for dashboard
const TotalCards = () => {
    const cards = [
        {
            title : 'NET WORTH'
        },
        {
            title : 'CREDIT DEBT'
        },
        {
            title: 'LOAN DEBT'
        },
        {
            title: 'SPENT'
        }

    ]

    return (
        <div className = 'total-cards'>
            <TotalsCards title={ cards[0].title } />
            <TotalsCards title={ cards[1].title }/>
            <TotalsCards title={ cards[2].title }/>
            <TotalsCards title={ cards[3].title }/>
        </div>
    );
}
export default TotalCards;