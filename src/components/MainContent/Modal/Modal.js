import './Modal.scss';

const Modal = ({ closeModal }) => {
    return (
        <div className='modal-background'>
            <div className='modal-container'>
                <div className='title-container'>
                    <h2>Add Account</h2>
                    <button className='exit-button' onClick={() => closeModal(false)}>X</button>
                </div>
            </div>
        </div>
    );
}
export default Modal;