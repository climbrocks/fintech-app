import './NewAccountForm.scss';

const NewAccountForm = ({ closeModal }) => {
    return (
        <div className='modal-background'>
            <div className='modal-container'>
                <div className='title-container'>
                    <h2>Add Account</h2>
                    <button className='exit-button' onClick={() => closeModal(false)}>X</button>
                </div>
                <form className='new-account-form'>
                    <label>Account Name:</label>
                    <input type="text" placeholder="Navy Federal" />
                    <label>Account Type:</label>
                    <select>
                        <option value="Checking">Checking</option>
                        <option value="Savings">Savings</option>
                        <option value="Credit-Card">Credit Card</option>
                        <option value="Loan">Loan</option>
                    </select>
                    <button className='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}
export default NewAccountForm;