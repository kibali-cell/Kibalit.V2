import { IoIosAirplane } from "react-icons/io";

const FlightCard = ({ flight, onClick }) => {
  return (
    <div className="bg-white p-4 rounded-sm shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <div className="text-lg font-bold">{flight.originCode}</div>
          <div className="text-sm text-gray-600">{flight.originCity}</div>
          <div className="text-sm text-gray-500">{flight.departureTime}</div>
          <div className="text-sm text-gray-600 mt-2">{flight.airline}</div>
        </div>

        <div className="flex-1 flex items-center justify-center h-24">
          <div className="w-full flex items-center justify-center p-12">
            <div className="h-px flex-1 border-t-2 border-dashed border-gray-300"></div>
            <div className="mx-2 text-gray-400">
              <IoIosAirplane className="-rotate-45" />
            </div>
            <div className="h-px flex-1 border-t-2 border-dashed border-gray-300"></div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-lg font-bold">{flight.destinationCode}</div>
          <div className="text-sm text-gray-600">{flight.destinationCity}</div>
          <div className="text-sm text-gray-500">{flight.arrivalTime}</div>
          <div className="flex gap-2 mt-2">
            {flight.hasPolicy && (
              <span className="px-2 py-1 text-xs rounded-full bg-purple-50 text-purple-600 border border-purple-200">
                Policy
              </span>
            )}
            <span className="px-2 py-1 text-xs rounded-full bg-gray-900 text-white">
              Tsh {flight.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;