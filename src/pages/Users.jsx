import SignupForm from "../features/authentication/SignupForm";

export default function Users() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create new user</h1>
      <div>
        <SignupForm />
      </div>
    </div>
  );
}
