import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <div className="flex flex-col">
        <label
          htmlFor="fullName"
          className="font-semibold text-gray-700 text-sm mb-2"
        >
          Full name
        </label>
        <input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
          className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors?.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="font-semibold text-gray-700 text-sm mb-2"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
          className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors?.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="font-semibold text-gray-700 text-sm mb-2"
        >
          Password (min 8 characters)
        </label>
        <input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
          className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors?.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="passwordConfirm"
          className="font-semibold text-gray-700 text-sm mb-2"
        >
          Repeat password
        </label>
        <input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
          className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors?.passwordConfirm && (
          <p className="text-red-500 text-sm mt-1">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          type="reset"
          disabled={isLoading}
          onClick={reset}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create new user
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
