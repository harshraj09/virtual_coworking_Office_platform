import { Excalidraw } from '@excalidraw/excalidraw'
import React from 'react'

const Board:React.FC = () => {
    return (
        <div>
            <>
                <h1 style={{ textAlign: "center" }}>Excalidraw Example</h1>
                <div style={{ height: "500px" }}>
                    <Excalidraw />
                </div>
            </>
        </div>
    )
}

export default Board