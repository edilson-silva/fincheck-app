import { useCallback, useState, type ReactNode } from "react";
import { DashboardContext } from "./DashboardContext";

interface DashboardContextProviderParams {
  children: ReactNode;
}

export function DashboardProvider({
  children,
}: DashboardContextProviderParams) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);

  return (
    <DashboardContext.Provider
      value={{ areValuesVisible, toggleValuesVisibility }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
