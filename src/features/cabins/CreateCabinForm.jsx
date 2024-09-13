import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function CreateCabinForm({ onCancel, cabinToEdit, onSuccess }) {
  const queryClient = useQueryClient();
  const { id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(editId);

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
      if (onSuccess) onSuccess(); // Close the modal on success
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
      if (onSuccess) onSuccess(); // Close the modal on success
    },
    onError: (err) => toast.error(err.message),
  });

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession
      ? editValues
      : {
          name: "",
          regularPrice: "",
          discount: "",
          maxCapacity: "",
          description: "",
          image: "",
        },
  });
  const { errors, isSubmitting } = formState;

  const isWorking = isCreating || isEditing || isSubmitting;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin({
        newCabinData: {
          ...data,
          image,
        },
        id: editId,
      });
    else createCabin({ ...data, image });
  }

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cabin Name
          </label>
          <input
            type="text"
            id="name"
            disabled={isWorking}
            {...register("name", { required: "This field is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {errors?.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Regular Price
          </label>
          <input
            type="number"
            id="regularPrice"
            disabled={isWorking}
            {...register("regularPrice", {
              required: "This field is required",
              min: { value: 1, message: "Price should be at least 1" },
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {errors?.regularPrice && (
            <p className="text-red-500 text-sm mt-1">
              {errors.regularPrice.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discount
          </label>
          <input
            type="number"
            id="discount"
            disabled={isWorking}
            {...register("discount", {
              validate: (value) =>
                value <= getValues().regularPrice ||
                "Discount should be less than regular price",
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {errors?.discount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.discount.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Maximum Capacity
          </label>
          <input
            type="number"
            id="maxCapacity"
            disabled={isWorking}
            {...register("maxCapacity", {
              required: "This field is required",
              min: { value: 1, message: "Capacity should be at least 1" },
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {errors?.maxCapacity && (
            <p className="text-red-500 text-sm mt-1">
              {errors.maxCapacity.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            disabled={isWorking}
            {...register("description", { required: "This field is required" })}
            rows="4"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {errors?.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Cabin Photo
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            disabled={isWorking}
            {...register("image", {
              required: !isEditSession && "This field is required",
            })}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
          {errors?.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="reset"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
            disabled={isWorking}
          >
            {isEditSession ? "Edit cabin" : "Create cabin"}
          </button>
        </div>
      </form>
    </>
  );
}

CreateCabinForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  cabinToEdit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    maxCapacity: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
  onSuccess: PropTypes.func, // Added this line to include onSuccess
};

export default CreateCabinForm;
