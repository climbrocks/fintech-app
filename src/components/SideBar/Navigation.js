import { HomeFilled, BankFilled, AreaChartOutlined } from '@ant-design/icons'
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => {
    // TODO: 
    //      ANCHOR ICONS
    return (
        <div>
            <ul>
                <li>
                    <Link to="/"><HomeFilled className='icon' />Dashboard</Link>
                </li>
                <li>
                    <Link to="/accounts"><BankFilled className='icon' />Accounts</Link>
                </li>
                <li>
                    <Link to="/transactions"><FontAwesomeIcon className='icon' icon={faMoneyBill1Wave} />Transactions</Link>
                </li>
                <li>
                    <Link to="/cash-flow"><AreaChartOutlined className='icon' />Cash Flow</Link>
                </li>
            </ul>
        </div>
    );
}

export default Navigation;