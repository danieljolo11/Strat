import * as SecureStore from "expo-secure-store";

export async function saveToStorage(key: string, value: string): Promise<void> {

  SecureStore.setItemAsync(key, value);
}

export async function getStorageValue(key: string): Promise<string | null> {
  let result = await SecureStore.getItemAsync(key);
  if (result) return result;
  return null;
}
