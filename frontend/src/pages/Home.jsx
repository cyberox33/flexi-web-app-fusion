import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LastestDestinationCard";

const Home = () => {
  const { data: events } = useQuery("fetchQuery", () =>
    apiClient.fetchEvents()
  );

  const topRowEvents = events?.slice(0, 2) || [];
  const bottomRowEvents = events?.slice(2) || [];

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold font-poppins">Latest Events</h2>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowEvents.map((event) => (
            <LatestDestinationCard event={event} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowEvents.map((event) => (
            <LatestDestinationCard event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
