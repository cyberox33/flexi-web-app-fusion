import { Link } from "react-router-dom";
import { EventType } from "../../../backend/src/shared/types";

type Props = {
  event: EventType;
};

const SearchResultsCard = ({ event }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={event.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="ml-1 text-sm">{event.type}</span>
          </div>
          <Link
            to={`/detail/${event._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {event.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-4">{event.description}</div>
        </div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">INR {event.entryFee} per day</span>
            <Link
              to={`/detail/${event._id}`}
              className="bg-blue-600 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-blue-500"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
