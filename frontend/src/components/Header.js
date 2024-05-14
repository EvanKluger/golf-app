import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {
    const history = useHistory();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        history.push('/');
    };

    return (
        <header>
            <h1>Golf App</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/marketplace">Marketplace</Link></li>
                    <li><Link to="/sell">Sell</Link></li>
                    <li><Link to="/add_course">Add Course</Link></li>
                    <li><Link to="/my_tee_times">My Tee Times</Link></li>
                    <li><button onClick={handleSignOut}>Sign Out</button></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
