import { useState } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';

const HotelCard = ({ hotel, onClick }) => {
    const [isFavorite, setIsFavorite] = useState(false);
  
    const handleFavorite = (e) => {
      e.stopPropagation();
      setIsFavorite(!isFavorite);
    };
  
    return ( 
      <div 
        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex" 
        onClick={onClick}
      >
        <div className="relative">
          <img 
            src={hotel.image} 
            alt={hotel.name} 
            className="w-full h-48 object-cover"
          />
          <button 
            onClick={handleFavorite}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md"
          >
            <FaHeart className={isFavorite ? 'text-red-500' : 'text-gray-400'} />
          </button>
        </div>
        <div className="p-4 w-full">
          <div className="flex justify-between mb-2 ">
            <div>
            <h3 className="text-lg font-semibold">{hotel.name}</h3>
            </div>
            <div className="flex items-center gap-1 ">
              <span className="text-sm font-bold jus">{hotel.rating}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">{hotel.location}</p>
          <p className="text-xs text-gray-500 mb-2">{hotel.amenities}</p>
          
          <div className="flex items-center gap-1 mb-2 ">
            {[...Array(5)].map((_, index) => (
              <FaStar 
                key={index}
                className={`w-4 h-4 ${
                  index < Math.floor(hotel.rating) 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
  
          <div className="flex flex-col items-end mt-2">
            <div className="text-xs text-gray-500">
              {hotel.nights} nights, {hotel.guests} adults
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">Tsh {hotel.price}</p>
            </div>
          </div>
  
          {hotel.policy && (
            <div className="mt-2">
              <span className="px-2 py-1 text-xs rounded-full bg-red-50 text-red-600">
                {hotel.policy}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

export default HotelCard;