import { AxiosResponse } from "axios";
import api from "./api_server";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorageValue } from "./global_script";
import authorization from "../services/auth_service";

export interface responseObject<T> {
  data: T;
  status: 200 | 404 | 422 | 500;
}

export type ResponseType<T> = responseObject<T> | AxiosResponse<T, any>;

const headerAuth = (token: string | null) => {
  return {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
};

export const routesPostApi = async (routeName: string, params: any) => {
  return await api
    .post(routeName, params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      const status = err?.response?.status;
      return {
        data: {},
        status,
      };
    });
};

export const routesGetApi = async (routeName: string) => {
  return await api
    .get(routeName)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      const status = err?.response?.status;
      return {
        data: {},
        status,
      };
    });
};

export const routesPostApiAuth = async (routeName: string, params: any) => {
  const token = await getStorageValue("userToken");

  if (token)
    return await api
      .post(routeName, params, headerAuth(token))
      .then((res) => {
        return res;
      })
      .catch((err) => {
        const status = err?.response?.status;
        return {
          data: {},
          status,
        };
      });
};

export const routesGetApiAuth = async (routeName: string) => {
  const token = await getStorageValue("userToken");

  if (token)
    return await api
      .get(routeName, headerAuth(token))
      .then((res) => {
        return res;
      })
      .catch((err) => {
        const status = err?.response?.status;
        return {
          data: {},
          status,
        };
      });
};
