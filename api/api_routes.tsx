import { AxiosResponse } from 'axios';
import api from "./api_server";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorageValue } from './global_script';

export interface responseObject<T> {
  data: T;
  status: 200 | 404 | 422 | 500;
}

export type ResponseType<T> = responseObject<T> |  AxiosResponse<T, any>
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwiX2lkIjoiaW5pdCIsImNyZWF0ZWRBdCI6ImluaXQiLCJ1cGRhdGVkQXQiOiJpbml0IiwiX192IjoiaW5pdCJ9LCJzdGF0ZXMiOnsicmVxdWlyZSI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwidXBkYXRlZEF0Ijp0cnVlLCJfX3YiOnRydWV9fX0sInNraXBJZCI6dHJ1ZX0sIiRpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX2lkIjoiNjRiYTFkODhkOTY0NjY3OGZkOGRlYmFmIiwiZW1haWwiOiJvbmVAb25lLmNvbSIsInBhc3N3b3JkIjoiMTIzIiwiY3JlYXRlZEF0IjoiMjAyMy0wNy0yMVQwNTo1NDoxNi40MzNaIiwidXBkYXRlZEF0IjoiMjAyMy0wNy0yMVQwNTo1NDoxNi40MzNaIiwiX192IjowfSwiaWF0IjoxNjkzMjg4NDg0LCJleHAiOjE2OTUwMTY0ODR9.oj4aY1-ORhYp_RQis9tDAhiOQ5catX9RsLnNPLIWXKo";

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
  // const token = await getStorageValue("token");
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
  // const token = await getStorageValue("token");

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
