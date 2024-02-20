import React, { useState } from 'react';

function CitySelector() {
    const [selectedCity, setSelectedCity] = useState('Delhi');
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai']; // Example list of cities

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        setIsSelectOpen(false);
    };

    return (
        <div className="mt-2">
            <div className="relative">
                <p
                    className="font-bold text-3xl mx-4 my-2 cursor-pointer"
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                >
                    {selectedCity}
                </p>
                {isSelectOpen && (
                    <select
                        className="absolute top-0 left-0 w-full h-full opacity-100 cursor-pointer bg-white border border-gray-300 rounded shadow-md"
                        value={selectedCity}
                        onChange={handleCityChange}
                    >
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                )}
            </div>
        </div>
    );
}

export default CitySelector;
