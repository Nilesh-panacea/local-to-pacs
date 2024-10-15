import axios from 'axios';
import React from 'react'

const UpdateStudies = () => {
    const handleClick = async (event) => {
        event.preventDefault();
        const response = await axios.post("/api/studies");
        console.log(response);
    }
    return (
        <div>
            <button className='text-xl font-bold text-white py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 duration-150 g' onClick={handleClick}>Update Studies</button>
        </div>
    )
}

export default UpdateStudies