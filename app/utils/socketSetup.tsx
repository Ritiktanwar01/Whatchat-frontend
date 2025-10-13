import io from "socket.io-client"



export interface EmitData {
    message: string;
    to: string;
}


class WSSservices {
    SOCKET: ReturnType<typeof io> | undefined;

    initializeSocket = async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5SWpwN0luVnpaWEp1WVcxbElqb2lZMmhoZFdSb1lYSjVJaXdpZFhObGNsOXBaQ0k2SWpZNFpUWTRPR014TkRFNE0yRTBPVE5tWVdKak56RTJOaUo5TENKcFlYUWlPakUzTmpBeE5qTXdNek1zSW1WNGNDSTZNVGMyTURjMk56Z3pNMzAuLWZxVEpZNUtnZXh5eGJpa3FHTnVZaGtSQW1ibFdrd3ByaW45TWdrQ2s4TSIsInVzZXJuYW1lIjoiY2hhdWRoYXJ5IiwiaWF0IjoxNzYwMTYzMDMzLCJleHAiOjE3NjAyNDk0MzN9.fs6VWqVJF5XJF734ET4SXH-qnAZufRMSDZCl3Z6JhQw"
        try {

            this.SOCKET = io("http://97.74.90.82:5500", {
                transports: ["websocket"],
                autoConnect: false,
                query: {
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