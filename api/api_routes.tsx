import api from "./api_server";

export const routesPostApi = async (routeName: string, params: any) => {
  return api
    .post(routeName, params)
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
