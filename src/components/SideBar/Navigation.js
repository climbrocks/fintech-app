import { HomeFilled, BankFilled, AreaChartOutlined } from '@ant-design/icons'
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navigation.scss';

const Navigation = () => {
    // TODO: 
    //      ANCHOR ICONS
    return (
        <div>
            <ul>
                <li>
                    <a href=""><HomeFilled className='icon' />Dashboard</a>
                </li>
                <li>
                    <a href=""><BankFilled className='icon' />Accounts</a>
                </li>
                <li>
                    <a href=""><FontAwesomeIcon className='icon' icon={faMoneyBill1Wave} />Transactions</a>
                </li>
                <li>
                    <a href=""><AreaChartOutlined className='icon' />Cash Flow</a>
                </li>
            </ul>
        </div>
    );
}

export default Navigation;