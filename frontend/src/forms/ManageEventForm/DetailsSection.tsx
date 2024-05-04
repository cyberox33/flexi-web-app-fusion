import { useFormContext } from "react-hook-form";
import { EventFormData } from "./ManageEventForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<EventFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Event</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name", { required: "This field is required" })}
        ></input>
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("city", { required: "This field is required" })}
          ></input>
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Location
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("location", { required: "This field is required" })}
          ></input>
          {errors.location && (
            <span className="text-red-500">{errors.location.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Entry Fee
        <input
          type="number"
          min={0}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("entryFee", { required: "This field is required" })}
        ></input>
        {errors.entryFee && (
          <span className="text-red-500">{errors.entryFee.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
