import React, { createContext, useContext, useEffect, useState } from "react";
import { USER_ROLES } from "../constants/AppContants";
import { isEmpty } from "lodash";
import LocalStorage from "../Managers/LocalStorage";
import AuthApi from "../services/APIS/Auth.Api";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}> {children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = LocalStorage.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  //   IsloggedIn
  const isLoggedIn = () => {
    return user !== null;
  };

  const userTitle = () => {
    if (!user || isEmpty(user)) return;

    const roleTitles = {
      [USER_ROLES.ADMIN]: "Admin",
      [USER_ROLES.MANAGER]: "Manager",
      [USER_ROLES.FINANCE]: "Finance Manager",
    };

    return roleTitles[user.roles[0]];
  };

  //   Logout
  const logOut = async () => {
    LocalStorage.removeUser();
    LocalStorage.removeToken();
    LocalStorage.removeVersion();
    setUser(null);
  };

  //   signin
  const signin = async (credentials) => {
    const response = await AuthApi.signIn(credentials);
    if (response.success) {
      setUser(response.user);
      LocalStorage.setUser(response.user);
      LocalStorage.setToken(response.token);
    }

    return { response };
  };

  const signout = () => {
    logOut();
  };

  return {
    user,
    signin,
    signout,
    isLoggedIn,
    userTitle,
  };
}
