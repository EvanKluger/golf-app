import React, { useEffect, useState } from 'react';
import api from '../api';

const MyTeeTimes = () => {
    const [teeTimes, setTeeTimes] = useState([]);

    useEffect(() => {
        const fetchTeeTimes = async () => {
            const token = localStorage.getItem('token');
            const response = await api.get('/my_tee_times', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTeeTimes(response.data);
        };

        fetchTeeTimes();
    }, []);

    return (
        <div className="container">
            <h2>My Tee Times</h2>
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

export default MyTeeTimes;
