import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading)
    return <div className="text-center text-gray-600">Loading...</div>;

  function handleUpdate(e, field) {
    const { value } = e.target;

    // Convert to appropriate type if necessary
    const updatedValue = Number(value);

    if (isNaN(updatedValue)) return;

    updateSetting({ [field]: updatedValue });
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Update Settings
      </h2>
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="min-nights" className="text-gray-700 font-medium">
            Minimum nights/booking
          </label>
          <input
            type="number"
            id="min-nights"
            defaultValue={minBookingLength}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "minBookingLength")}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="max-nights" className="text-gray-700 font-medium">
            Maximum nights/booking
          </label>
          <input
            type="number"
            id="max-nights"
            defaultValue={maxBookingLength}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "maxBookingLength")}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="max-guests" className="text-gray-700 font-medium">
            Maximum guests/booking
          </label>
          <input
            type="number"
            id="max-guests"
            defaultValue={maxGuestsPerBooking}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="breakfast-price"
            className="text-gray-700 font-medium"
          >
            Breakfast price
          </label>
          <input
            type="number"
            id="breakfast-price"
            defaultValue={breakfastPrice}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "breakfastPrice")}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateSettingsForm;
