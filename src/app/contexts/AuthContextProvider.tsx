import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import { SplashScreen } from "../../view/components/SplashScreen";
import { Constants } from "../config/constants";
import { queryClient } from "../services/queryClient";
import { usersService } from "../services/usersService";
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

  const signout = useCallback(() => {
    StorageUtil.removeItem(Constants.ACCESS_TOKEN);

    setSignedIn(false);
  }, []);

  const { isError, isFetching, isSuccess } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Sua sessão expirou!");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      signout();
      queryClient.clear();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: signedIn && isSuccess,
        signin,
        signout,
      }}
    >
      <SplashScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
}
