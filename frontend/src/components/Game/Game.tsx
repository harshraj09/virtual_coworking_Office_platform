import React, { useCallback, useEffect, useRef, useState } from "react";
import APIService from "../../service/APIService.ts/APIService";
import { useSocket } from "../../context/SocketContext/SocketContext";
import { useParams } from "react-router-dom";

interface User {
    _id: number;
    name: string;
    position: {
        x: number;
        y: number;
    }
}

const Game: React.FC = () => {
    const user = APIService.getItem("user");
    const { socket } = useSocket() || { socket: null };
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [users, setUsers] = useState<User[]>([
        // { _id: 1, name: "Ashutosh", position: { x: 50, y: 50 } },
        // { _id: 2, name: "John", position: { x: 150, y: 150 } },
        // { _id: 3, name: "Jane", position: { x: 250, y: 250 } },
    ]);
    const { spaceId } = useParams<{ spaceId: string }>();

    const userToControl = user._id;

    const handleKeyDown = (e: KeyboardEvent) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) => {
                if (user._id === userToControl) {
                    switch (e.key) {
                        case "w":
                            user.position.y -= 10; // Move up
                            break;
                        case "s":
                            user.position.y += 10; // Move down
                            break;
                        case "a":
                            user.position.x -= 10; // Move left
                            break;
                        case "d":
                            user.position.x += 10; // Move right
                            break;
                        default:
                            // Do nothing for other keys
                            break;
                    }
                    socket?.emit("user:move", { user, spaceId });
                    return user;
                }
                return user;
            })
        );
    };


    const drawUsers = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear canvas
        users.forEach((user) => {
            // Draw a circle for the user
            ctx.beginPath();
            ctx.arc(user.position.x, user.position.y, 20, 0, Math.PI * 2, true);
            ctx.fillStyle = user._id === userToControl ? "blue" : "gray";
            ctx.fill();
            ctx.closePath();

            // Draw the user name above
            ctx.font = "16px Arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(user.name, user.position.x, user.position.y - 30);
        });
    };

    const handelUserJoin = useCallback(({ users }: { users: User[] }) => {
        setUsers(users);
    }, [users]);

    const handleUserMove = useCallback(
        ({ user }: { user: User }) => {
            setUsers((prevUsers) =>
                prevUsers.map((elem) =>
                    elem._id === user._id ? { ...elem, position: user.position } : elem 
                )
            );
        },
        [setUsers]
    );

    useEffect(() => {
        socket?.emit("join:request", { userId: user._id, spaceId });
    }, [])

    useEffect(() => {
        socket?.on("join:success", handelUserJoin);
        socket?.on("user:left", handelUserJoin);
        socket?.on("user:moved", handleUserMove);
        window.addEventListener("unload", () => {
            socket?.emit("user-disconnect", { spaceId, userId: user._id });
        })
        
        return (() => {
            socket?.on("join:success", () => { });
            socket?.off("user:left", handelUserJoin);
            socket?.off("user:moved", handleUserMove)
            window.removeEventListener("unload", () => { });
        })
    }, [socket])


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Draw the users
        drawUsers(ctx);

        // Add event listener for keyboard inputs
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [users]);

    return (
        <canvas
            ref={canvasRef}
            width={1200}
            height={1200}
            style={{
                border: "1px solid black",
            }}
        />
    );

};

export default Game;

