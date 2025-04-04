// hooks/useRoles.ts
import { useQuery } from "@tanstack/react-query";
import AuthServices from "../services/auth.service";

const authService = new AuthServices();

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => authService.getAllRoles(),
    staleTime: 1000 * 60 * 5, // optional: cache for 5 mins
  });
};
