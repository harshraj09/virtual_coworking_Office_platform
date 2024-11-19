import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSocket } from '../../context/SocketContext/SocketContext';
import APIService from '../../service/APIService.ts/APIService';
import { useParams } from 'react-router-dom';

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;

interface IMyCharacter {
    name: string,
    postion: { x: number, y: number },
    color?: string
}

const useCanvas = (character : any, drawCallBack : any) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(()=>{
        const ctx = canvasRef.current?.getContext("2d");

        if(!ctx) return;

        const render = () => {
            drawCallBack(ctx);
            requestAnimationFrame(render);
        }
        render();
        return () => cancelAnimationFrame(requestAnimationFrame(render));
    }, [character, drawCallBack])  
}


const Game: React.FC = () => {

    const { socket } = useSocket() || { socket: null };
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [characters, setCharacters] = useState<IMyCharacter[]>([]);
    const { spaceId } = useParams<{ spaceId: string }>()
    const draw = useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        characters.forEach(character => {
            ctx.fillStyle = "red";
            ctx.fillRect(character.postion.x, character.postion.y, 20, 20);
            ctx.fillStyle = "black";
            ctx.font = "12px Arial";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText(character.name, character.postion.x - 10, character.postion.y - 10);
        });
    }, [characters]);
    // const canvasRef = useCanvas(characters, draw);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const localUser = APIService.getItem("user") as { name: string } | null;
        setCharacters((prev) => {
            return prev.map(character => {
                if (!localUser || character.name !== localUser.name) return character;
                let newPosition = { ...character.postion };
                switch (e.key) {
                    case "w":
                        newPosition.y -= 5;
                        break;
                    case "s":
                        newPosition.y += 5;
                        break;
                    case "a":
                        newPosition.x -= 5;
                        break;
                    case "d":
                        newPosition.x += 5;
                        break;
                    default:
                        return character;
                }
                socket?.emit("move", { ...character, postion: newPosition, spaceId });
                return { ...character, postion: newPosition };
            });
        });
    }, []);

    const handelAllUserJoin = useCallback((data: any) => {
        // Update the characters state with the new members
        const { members } = data;
        console.log("Joining User");
        members.forEach((element: any) => {
            console.log({ element });
            setCharacters((prev) => [
                ...prev, element
            ]);
        });
        console.log("User Joined");
    }, [characters])

    const handelUserMove = useCallback((data: any) => {
        console.log({ data });
        setCharacters((prev) => {
            return prev.map((character) => {
                if (character.name !== data.name) return character;
                return { ...character, postion: data.postion };
            });
        });
    }, [characters])

    useEffect(() => {
        socket?.emit("IneedUserArray", "I need User Array");
    }, [])

    useEffect(() => {
        socket?.on("join-user", handelAllUserJoin);
        socket?.on("user:move", handelUserMove);
        return (() => {
            socket?.off("join-user", handelAllUserJoin);
            socket?.off("user:move", handelUserMove);
        })
    }, [socket, handelAllUserJoin, handelUserMove]);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        const render = () => {
            draw(ctx);
            requestAnimationFrame(render);
        };

        window.addEventListener("keydown", handleKeyDown);
        render();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [draw, handleKeyDown]);

    return (
        <>
            <canvas style={{ backgroundColor: "skyblue" }} ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
        </>
    )
}

export default Game