import { Excalidraw } from '@excalidraw/excalidraw'

const Board = () => {
    return (
        <div>
            <>
                <h1 style={{ textAlign: "center" }}>Excalidraw Example</h1>
                <div style={{ height: "500px" }}>
                    <Excalidraw/>
                </div>
            </>
        </div>
    )
}

export default Board