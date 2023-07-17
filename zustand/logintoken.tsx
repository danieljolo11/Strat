import { create } from "zustand";

interface TokenInterface {
  token?: string;
}

const tokenObject = {
  token: "",
} as TokenInterface;

const fetchTokenData = (set: any, token: string) => {
  return set({ token });
};

const TokenStoreObject = (set: any) => ({
  ...tokenObject,
  clearToken: () => set({ token: "" }),
  storeTokenAction: (token: string) => fetchTokenData(set, token),
});

export const tokenStore = create(TokenStoreObject);
