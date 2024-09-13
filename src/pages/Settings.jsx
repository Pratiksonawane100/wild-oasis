import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Update hotel settings
      </h1>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <UpdateSettingsForm />
      </div>
    </div>
  );
}
