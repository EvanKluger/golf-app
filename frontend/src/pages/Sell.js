import React, { useState, useEffect } from 'react';
import api from '../api';

const Sell = () => {
    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await api.get('/courses');
            setCourses(response.data);
        };

        fetchCourses();
    }, []);

    const handleSell = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await api.post('/sell', { courseId, startTime, endTime, price }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Tee time listed for sale');
        } catch (error) {
            console.error('Error listing tee time:', error);
            setMessage('Listing failed');
        }
    };

    return (
        <div className="container">
            <h2>Sell Tee Time</h2>
            <form onSubmit={handleSell}>
                <div>
                    <label>Course Name:</label>
                    <select value={courseId} onChange={(e) => setCourseId(e.target.value)} required>
                        <option value="" disabled>Select a course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>{course.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Start Time:</label>
                    <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </div>
                <div>
                    <label>End Time:</label>
                    <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <button type="submit">Sell</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Sell;
