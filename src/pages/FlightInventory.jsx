// import React from 'react';
// import SearchForm from '../components/inventory/SearchForm/SearchForm';
// import FlightList from '../components/inventory/FlightList/FlightList';
// import FilterSection from '../components/inventory/Filters/FilterSection';
// import Navbar from '../components/navbar/Navbar';

// const FlightInventory = ({ isVisible, onClose, activeTab, setActiveTab, hotels, setShowInventory }) => {
//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-white z-50 overflow-auto">
//       <Navbar />
//       <div>
//         {/* Optional: You can allow re-searching via SearchForm */}
//         {/* <SearchForm 
//           activeTab={activeTab} 
//           setActiveTab={setActiveTab} 
//           onClose={onClose}

//           onHotelsFetched={(data) => {
//             // You can update hotels here if needed
            
//           }}
//         /> */}
//         <SearchForm
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           onClose={onClose}
//           onHotelsFetched={(data) => { /* update hotels state */ }}
//           setShowInventory={setShowInventory} // This must be a function!
//         />

//       </div>

//       <div className="flex p-10 bg-appBg w-full gap-10">
//         <div className="w-1/3">
//           <FilterSection activeTab={activeTab} />
//         </div>
//         <div className="w-2/3">
//           <FlightList activeTab={activeTab} hotelsData={hotels} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlightInventory;

import React, { useState } from 'react';
// import TravelForm from '../components/TravelForm'; // Make sure this path is correct

import FlightList from '../components/inventory/FlightList/FlightList';
import FilterSection from '../components/inventory/Filters/FilterSection';
import Navbar from '../components/navbar/Navbar';
import TravelForm from '../components/inventory/SearchForm/SearchForm';



  const FlightInventory = ({ isVisible, onClose, initialHotelsData }) => {
    const [activeTab, setActiveTab] = useState('Hotels');
    const [hotels, setHotels] = useState(initialHotelsData || []);
    const [showInventory, setShowInventory] = useState(!!initialHotelsData);
  
    // Reset state when receiving new initial data
    React.useEffect(() => {
      if (initialHotelsData) {
        setHotels(initialHotelsData);
        setShowInventory(true);
      }
    }, [initialHotelsData]);
  

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <Navbar />
      <TravelForm
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onClose={onClose}
        onHotelsFetched={(data) => setHotels(data)}
        setShowInventory={setShowInventory}
      />

      {showInventory && (
        <div className="flex p-10 bg-appBg w-full gap-10">
          <div className="w-1/3">
            <FilterSection activeTab={activeTab} />
          </div>
          <div className="w-2/3">
            <FlightList activeTab={activeTab} hotelsData={hotels} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightInventory;