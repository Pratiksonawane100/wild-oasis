import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Rename the mutation function to avoid conflict with the logoutApi import
  const { mutate: handleLogout, isLoading } = useMutation({
    mutationFn: logoutApi, // Use the API function here
    onSuccess: () => {
      queryClient.removeQueries(); // Removes cached queries (e.g., user data)
      navigate("/login", { replace: true }); // Redirect to login after logout
    },
  });

  return { logout: handleLogout, isLoading }; // Return handleLogout as logout
}
