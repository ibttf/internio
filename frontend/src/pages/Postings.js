import React from 'react';
import Filter from '../components/Filter';
const Postings = () => {
    return (
        <div className="px-24 mx-auto">
            <h1 className="text-5xl font-bold my-4">
                Current Openings
            </h1>
            <Filter />
        </div>
    );
}

export default Postings;
