import { useQuery } from "@tanstack/react-query";
import { getUser } from "../lib/api";

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });