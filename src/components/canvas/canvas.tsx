import { useEffect, useState } from 'react';
type CanvasComponentProps = {
    selectedColor: string;
    canvasRef: any
}
const CanvasComponent = ({ selectedColor, canvasRef }: CanvasComponentProps) => {
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [isPainting, setIsPainting] = useState(false);
    useEffect(() => {
        const canvas = canvasRef?.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            setContext(ctx);
        }
    }, []);
    const startPainting = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = nativeEvent;
        if (context) {
            context.beginPath();
            context.moveTo(offsetX, offsetY);
            setIsPainting(true);
        }
    };
    const stopPainting = () => {
        if (context) {
            context.closePath();
            setIsPainting(false);
        }
    };
    const paint = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isPainting || !context) return;
        const { offsetX, offsetY } = nativeEvent;
        context.lineTo(offsetX, offsetY);
        context.strokeStyle = selectedColor;
        context.lineWidth = 5
        context.stroke();
    };
    return (
        <canvas
            ref={canvasRef}
            width={1410}
            height={480}
            onMouseDown={startPainting}
            onMouseUp={stopPainting}
            onMouseMove={paint}
        />
    );
}
export default CanvasComponent