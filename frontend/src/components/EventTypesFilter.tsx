import { eventTypes } from "../config/event-options-config";

type Props = {
  selectedEventTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const EventTypesFilter = ({ selectedEventTypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Event Type</h4>
      {eventTypes.map((eventType) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={eventType}
            checked={selectedEventTypes.includes(eventType)}
            onChange={onChange}
          />
          <span>{eventType}</span>
        </label>
      ))}
    </div>
  );
};

export default EventTypesFilter;
