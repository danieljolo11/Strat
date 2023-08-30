
import { Socket, io } from "socket.io-client";
import server_url from "./../../api/server_url";

const socket: Socket<any, any> = io(server_url, {
    cors: { origin: '*'},
    transports: ["websocket", "polling"],
});

export default socket;


