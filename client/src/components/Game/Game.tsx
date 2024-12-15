import React, { useCallback, useEffect, useRef, useState } from "react";
import APIService from "../../service/APIService.ts/APIService";
import { useSocket } from "../../context/SocketContext/SocketContext";
import { useParams } from "react-router-dom";
import Character from "./Character";
import characterImage from '../../images/image01.png'
import { Background } from "./Background";
import BackgroundImage from '../../images/background.png';
import Peer from "../../service/Peer";
import { GameMessage } from "./GameMessage";
import MultipleVideoCards from "../VideoComponents/VideosOfMy";
import { composeEventHandlers } from "@excalidraw/excalidraw/types/utils";

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
    const [call, setCall] = useState<number>(1);
    const [collisions, setCollisions] = useState<{ user1: User; user2: User }[]>([]);
    const userToControl = user._id;
    const [myStream, setMyStream] = useState<MediaStream | null>(null);

    const checkCollision = (user1: User, user2: User): boolean => {
        const size = 100; // Adjust this size based on your character's dimensions
        const user1Box = {
            x: user1.position.x,
            y: user1.position.y,
            width: size,
            height: size,
        };
        const user2Box = {
            x: user2.position.x,
            y: user2.position.y,
            width: size,
            height: size,
        };

        // Check if the bounding boxes intersect
        return (
            user1Box.x < user2Box.x + user2Box.width &&
            user1Box.x + user1Box.width > user2Box.x &&
            user1Box.y < user2Box.y + user2Box.height &&
            user1Box.y + user1Box.height > user2Box.y
        );
    };

    // const hanldeCloseConnection = async () => {
    //     try {
    //         await Peer.peer.close();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const handleCollisions = useCallback(async () => {
        // const collisions: { user1: User; user2: User }[] = [];

        // Loop through all pairs of users
        for (let i = 0; i < users.length; i++) {
            for (let j = i + 1; j < users.length; j++) {
                const user1 = users[i];
                const user2 = users[j];
                if (checkCollision(user1, user2)) {
                    console.log(`Collision detected between ${user1.name} and ${user2.name}`);
                    setCollisions((prev) => [
                        ...prev,
                        { user1, user2 }
                    ])

                    // Handle collision logic (e.g., stop movement, bounce back, emit event, etc.)
                    // if (Peer.peer.signalingState === "stable") {
                    //     console.warn("Skipping setRemoteDescription as signalingState is not 'have-local-offer'. Current state:", Peer.peer.signalingState);
                    //     return;
                    // }

                } else {
                    setCollisions([]);
                }
            }
        }
        if (collisions.length === 0) {
            setCall(1);
        } else {
            setCall(2);
        }
        // console.log(collisions);
        return collisions;
    }, [socket, user, call]);

    const callUser = async () => {
        const offer = await Peer.getOffer();
        socket?.emit("user_call", { user1: collisions[0].user1, user2: collisions[0].user2, spaceId, offer });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (call) {
            if (e.key === "x") {
                // alert("Calling")
                callUser();
            }
        }
        let userMoved = false; // Track if the user moved
        setUsers((prevUsers) =>
            prevUsers.map((user) => {
                if (user._id === userToControl) {
                    let newWalkFrame = user.walkFrame;
                    const step = 10; // Movement step
                    const canvasWidth = 950; // Canvas width (match with your canvas dimensions)
                    const canvasHeight = 570; // Canvas height (match with your canvas dimensions)

                    switch (e.key) {
                        case "w":
                            if (user.position.y - step >= 50) { // Ensure the user stays within the top boundary
                                user.direction = 2;
                                user.position.y -= step;
                                userMoved = true;
                            }
                            break;
                        case "s":
                            if (user.position.y + step <= canvasHeight - 50) { // Bottom boundary
                                user.direction = 3;
                                user.position.y += step;
                                userMoved = true;
                            }
                            break;
                        case "a":
                            if (user.position.x - step >= 50) { // Left boundary
                                user.direction = 1;
                                user.position.x -= step;
                                userMoved = true;
                            }
                            break;
                        case "d":
                            if (user.position.x + step <= canvasWidth - 50) { // Right boundary
                                user.direction = 0;
                                user.position.x += step;
                                userMoved = true;
                            }
                            break;
                        default:
                            // Handle other keys if needed
                            return user; // No changes for unrecognized keys
                    }

                    // Increment walkFrame for animation only if the user moved
                    if (userMoved) {
                        newWalkFrame = user.direction !== 1
                            ? user.walkFrame < 10 ? user.walkFrame + 1 : 0
                            : user.walkFrame > 0 ? user.walkFrame - 1 : 10;
                    }

                    // Emit move event and return updated user
                    const updatedUser = { ...user, walkFrame: newWalkFrame };
                    if (userMoved) {
                        socket?.emit("user:move", { user: updatedUser, spaceId });
                    }
                    return updatedUser;
                }
                return user;
            })
        );

        // Always check for collisions
        handleCollisions();
    };

    // const hanldeCloseMessage = () => {
    //     setCall();
    // }


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
        [user]
    );

    useEffect(() => {
        async function getMedia() {
          try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            setMyStream(mediaStream)
          } catch (err) {
            console.error("Error accessing media devices:", err)
          }
        }
    
        getMedia()
    
        return () => {
          if (myStream) {
            myStream.getTracks().forEach(track => track.stop())
          }
        }
      }, [])

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
    }, [socket, handelUserJoin, handleUserMove])


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
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [users, handleKeyDown]);


    return (
        <>
            {/* {call && <button onClick={callUser}>Call</button>} */}
            {/* {myStream && <MultipleVideoCards stream={myStream} numberOfInstances={call} />} */}
            <canvas
                ref={canvasRef}
                width={1000}
                height={620}
                style={{
                    border: "1px solid black",
                }}
            >
            </canvas>
            {/* <GameMessage
                isVisible={call}
                message="Press X Twice to One the Remote Stream"
                onClose={hanldeCloseMessage}
            /> */}
        </>
    );

};

export default Game;
















