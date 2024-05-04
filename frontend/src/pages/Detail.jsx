import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {
  const { eventId } = useParams();

  const { data: event } = useQuery(
    "fetchEventById",
    () => apiClient.fetchEventById(eventId || ""),
    {
      enabled: !!eventId,
    }
  );

  if (!event) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-poppins">{event.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {event.imageUrls.map((image) => (
          <div className="h-[300px]">
            <img
              src={image}
              alt={event.name}
              className=" rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
         <GuestInfoForm
            entryFee={event.entryFee}
            eventId={event._id}
          />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{event.description}</div>
        
      </div>
    </div>
  );
};

export default Detail;
