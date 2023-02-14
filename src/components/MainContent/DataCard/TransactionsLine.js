import './TransactionsLine.scss';

const TransactionsLine = () => {
    return (
        <div className = 'transactions-line'>
            <h5 className = 'transactions-title'>Navy Federal</h5>
            <h5 className = 'transactions-type'>Debit</h5>
            <h5 className = 'transactions-amount'>$700.00</h5>
        </div>
    );
};
export default TransactionsLine;