import React, { useEffect, useRef, useState } from 'react';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const SNAKE_SIZE = 20;

const SnakeGame:React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
    const [food, setFood] = useState({ x: 0, y: 0 });
    const [direction, setDirection] = useState({ x: SNAKE_SIZE, y: 0 });
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        const draw = () => {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.fillStyle = 'green';
            snake.forEach(segment => {
                ctx.fillRect(segment.x, segment.y, SNAKE_SIZE, SNAKE_SIZE);
            });

            ctx.fillStyle = 'red';
            ctx.fillRect(food.x, food.y, SNAKE_SIZE, SNAKE_SIZE);
        };

        const update = () => {
            if (gameOver) return;

            const newSnake = [...snake];
            const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

            // Check for collisions with walls
            if (head.x < 0 || head.x >= CANVAS_WIDTH || head.y < 0 || head.y >= CANVAS_HEIGHT || newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
                setGameOver(true);
                return;
            }

            newSnake.unshift(head);

            // Check for food collision
            if (head.x === food.x && head.y === food.y) {
                setFood(generateFood());
            } else {
                newSnake.pop();
            }

            setSnake(newSnake);
        };

        const generateFood = () => {
            const x = Math.floor(Math.random() * (CANVAS_WIDTH / SNAKE_SIZE)) * SNAKE_SIZE;
            const y = Math.floor(Math.random() * (CANVAS_HEIGHT / SNAKE_SIZE)) * SNAKE_SIZE;
            return { x, y };
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'w':
                    setDirection({ x: 0, y: -SNAKE_SIZE });
                    break;
                case 'a':
                    setDirection({ x: 0, y: SNAKE_SIZE });
                    break;
                case 's':
                    setDirection({ x: -SNAKE_SIZE, y: 0 });
                    break;
                case 'd':
                    setDirection({ x: SNAKE_SIZE, y: 0 });
                    break;
            }
        };

        setFood(generateFood());
        const interval = setInterval(() => {
            update();
            draw();
        }, 100);

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            clearInterval(interval);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [snake, direction, gameOver]);

    return (
        <div>
            <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
            {gameOver && <h2>Game Over!</h2>}
        </div>
    );
};

export default SnakeGame; 