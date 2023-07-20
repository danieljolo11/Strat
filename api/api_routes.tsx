import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api_server";

const headerAuth = (token?: string | null) => {
  return {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
};

export const routesPostApi = async (routeName: string, params: any) => {
  const token = await AsyncStorage.getItem("token");
  return api
    .post(routeName, params, headerAuth(token))
    .then((res) => {
      return res;
    })
    .catch((err) => {
      const status = err.response.status;
      return {
        data: {},
        status,
      };
    });
};

export const routesGetApi = async (routeName: string) => {
  const token = await AsyncStorage.getItem("token");
  return api
    .get(routeName, headerAuth(token))
    .then((response) => {
      return response;
    })
    .catch((err) => {
      const response = {
        data: {},
        status: err.response.status,
      };
      return response;
    });
};
