import { AxiosResponse } from "axios";
import api from "./api_server";

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
