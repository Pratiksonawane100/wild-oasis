import { useUser } from "./useUser";

function useAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;

  return (
    <div className="flex items-center space-x-4 p-2 bg-gray-100 rounded-lg shadow-sm w-fit">
      <img
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
        className="w-10 h-10 object-cover rounded-full" // Adjust the class for desired styling
      />
      <span className="text-lg font-medium text-gray-700">{fullName}</span>
    </div>
  );
}

export default useAvatar;
