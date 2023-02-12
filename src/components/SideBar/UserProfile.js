import './UserProfile.scss';

const UserProfile = () => {
    return (
        <div className='user-profile'>
            <div className='user-initials'>
                <h2>DJ</h2>
            </div>
            <div className='user-information'>
                    <p className='user-name'>Dalton Casey</p>
                    <p className='user-member-since'>Member since 2023</p>
                </div>
        </div>
    );
}
export default UserProfile;