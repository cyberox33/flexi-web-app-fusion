import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageEventForm from "../forms/ManageEventForm/ManageEventForm";
import { useAppContext } from "../contexts/AppContext";

const EditEvent = () => {
  const { eventId } = useParams();
  const { showToast } = useAppContext();

  const { data: event } = useQuery(
    "fetchMyEventById",
    () => apiClient.fetchMyEventById(eventId || ""),
    {
      enabled: !!eventId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyEventById, {
    onSuccess: () => {
      showToast({ message: "Event Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Event", type: "ERROR" });
    },
  });

  const handleSave = (eventFormData) => {
    mutate(eventFormData);
  };

  return (
    <ManageEventForm event={event} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditEvent;
