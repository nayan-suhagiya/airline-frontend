// ContentArea.js
import React from 'react';
import ProfileContent from '../content/Admin/ProfileContent';
import FlightContent from '../content/Admin/FlightContent';
import BookingContent from '../content/Admin/BookingContent';
import UserContent from '../content/Admin/UserContent';
import CityContent from '../content/Admin/CityContent';

const ContentArea = ({ isOpen, selectedLink }) => {
    return (
        <div className={`flex-1 p-8 ${isOpen ? "ml-64" : "ml-0"}`}>
            {selectedLink === 'profile' && <ProfileContent />}
            {selectedLink === 'flight' && <FlightContent />}
            {selectedLink === 'booking' && <BookingContent />}
            {selectedLink === 'user' && <UserContent />}
            {selectedLink === 'city' && <CityContent />}
        </div>
    );
};

export default ContentArea;
