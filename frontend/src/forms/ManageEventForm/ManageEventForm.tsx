import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { EventType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type EventFormData = {
  name: string;
  city: string;
  location: string;
  description: string;
  type: string;
  entryFee: number;
  imageFiles: FileList;
  imageUrls: string[];
  guestCount: number;
};

type Props = {
  event?: EventType;
  onSave: (eventFormData: FormData) => void;
  isLoading: boolean;
};

const ManageEventForm = ({ onSave, isLoading, event }: Props) => {
  const formMethods = useForm<EventFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(event);
  }, [event, reset]);

  const onSubmit = handleSubmit((formDataJson: EventFormData) => {
    const formData = new FormData();
    if (event) {
      formData.append("eventId", event._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("location", formDataJson.location);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("entryFee", formDataJson.entryFee.toString());
    formData.append("guestCount", formDataJson.guestCount.toString());

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageEventForm;
