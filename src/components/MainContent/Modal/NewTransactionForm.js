import './NewTransactionForm.scss';

const NewTransactionForm = ({ closeModal }) => {
    return (
        <div className='modal-background'>
            <div className='modal-container'>
                <div className='title-container'>
                    <h2>Add Transaction</h2>
                    <button className='exit-button' onClick={() => closeModal(false)}>X</button>
                </div>
                <form className='new-transaction-form'>
                    <label>Transaction Name:</label>
                    <input type="text" placeholder="Apple Store" />
                    <label>Transaction Value:</label>
                    <input type="number" />
                    <label>Transaction Type:</label>
                    <select>
                        <option value="Debit">Debit</option>
                        <option value="Credit">Credit</option>
                    </select>
                    <label>For Account:</label>
                    <select>
                        <option value="Navy-Federal">Navy Federal</option>
                        <option value="Wells-Fargo">Wells-Fargo</option>
                    </select>
                    <button className='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}
export default NewTransactionForm;