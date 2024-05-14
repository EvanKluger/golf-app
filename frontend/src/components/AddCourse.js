import React, { useState } from 'react';
import api from '../api';

const AddCourse = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/add_course', { name, location });
            setMessage('Course added successfully');
        } catch (error) {
            console.error('Error adding course:', error);
            setMessage('Failed to add course');
        }
    };

    return (
        <div className="container">
            <h2>Add Course</h2>
            <form onSubmit={handleAddCourse}>
                <div>
                    <label>Course Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Location:</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
                <button type="submit">Add Course</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddCourse;
