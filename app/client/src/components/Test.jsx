// src/FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const Test = () => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Vui lòng chọn file để upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setStatus('');
            const response = await axios.post('/upload', formData, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                },
            });
            setStatus('Upload thành công!');
        } catch (error) {
            setStatus('Upload thất bại.');
        }
    };

    return (
        <div>
            <h1>Upload File</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <div style={{ width: '100%', backgroundColor: '#f3f3f3', marginTop: '10px' }}>
                <div style={{
                    width: `${progress}%`,
                    height: '30px',
                    backgroundColor: '#4caf50',
                    textAlign: 'center',
                    lineHeight: '30px',
                    color: 'white',
                }}>
                    {progress}%
                </div>
            </div>
            <div>{status}</div>
        </div>
    );
};

export default Test;
