import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from "@pusher/pusher-websocket-react-native";

export const pusherEvent = async (room: any) => {
  const pusher = Pusher.getInstance();

  await pusher.init({
    apiKey: "ee72526d40b42f07d3bf",
    cluster: "ap1",
  });

  await pusher.connect();
  await pusher.subscribe({
    channelName: room,
    onEvent: (event: PusherEvent) => {
      console.log(`Event received: ${event}`);
    },
  });

  return pusher;
};

export async function saveToStorage(key: string, value: string): Promise<void> {
  SecureStore.setItemAsync(key, value);
}

export async function getStorageValue(key: string): Promise<string | null> {
  let result = await SecureStore.getItemAsync(key);
  if (result) return result;
  return null;
}

export const saveImageToCloud = async (file: any) => {
  if (!file) return;
  console.log("worked");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "isrscr1n");

  return await axios
    .post(`https://api.cloudinary.com/v1_1/ddr0lfrjj/image/upload`, formData)
    .then(({ status, data }) => {
      if (status === 200 && data) {
        const { secure_url } = data || {};
        return secure_url;
      }
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
};
