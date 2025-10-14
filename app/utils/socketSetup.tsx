import io from "socket.io-client"
import { storage } from "./MMKVSetup";



export interface EmitData {
    message: string;
    to: string;
}


class WSSservices {
    SOCKET: ReturnType<typeof io> | undefined;

    initializeSocket = async () => {
        const auth = storage.getString('auth');

        let parsed: {
            loginState: boolean;
            access_token: string;
            refresh_token: string;
        } | null = null;

        if (typeof auth === 'string') {
            parsed = JSON.parse(auth);
        }

        const token = parsed?.access_token;

        try {

            this.SOCKET = io(`https://077b3df79f12.ngrok-free.app`, {
                transports: ["websocket"],
                autoConnect: false,
                auth: {
                    token,
                },
            });

            console.log("initialzing socket conn")

            this.SOCKET.connect();

            this.SOCKET.on('connect', () => {
                console.log("connected with server")
            })


            this.SOCKET.on('disconnect', () => {
                console.log("disconnected with socket server")
            })

            this.SOCKET.on("on_error", (data) => {
                console.log("error", data)
            })
            this.SOCKET.on("connect_error", (err) => {
                console.log("Connection error:", err);
            });

            this.SOCKET.on("connect_timeout", () => {
                console.log("Connection timed out");
            });
        } catch (error) {
            console.error(error)
        }
    }
    emit = (event: string, data: EmitData) => {
        if (this.SOCKET) {
            this.SOCKET.emit(event, data);
        } else {
            console.warn("Socket is not initialized.");
        }
    }

    on = (event: string, cb: (...args: any[]) => void) => {
        if (this.SOCKET) {
            this.SOCKET.on(event, cb);
        } else {
            console.warn("Socket is not initialized.");
        }
    }
}

const socketServices = new WSSservices()

export default socketServices