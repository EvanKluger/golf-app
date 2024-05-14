import React, { useEffect, useState } from 'react';
import api from '../api';

const Marketplace = () => {
    const [teeTimes, setTeeTimes] = useState([]);

    useEffect(() => {
        const fetchTeeTimes = async () => {
            const response = await api.get('/marketplace');
            setTeeTimes(response.data);
        };

        fetchTeeTimes();
    }, []);

    return (
        <div className="container">
            <h2>Marketplace</h2>
            <ul>
                {teeTimes.map((teeTime) => (
                    <li key={teeTime.id}>
                        Course: {teeTime.course.name}, Start: {teeTime.start_time}, End: {teeTime.end_time}, Price: ${teeTime.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Marketplace;
