// socket/SocketContext.tsx
import { storage } from "./MMKVSetup";
import io, { Socket } from 'socket.io-client';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);
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

    useEffect(() => {
        const socket = io('http://97.74.90.82:5500', {
            transports: ['websocket'],
            autoConnect: true,
            auth: {
                token // Replace with dynamic token logic
            },
        });

        socketRef.current = socket;

        socket.on('connect', () => {
            // console.log('Socket connected');
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            // console.log('Socket disconnected');
            setIsConnected(false);
        });

        socket.on('connect_error', (err) => {
            // console.error('Connection error:', err);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};
