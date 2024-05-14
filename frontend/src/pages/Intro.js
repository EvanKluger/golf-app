import React from 'react';
import { Link } from 'react-router-dom';

const Intro = () => {
    return (
        <div className="container">
            <h2>Welcome to the Golf App</h2>
            <div>
                <Link to="/login"><button>Login</button></Link>
                <Link to="/signup"><button>Signup</button></Link>
            </div>
        </div>
    );
};

export default Intro;
