import './SideBar.scss';
import Navigation from './Navigation';
import UserProfile from './UserProfile';

//sidebar with navigation
const SideBar = (props) => {
    return(
        <div className='side-bar'>
            <h1 className='app-name'>Njord</h1>
            <Navigation />
            <UserProfile signOut={props.signOut} />
        </div>
    );
}

export default SideBar;