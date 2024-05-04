import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import EventTypesFilter from "../components/EventTypesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState(1);
  const [selectedEventTypes, setSelectedEventTypes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState();
  const [sortOption, setSortOption] = useState("");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    guestCount: search.guestCount.toString(),
    page: page.toString(),
    types: selectedEventTypes,
    maxPrice: selectedPrice ? selectedPrice.toString() : undefined,
    sortOption,
  };

  const { data: eventData } = useQuery(["searchEvents", searchParams], () =>
    apiClient.searchEvents(searchParams)
  );

  const handleEventTypeChange = (event) => {
    const eventType = event.target.value;

    setSelectedEventTypes((prevEventTypes) =>
      event.target.checked
        ? [...prevEventTypes, eventType]
        : prevEventTypes.filter((event) => event !== eventType)
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <EventTypesFilter
            selectedEventTypes={selectedEventTypes}
            onChange={handleEventTypeChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {eventData?.pagination.total} Events found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="entryFeeAsc">
              Entry Fee (low to high)
            </option>
            <option value="entryFeeDesc">
              Entry Fee (high to low)
            </option>
          </select>
        </div>
        {eventData?.data.map((event) => (
          <SearchResultsCard key={event.id} event={event} />
        ))}
        <div>
          <Pagination
            page={eventData?.pagination.page || 1}
            pages={eventData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
