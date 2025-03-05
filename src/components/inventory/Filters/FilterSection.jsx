import FlightsFilter from "./FlightsFilter";
import HotelsFilter from "./HotelsFilter";
import { FaChevronDown } from "react-icons/fa";

const FilterSection = ({ activeTab }) => {
    const renderFilters = () => {
      switch (activeTab) {
        case 'Flights':
          return (
            <FlightsFilter/>
          );
  
        case 'Hotels':
          return (
            <HotelsFilter/>
          );
  
        case 'Buses':
          return (
            <>
              {/* Bus-specific filters */}
              <div className="border-t pt-4">
                <button className="flex items-center justify-between w-full text-left mb-2">
                  <span className="font-medium">Bus Type</span>
                  <FaChevronDown />
                </button>
              </div>
              <div className="border-t pt-4">
                <button className="flex items-center justify-between w-full text-left mb-2">
                  <span className="font-medium">Departure Time</span>
                  <FaChevronDown />
                </button>
              </div>
            </>
          );
      }
    };
  
    return (
      <div className="">
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
           
          {/* Tab-specific filters */}
          {renderFilters()}
        </div>
      </div>
    );
  };

export default FilterSection;