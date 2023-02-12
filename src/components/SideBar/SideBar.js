import './SideBar.scss';
import { API, Auth } from "aws-amplify";
import Navigation from './Navigation';
import UserProfile from './UserProfile';

const SideBar = (props) => {
    return(
        <div className='side-bar'>
            <h1 className='app-name'>Njord</h1>
            <Navigation />
            <UserProfile />
            <button className = 'sign-out' onClick = { props.signOut }>Sign Out</button>
        </div>
    );
}

export default SideBar;