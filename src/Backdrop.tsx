import React, {useCallback, useEffect, useRef} from "react";
import './Backdrop.css';

type Transform =
{
    x: number,
    y: number,
    xScale: number,
    yScale: number,
    angle: number
};

const defaultTransform: Transform =
{
    angle: 0,
    x: 0,
    y: 0,
    xScale: 1,
    yScale: 1
};

function transform(transformPartial: Partial<Transform>): Transform
{
    return { ...defaultTransform, ...transformPartial };
}

function drawToCanvas(ctx: CanvasRenderingContext2D, timeMilliseconds: number)
{
    const timeSeconds = timeMilliseconds / 1000;

    const canvas = ctx.canvas;
    canvas.width = canvas.height *
        (canvas.clientWidth / canvas.clientHeight);
    
    let { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    
    ctx.fillStyle = "rgb(240,240,255)";
    ctx.fillRect(0, 0, width, height);
    
    const maximumSize = (width + height) / 8;
    
    const x = (unit: number) => (width + maximumSize * 2) * unit - maximumSize;
    const y = (unit: number) => (height + maximumSize * 2) * unit - maximumSize;
    
    const size = (unit: number) => maximumSize * unit;
    
    for (let transform of makeTransforms(timeSeconds, x, y, size))
    {
        ctx.translate(transform.x, transform.y);
        ctx.scale(transform.xScale, transform.yScale);
        ctx.rotate(transform.angle);
        drawLogoShapeUnit(ctx);
        ctx.resetTransform();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgb(89,152,208, 128)";
        ctx.stroke();    
    }
    
    // ctx.translate(width / 4, height / 4);
    // ctx.scale(-(32 + timeSeconds) * Math.sin(timeSeconds * Math.PI), 32 + timeSeconds);
    //
}

function* makeTransforms(
    time: number,
    x: (xUnit: number) => number,
    y: (yUnit: number) => number,
    size: (unit: number) => number): Iterable<Transform>
{
    const timeUnit = (x: number, b: number) => ((time - b) % x) / x;
    const timeRadians = (x: number, b: number) => timeUnit(x, b) * Math.PI * 2;
    
    yield transform({ x: x(0.2), y: y(1 - timeUnit(4, 0)), xScale: size(0.25) * Math.sin(timeRadians(3, 0)), yScale: size(0.25) });
    yield transform({ x: x(0.8), y: y(1 - timeUnit(4.5, -1)), xScale: size(0.25) * Math.sin(timeRadians(2, -0.5)), yScale: size(0.25) });
}

const edge = 0.4;

function drawLogoShapeUnit(ctx: CanvasRenderingContext2D)
{
    ctx.moveTo(-1, -1);
    ctx.beginPath();
    
    ctx.lineTo(1 - edge, -1);
    ctx.lineTo(1, 1);
    ctx.lineTo(-1 + edge, 1);
    ctx.lineTo(-1, -1);
    ctx.closePath();
}

const Backdrop: React.FC = () =>
{
    const canvasElementRef = useRef<HTMLCanvasElement>(null);
    const canvasRenderingContext2dRef = useRef<CanvasRenderingContext2D | null>();
    const requestRef = useRef<number>();
    
    const animate = useCallback<(time: number) => void>(
        time =>
        {
            let currentCanvasElement = canvasElementRef.current;
            if (currentCanvasElement)
            {
                if (!canvasRenderingContext2dRef.current)
                    canvasRenderingContext2dRef.current = currentCanvasElement.getContext("2d");

                let currentCanvasRenderingContext2d = canvasRenderingContext2dRef.current;
                if (currentCanvasRenderingContext2d)
                    drawToCanvas(currentCanvasRenderingContext2d, time);
                else
                    console.error(`Got non-truthy canvas rendering context 2d: ${currentCanvasRenderingContext2d}. Aborting drawing this frame.`);
            }
            else
                console.error(`Got non-truthy canvas element: ${currentCanvasElement}. Aborting drawing this frame.`);

            requestRef.current = requestAnimationFrame(animate);
        }, []);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            let currentRequest = requestRef.current;
            if (currentRequest === null || currentRequest === undefined)
                console.error(`Got null or undefined animation request: ${currentRequest}. Can't cancel.`);
            else
                cancelAnimationFrame(currentRequest)
        };
    }, [animate]);
    
    return <div className={"Backdrop"}>
        <canvas ref={canvasElementRef} className={"Backdrop-canvas"} width={512} height={512} />
    </div>;    
};

export default Backdrop;