import { Alert } from "react-native";
import io from "socket.io-client"



export interface EmitData {
    message: string;
    to: string;
}


class WSSservices {
    SOCKET: ReturnType<typeof io> | undefined;

    initializeSocket = async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5SWpwN0luVnpaWEp1WVcxbElqb2lZMmhoZFdSb1lYSjVJaXdpZFhObGNsOXBaQ0k2SWpZNFpUWTRPR014TkRFNE0yRTBPVE5tWVdKak56RTJOaUo5TENKcFlYUWlPakUzTlRrNU16ZzNOVE1zSW1WNGNDSTZNVGMyTURVME16VTFNMzAueWUzbFE2VDJ5S09LQ1oxQTdQcXZBeE1ZUk8zdjBSOVRVNHhpcGVFbEdOayIsInVzZXJuYW1lIjoiY2hhdWRoYXJ5IiwiaWF0IjoxNzU5OTM4NzUzLCJleHAiOjE3NjAwMjUxNTN9.W735qh4dJkey_rnYYi6ldv8WZYCXfnb0IM4z-uc8Ftc"
        try {

            this.SOCKET = io("http://97.74.90.82:5500", {
                transports: ["websocket"],
                autoConnect: false,
                query: {
                    token: token,
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
                console.log("Connection error:", err.message);
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