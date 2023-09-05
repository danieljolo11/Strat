import React, { useState, createContext, useMemo, useContext } from "react";

const AuthContext = createContext({});

interface childrenType {
  children: any;
}

interface userDataType {
  email?: string;
  password?: string;
}

interface toOptimizeType {
    token: string | null;
    userData: userDataType;
}

interface memoDataType extends toOptimizeType {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUserData: React.Dispatch<React.SetStateAction<userDataType>>;
}

export const AuthServiceProvider = ({ children }: childrenType) => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<userDataType>({});
  const handleData: memoDataType = {
    token,
    userData,
    setToken,
    setUserData,
  };

  const optimizedData = [token, userData] as toOptimizeType[];
//   const globalValue: memoDataType = handleData;

  return (
    <AuthContext.Provider value={handleData}>{children}</AuthContext.Provider>
  );
};

export default function authorization() {
  return useContext(AuthContext);
}
