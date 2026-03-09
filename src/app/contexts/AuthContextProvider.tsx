import { useCallback, useState, type ReactNode } from "react";
import { Constants } from "../config/constants";
import { StorageUtil } from "../utils/storage";
import { AuthContext } from "./AuthContext";

interface AuthProviderParams {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthProviderParams) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = StorageUtil.getItem(Constants.ACCESS_TOKEN);

    return !!storedAccessToken;
  });

  const signin = useCallback((accessToken: string) => {
    StorageUtil.setItem(Constants.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn, signin }}>
      {children}
    </AuthContext.Provider>
  );
}
