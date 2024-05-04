import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney} from "react-icons/bi";

const MyEvents = () => {
  const { data: eventData } = useQuery(
    "fetchMyEvents",
    apiClient.fetchMyEvents,
    {
      onError: () => {},
    }
  );

  if (!eventData) {
    return <span>No Events found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold font-poppins">My Events</h1>
        <Link
          to="/add-event"
          className="flex bg-[#BF6BAD] text-white text-xl font-bold p-2 hover:bg-black"
        >
          Add Event
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {eventData.map((event) => (
          <div
            data-testid="event-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{event.name}</h2>
            <div className="whitespace-pre-line">{event.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {event.city}, {event.location}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {event.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />INR {event.entryFee} per day
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {event.guestCount} guests
              </div>
             
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-event/${event._id}`}
                className="flex bg-[#BF6BAD] text-white text-xl font-bold p-2 hover:bg-black"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
