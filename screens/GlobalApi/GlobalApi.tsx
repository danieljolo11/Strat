import React, { useState } from "react";
import { useEffect } from "react";
import { routesGetApi } from "../../api/api_routes";
import { AxiosResponse } from "axios";

interface userType {
  _id: string;
  createdAt: string;
  email: string;
  password: string;
  updatedAt: string;
}

interface requestResponse {
  data: {};
  status: any;
}

export const getUserAction = () => {
  const [userList, setUserList] = useState<userType[]>();

  const getUserDataAction = async (): Promise<void> => {
    const url: string = "/user";
    const response: AxiosResponse<any, any> | requestResponse =
      await routesGetApi(url);

    if (response.status === 200) return setUserList(response.data);
  };

  useEffect(() => {
    getUserDataAction();
  }, []);

  return { userList };
};
