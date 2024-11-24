import React, { useCallback, useEffect, useRef, useState } from "react";
import APIService from "../../service/APIService.ts/APIService";
import { useSocket } from "../../context/SocketContext/SocketContext";

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;


interface Position {
    _id?: string;
    avatar?: string;
    position: {
        x: number;
        y: number;
    };
}
const Game: React.FC = () => {
    const [user , setUser] = useState( APIService.getItem("user"));
    const {socket} = useSocket() || {socket : null};
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number | null>(null);
    const [position, setPosition] = useState<Position>({
        avatar : user.avatar,
        position: user.position,
        _id : user._id
    });

    const [members, setMembers] = useState<Position[]>([
        {
            avatar: "Pranjali",
            position: { x: 200, y: 150 },
        },
    ]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const movements: { [key: string]: { x: number; y: number } } = {
            w: { x: 0, y: -4 },
            a: { x: -4, y: 0 },
            s: { x: 0, y: +4 },
            d: { x: 4, y: 0 },
        };

        const movement = movements[e.key];
        if (movement) {
            setPosition((prev) => ({
                ...prev,
                position: {
                    x: Math.max(0, Math.min(CANVAS_WIDTH - 20, prev.position.x + movement.x)),
                    y: Math.max(0, Math.min(CANVAS_HEIGHT - 20, prev.position.y + movement.y)),
                },
            }));
        }
    }, []);

    const drawPlayer = useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "red";
        ctx.fillRect(position.position.x, position.position.y, 20, 20);
    }, [position]);

    const drawMembers = useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "blue";
        members.forEach((member) => {
            ctx.fillRect(member.position.x, member.position.y, 20, 20);
        });
    }, [members]);

    const render = useCallback(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        drawMembers(ctx);
        drawPlayer(ctx);

        animationFrameId.current = requestAnimationFrame(render);
    }, [drawMembers, drawPlayer]);

    useEffect(()=>{
        socket?.emit("new_user_join", (data : any)=>{
            console.log({data});
        })
    }, [socket])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        animationFrameId.current = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [handleKeyDown, render]);

    return (
        <div className="virtual-space">
            <canvas
                style={{ backgroundColor: "skyblue" }}
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
            ></canvas>
        </div>
    );
};

export default Game;
