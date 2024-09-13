import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 bg-white rounded-lg shadow-md"
    >
      <div className="form-row">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          New password (min 8 chars)
        </label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            errors?.password ? "border-red-500" : ""
          }`}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
        {errors?.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div className="form-row">
        <label
          htmlFor="passwordConfirm"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm password
        </label>
        <input
          type="password"
          id="passwordConfirm"
          autoComplete="new-password"
          disabled={isUpdating}
          className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            errors?.passwordConfirm ? "border-red-500" : ""
          }`}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
        {errors?.passwordConfirm && (
          <p className="mt-2 text-sm text-red-600">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={reset}
          disabled={isUpdating}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUpdating}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update password
        </button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
