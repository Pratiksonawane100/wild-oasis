import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

function Account() {
  return (
    <>
      <div className="text-3xl font-bold mb-8 text-center">
        Update your account
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Update user data section */}
        <div className="mb-8">
          <div className="text-xl font-semibold mb-4 text-center md:text-left">
            Update user data
          </div>
          <UpdateUserDataForm />
          <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4">
            <p className="text-gray-700">User data form goes here.</p>
          </div>
        </div>

        {/* Update password section */}
        <div>
          <div className="text-xl font-semibold mb-4 text-center md:text-left">
            Update password
          </div>
          <UpdatePasswordForm />
          <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4">
            <p className="text-gray-700">Password update form goes here.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
