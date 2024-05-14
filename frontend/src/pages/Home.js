import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        history.push('/');
    };

    return (
        <div className="container">
            <h2>Home</h2>
            <button onClick={handleSignOut}>Sign Out</button>
            <button onClick={() => history.push('/marketplace')}>Marketplace</button>
            <button onClick={() => history.push('/sell')}>Sell</button>
            <button onClick={() => history.push('/add_course')}>Add Course</button>
        </div>
    );
};

export default Home;
