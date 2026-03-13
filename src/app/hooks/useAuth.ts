import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

export function useAuth() {
  return useContext(AuthContext);
}
