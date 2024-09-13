import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      console.error("Error creating cabin:", error);
    },
  });

  return {
    createCabin: (newCabin) => mutate(newCabin),
    isCreating: isLoading,
  };
}
