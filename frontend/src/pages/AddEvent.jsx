import { useMutation } from "react-query";
import ManageEventForm from "../forms/ManageEventForm/ManageEventForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddEvent = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyEvent, {
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

  return <ManageEventForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddEvent;
