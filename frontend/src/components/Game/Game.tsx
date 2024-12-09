import React, { useCallback, useEffect, useRef, useState } from "react";
import APIService from "../../service/APIService.ts/APIService";
import { useSocket } from "../../context/SocketContext/SocketContext";
import { useParams } from "react-router-dom";
import Character from "./Character";
import characterImage from '../../images/image01.png'
import { Background } from "./Background";
import BackgroundImage from '../../images/background.png';

interface User {
    _id: number;
    name: string;
    position: {
        x: number;
        y: number;
    };
    walkFrame: number;
    direction: number;
}

const Game: React.FC = () => {
    const user = APIService.getItem("user");
    const { socket } = useSocket() || { socket: null };
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const { spaceId } = useParams<{ spaceId: string }>();

    const userToControl = user._id;

    const handleKeyDown = (e: KeyboardEvent) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) => {
                if (user._id === userToControl) {
                    // Increment walkFrame for the controlled user
                    let newWalkFrame;
                    user.direction != 1 ? (newWalkFrame = user.walkFrame < 10 ? user.walkFrame + 1 : 0 ) : (newWalkFrame = user.walkFrame > 0 ? user.walkFrame - 1 : 10 )
                    switch (e.key) {
                        case "w":
                            user.direction = 2;     // Set Direction For Up Side
                            user.position.y -= 10; // Move up
                            break;
                        case "s":
                            user.direction = 3;
                            user.position.y += 10; // Move down
                            break;
                        case "a":
                            user.direction = 1;
                            user.position.x -= 10; // Move left
                            break;
                        case "d":
                            user.direction = 0;
                            user.position.x += 10; // Move right
                            break;
                        default:
                            break;
                    }
                    // Update walkFrame and send move event
                    const updatedUser = { ...user, walkFrame: newWalkFrame };
                    socket?.emit("user:move", { user : updatedUser, spaceId });
                    return updatedUser;
                }
                
                console.log({user});
                return user;
            })
        );
    };
    
    const drawUsers = (ctx: CanvasRenderingContext2D) => {
        users.forEach((user) => {
            const player = new Character(ctx, characterImage);
            // Draw a circle for the user
            ctx.beginPath();
            player.animate(user.position.x, user.position.y, user.walkFrame, user.direction);
            // ctx.arc(user.position.x, user.position.y, 20, 0, Math.PI * 2, true);
            // ctx.fillStyle = user._id === userToControl ? "blue" : "gray";
            ctx.fill();
            ctx.closePath();
            // Draw the user name above
            ctx.font = "16px Arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(user.name, user.position.x, user.position.y - 50);
        });
    };

    const handelUserJoin = useCallback(({ users }: { users: User[] }) => {
        setUsers(users);
    }, [users]);
    
    const handleUserMove = useCallback(
        ({ user }: { user: User }) => {
            setUsers((prevUsers) =>
                prevUsers.map((elem) =>
                    elem._id === user._id ? { ...elem, position: user.position, walkFrame: user.walkFrame, direction: user.direction } : elem
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
        
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        const bg = new Background(ctx, BackgroundImage);
        bg.draw();
        drawUsers(ctx);
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [users]);


    return (
        <>
            <canvas
                ref={canvasRef}
                width={1000}
                height={620}
                style={{
                    border: "1px solid black",
                }}
            >
            </canvas>
        </>
    );

};

export default Game;
















