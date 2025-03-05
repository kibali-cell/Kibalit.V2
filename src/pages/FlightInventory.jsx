import SearchForm from '../components/inventory/SearchForm/SearchForm';
import FlightList from '../components/inventory/FlightList/FlightList';
import FilterSection from '../components/inventory/Filters/FilterSection';
import Navbar from '../components/navbar/Navbar';

const FlightInventory = ({ isVisible, onClose, activeTab, setActiveTab }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <Navbar  />
      <div>
        <SearchForm activeTab={activeTab} setActiveTab={setActiveTab} onClose={onClose}/>
      </div>

      <div className="flex p-10 bg-appBg w-full gap-10">
        <div className='w-1/3'>
          <FilterSection activeTab={activeTab} />
          </div>
        <div className="w-2/3">
          <FlightList activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default FlightInventory;