import { useContext } from "react";
import { DashboardContext } from "../contexts/DashboardContext/DashboardContext";

export function useDashboard() {
  return useContext(DashboardContext);
}
